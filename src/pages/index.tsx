import { getServerSession } from "next-auth/next";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { authOptions } from "~/server/auth";
import NavBar from "~/components/NavBar";

type PresentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Present: NextPage<PresentProps> = () => (
  <>
    <NavBar />

    <main className="bg-light-gray  font-poppins">
      <br></br>
      <p className="text-center">Pagina no implementada</p>
    </main>
  </>
);

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
    props: {},
  };
};

export default Present;
