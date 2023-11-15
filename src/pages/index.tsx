import { getServerSession } from "next-auth/next";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { authOptions } from "~/server/auth";
import Layout from "~/components/Layout";

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = () => <></>;

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

  return {
    redirect: {
      permanent: false,
      destination: "/regalos",
    },
  };
};

export default Home;
