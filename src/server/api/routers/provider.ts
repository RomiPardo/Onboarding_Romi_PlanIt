import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const providerRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ ctx, input }) =>
      await ctx.prisma.provider.findFirst({
        where: {
          id: input.id,
        },
      }),
  ),
});
