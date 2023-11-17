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
      const favoriteServices = await ctx.prisma.user.findUnique({
        where: {
          email: userEmail,
        },
        select: {
          favoriteServices: true,
        },
      });

      const favoritedBy = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
        select: {
          favoritedBy: true,
        },
      });

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const service = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
      });

      if (user && service && favoriteServices && favoritedBy) {
        const updatedFavoriteServices = isFavorite
          ? [...favoriteServices?.favoriteServices, service]
          : favoriteServices?.favoriteServices.filter(
              (s) => s.name !== service.name,
            );

        const updatedFavoritedBy = isFavorite
          ? [...favoritedBy.favoritedBy, user]
          : favoritedBy.favoritedBy.filter((u) => u.name !== user.name);

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

  getFilteredServices: publicProcedure
    .input(
      z.object({
        myCursor: z.string(),
        category: z.enum(["PRESENT", "CATERING", "MERCHANDISING", "EVENT"]),
      }),
    )
    .mutation(async ({ ctx, input: { myCursor, category } }) => {
      const perPage = 12;

      const data =
        myCursor !== "0"
          ? await ctx.prisma.service.findMany({
              skip: 1,
              take: perPage,
              cursor: {
                id: myCursor,
              },
              where: {
                type: category,
              },
            })
          : await ctx.prisma.service.findMany({
              take: perPage,
              where: {
                type: category,
              },
            });

      if (data.length === 0) {
        return { services: [], cursor: myCursor };
      }

      return { services: data, cursor: data[data.length - 1]?.id };
    }),

  getLengthFiltered: publicProcedure
    .input(
      z.object({
        category: z.enum(["PRESENT", "CATERING", "MERCHANDISING", "EVENT"]),
      }),
    )
    .query(async ({ ctx, input: { category } }) => {
      const data = await ctx.prisma.service.findMany({
        where: {
          type: category,
        },
      });

      return data.length;
    }),
});
