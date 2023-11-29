import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "~/components/Layout";
import SummaryOrder from "~/components/SummaryOrder";
import { getTrpcHelpers } from "~/server/helper";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { OrderSchema as orderSchema } from "~/server/schemas/orderSchema";
import { useEffect, useState } from "react";
import DetailOrder from "~/components/DetailOrder";
import { toast } from "react-toastify";
import NavBarGoBack from "~/components/NavBarGoBack";
import router from "next/router";

type OrderSchemaType = z.infer<typeof orderSchema>;

type OrderProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Order: NextPage<OrderProps> = async ({ id, defaultValues }) => {
  const { data: order, isLoading } = api.order.preOderGetById.useQuery({ id });

  const [sorprise, setSorprise] = useState(false);
  const changeSorprise = () => setSorprise(!sorprise);

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
  } = methods;

  const deletePreOrderMutation = api.order.deletePreOrder.useMutation({
    onError(error) {
      toast.error(error.message);
    },
  });
  const createOrderMutation = api.order.createOrder.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      deletePreOrderMutation.mutate({
        id,
      });
    },
  });

  const buy = (orderData: OrderSchemaType) => {
    console.log("Buy:", orderData);

    createOrderMutation.mutate({
      ...orderData,
      sorprise,
      image: orderData.image && { files: [], value: 0 },
    });
  };

  const deletePreOrder = () => {
    deletePreOrderMutation.mutate({
      id,
    });
  };

  useEffect(() => {
    const handleRouteChange = () => {
      deletePreOrderMutation.mutate({
        id,
      });
    };

    const handleUnload = () => {
      deletePreOrderMutation.mutate({
        id,
      });
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.addEventListener("beforeunload", handleUnload);
    };
  }, []);

  if (!order || isLoading) {
    await router.replace("/catering");
    return;
  }

  return (
    <Layout intent="goBack" action={deletePreOrder}>
      <NavBarGoBack color="black" absolute={false} />

      <main className="flex flex-col px-3 pb-40 pt-0 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
        <FormProvider {...methods}>
          <form
            className="flex w-full flex-row gap-x-36"
            onSubmit={(e) => {
              buy(methods.getValues());
            }}
          >
            <DetailOrder
              userData={order.user}
              onClickSorprise={changeSorprise}
              register={register}
              errors={errors}
              sorprise={sorprise}
            />

            <SummaryOrder
              service={order.service}
              aditionals={order.aditionals}
              subtotal={order.subtotal}
            />
          </form>
        </FormProvider>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const helpers = await getTrpcHelpers(context);

  const { query } = context;
  const orderId = query.order as string;
  const id = query.id as string;

  const preOrder = await helpers.order.preOderGetById.fetch({ id: orderId });

  if (!preOrder) {
    return {
      redirect: {
        permanent: false,
        destination: `/catering/${id}`,
      },
    };
  }

  await helpers.order.preOderGetById.prefetch({ id: orderId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id: orderId,
      defaultValues: {
        ...preOrder,
        completeName: preOrder?.user.name + " " + preOrder?.user.lastName,
        contactNumber: preOrder?.user.contactNumber,
        serviceId: preOrder.serviceId,
        userId: preOrder.userId,
        aditionalsId: preOrder.aditionals.map((aditional) => aditional.id),
      },
    },
  };
};

export default Order;
