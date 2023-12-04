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
import { OrderSchema as orderSchema } from "~/server/schemas/orderSchema";
import { useState } from "react";
import { toast } from "react-toastify";
import NavBarGoBack from "~/components/NavBarGoBack";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import router from "next/router";
import { getTrpcHelpers } from "~/server/helper";
import { Aditional } from "@prisma/client";
import { PreOrderContext } from "~/contexts/PreOrderContext";
import DetailOrder from "~/components/DetailOrder";

type LocalDataType = {
  service: {
    deliveryPrice: number;
    image: string[];
    name: string;
    provider: { name: string };
    id: string;
  };
  aditionals: Aditional[];
  subtotal: number;
  amount: number;
};

type OrderSchemaType = z.infer<typeof orderSchema>;

type OrderProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Order: NextPage<OrderProps> = ({ data, defaultValues }) => {
  const [sorprise, setSorprise] = useState(false);
  const [verify, setVerify] = useState(false);

  const changeSorprise = () => setSorprise(!sorprise);
  const changeVerify = () => setVerify(!verify);

  const createOrderMutation = api.order.createOrder.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    async onSuccess() {
      deleteLocalStorage();
      await router.replace("/confirmada");
    },
  });

  const methods = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues,
      contactNumber: defaultValues.contactNumber ?? undefined,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const { data: cards, isLoading } = api.user.getCards.useQuery();

  if (isLoading) {
    return <></>;
  }

  if (!cards) {
    toast.error("Hubo un error obteniendo las tarjetas de credito");
    return (
      <Layout intent="goBack">
        <></>
      </Layout>
    );
  }

  const localData = localStorage.getItem("preOrder");
  const preOrder = localData ? (JSON.parse(localData) as LocalDataType) : null;

  if (!preOrder) {
    toast.error("Hubo un error obteniendo los datos");
    return (
      <Layout intent="goBack">
        <></>
      </Layout>
    );
  }

  const buy = (orderData: OrderSchemaType) => {
    console.log(orderData);

    createOrderMutation.mutate({
      ...orderData,
      serviceId: preOrder.service.id,
      amount: preOrder.amount,
      userId: data.user.id,
      sorprise,
      aditionalsId: preOrder.aditionals.map(
        (aditional: Aditional) => aditional.id,
      ),
      image: orderData.image,
    });
  };

  const changePage = () => {
    if (verify) {
      changeVerify();
    } else {
      deleteLocalStorage();
    }
  };

  const deleteLocalStorage = () => {
    localStorage.removeItem("preOrder");
    router.back();
  };

  return (
    <PreOrderContext.Provider value={preOrder}>
      <Layout
        intent="goBack"
        onClick={() => localStorage.removeItem("preOrder")}
      >
        <NavBarGoBack color="black" absolute={false} onClick={changePage} />

        <main className="flex flex-col px-5 pb-40 pt-0 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(buy)}>
              <div className="flex w-full flex-row gap-x-36">
                {!verify ? (
                  <>
                    <DetailOrder
                      onClick={changeVerify}
                      userData={{ ...data.user, cards }}
                      sorprise={sorprise}
                      onClickSorprise={changeSorprise}
                      register={register}
                      errors={errors}
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
    </PreOrderContext.Provider>
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
      data: {
        user: {
          name: session.user.name ?? "",
          lastName: session.user.lastName ?? "",
          contactNumber: session.user.contactNumber ?? null,
          id: session.user.id ?? "",
        },
      },
      defaultValues: {
        completeName: session.user.name + " " + session.user.lastName,
        contactNumber: session.user.contactNumber,
      },
    },
  };
};

export default Order;
