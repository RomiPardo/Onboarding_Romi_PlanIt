import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { authOptions } from "~/server/auth";

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = () => {
  const logOut = async () => {
    await signOut();
  };

  return (
    <main className="font-poppins">
      <p>Has iniciado sesion</p>
      <button onClick={(e) => logOut()}>LogOut</button>
    </main>
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

  return {
    props: {
      sessionId: session?.user.id,
    },
  };
};

export default Home;
