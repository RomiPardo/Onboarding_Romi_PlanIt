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
        cursor: z.string().nullish(),
        category: z.enum(["PRESENT", "CATERING", "MERCHANDISING", "EVENT"]),
        limit: z.number().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 12;
      const { cursor, category } = input;

      const data = await ctx.prisma.service.findMany({
        take: limit + 1,
        where: {
          type: category,
        },
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (data.length > limit) {
        const nextItem = data.pop();
        nextCursor = nextItem!.id;
      }

      return {
        data,
        nextCursor,
      };
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
