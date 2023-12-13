import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "~/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import NavBarGoBack from "~/components/NavBarGoBack";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { getTrpcHelpers } from "~/server/helper";
import Button from "~/components/Button";
import { Switch } from "~/components/ui/switch";

const orderSchema = z.object({ switch: z.boolean() });

type OrderSchemaType = z.infer<typeof orderSchema>;

type OrderProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Order: NextPage<OrderProps> = ({ user }) => {
  const methods = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      switch: false,
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  const buy = (orderData: OrderSchemaType) => console.log(orderData);

  return (
    <Layout intent="goBack">
      <NavBarGoBack color="black" absolute={false} />

      <main className="flex flex-col px-5 pb-40 pt-0 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(buy)}>
            <Switch
              onCheckedChange={(checked) => setValue("switch", checked)}
            />

            <Button type="submit">Send</Button>
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
