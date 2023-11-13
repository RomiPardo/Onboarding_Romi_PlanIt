import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { favoritedByServiceSchema } from "~/server/schemas/serviceSchema";
import { TRPCError } from "@trpc/server";

export const serviceRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ ctx, input }) =>
      await ctx.prisma.service.findFirst({
        where: {
          id: input.id,
        },
      }),
  ),

  changeFavoriteBy: publicProcedure
    .input(favoritedByServiceSchema)
    .mutation(async ({ ctx, input: { id, userEmail, isFavorite } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: userEmail,
        },
        include: {
          favoriteServices: true,
        },
      });

      const service = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
        include: {
          favoritedBy: true,
        },
      });

      if (user !== null && service !== null) {
        const updatedFavoriteServices = isFavorite
          ? [...user.favoriteServices, service]
          : user.favoriteServices.filter((s) => s !== service);

        const updatedFavoritedBy = isFavorite
          ? [...service.favoritedBy, user]
          : service.favoritedBy.filter((u) => u !== user);

        await ctx.prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            favoriteServices: { set: updatedFavoriteServices },
          },
        });

        await ctx.prisma.service.update({
          where: {
            id,
          },
          data: {
            favoritedBy: { set: updatedFavoritedBy },
          },
        });
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas al identificar el usuario o el servicio",
        });
      }
    }),
});
