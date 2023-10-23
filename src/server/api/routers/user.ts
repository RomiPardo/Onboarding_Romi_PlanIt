import { createTRPCRouter } from '../trpc';
import { protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const prisma = ctx.prisma;
    return await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
