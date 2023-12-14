import { GetServerSidePropsContext } from "next";
import { appRouter } from "./api/root";
import { getServerAuthSession } from "./auth";
import prisma from "./db";
import SuperJSON from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";

export const getTrpcHelpers = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context);

  return createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: SuperJSON,
  });
};
