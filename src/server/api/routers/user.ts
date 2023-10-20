import { createTRPCRouter } from '../trpc';
import { protectedProcedure } from '../trpc';
import { db } from "~/server/db";

const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
