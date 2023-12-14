import { Service } from "@prisma/client";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "~/components/Layout";
import ServiceInformation from "~/components/ServiceInformation";
import ServiceInformationShimmer from "~/components/ServiceInformationShimmer";
import Spinner from "~/components/Spinner";
import { getTrpcHelpers } from "~/server/helper";
import { api } from "~/utils/api";

type SelectedServiceProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const SelectedService: NextPage<SelectedServiceProps> = ({ id }) => {
  const { data: service, isLoading } = api.service.getById.useQuery({ id });

  if (!service || isLoading) {
    return (
      <Layout intent="goBack">
        <ServiceInformationShimmer />
      </Layout>
    );
  }

  return (
    <Layout intent="goBack">
      <ServiceInformation service={service} />
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const helpers = await getTrpcHelpers(context);

  const { query } = context;
  const id = query.id as string;

  const service = await helpers.service.getById.fetch({ id });

  if (!service) {
    return {
      redirect: {
        permanent: false,
        destination: "/regalos",
      },
    };
  }

  await helpers.service.getById.prefetch({ id });

  return {
    props: { trpcState: helpers.dehydrate(), id },
  };
};

export default SelectedService;
