import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "./auth";
import prisma from "./db";
import SuperJSON from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./api/root";

export const getTrpcHelpers = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context);

  return createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: SuperJSON,
  });
};
