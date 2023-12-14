import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "~/components/Layout";
import SummaryOrder from "~/components/SummaryOrder";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { OrderFormSchema as orderSchema } from "~/server/schemas/orderSchema";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import router from "next/router";
import { getTrpcHelpers } from "~/server/helper";
import { Additional } from "@prisma/client";
import DetailOrder from "~/components/DetailOrder";
import { usePreOrderContext } from "~/hooks/usePreOrderContext";
import GoBack from "~/components/GoBack";

type OrderSchemaType = z.infer<typeof orderSchema>;

type OrderProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Order: NextPage<OrderProps> = ({ user, defaultValues }) => {
  const [verify, setVerify] = useState(false);

  const changeVerify = () => setVerify(!verify);

  const { preOrder, setPreOrder } = usePreOrderContext("preOrder");

  const methods = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues,
      contactNumber: defaultValues.contactNumber ?? undefined,
      userId: user.id,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setValue,
  } = methods;

  useEffect(() => {
    if (preOrder) {
      setValue("serviceId", preOrder.service.id);
      setValue("amount", preOrder.amount);
    }
  }, [preOrder]);

  const createOrderMutation = api.order.createOrder.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    async onSuccess() {
      setPreOrder(undefined);
      await router.push("/confirmada");
    },
  });

  const { data, isLoading } = api.user.getCards.useQuery();

  if (isLoading) {
    return (
      <Layout intent="goBack">
        <p>Cargando pagina...</p>
      </Layout>
    );
  }

  if (!data) {
    toast.error("Hubo un error obteniendo las tarjetas de credito");
  }

  const cards = data ?? [];

  const buy = (orderData: OrderSchemaType) => {
    if (!preOrder) {
      toast.error("Hubo un error al recopilar la información de la compra");
      return;
    }

    createOrderMutation.mutate({
      ...orderData,
      additionalsId: preOrder.additionals.map(
        (additional: Additional) => additional.id,
      ),
      image: orderData.image,
    });
  };

  const changePage = () => {
    if (verify) {
      changeVerify();
    } else {
      setPreOrder(undefined);
      router.back();
    }
  };

  return (
    <Layout intent="goBack" onClick={() => setPreOrder(undefined)}>
      <GoBack color="black" absolute={false} onBack={changePage} />

      <main className="flex flex-col px-5 pb-40 pt-0 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(buy)}>
            <div className="flex w-full flex-row gap-x-36">
              {!verify ? (
                <>
                  <DetailOrder
                    onClick={changeVerify}
                    userData={{ ...user, cards }}
                    register={register}
                    errors={errors}
                    control={control}
                  />

                  <div className="hidden sm:flex">
                    <SummaryOrder />
                  </div>
                </>
              ) : (
                <SummaryOrder />
              )}
            </div>
          </form>
        </FormProvider>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const helpers = await getTrpcHelpers(context);

  const cards = await helpers.user.getCards.fetch();
  if (!cards) {
    return {
      redirect: {
        permanent: false,
        destination: `/regalos`,
      },
    };
  }

  await helpers.user.getCards.prefetch();

  return {
    props: {
      user: {
        name: session.user.name ?? "",
        lastName: session.user.lastName ?? "",
        contactNumber: session.user.contactNumber ?? null,
        id: session.user.id ?? "",
      },
      defaultValues: {
        firstName: session.user.name,
        lastName: session.user.lastName,
        contactNumber: session.user.contactNumber,
      },
    },
  };
};

export default Order;
