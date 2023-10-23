import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { protectedProcedure } from '../trpc';
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
