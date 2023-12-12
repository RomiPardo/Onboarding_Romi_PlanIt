import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  favoritedByServiceSchema,
  filterServiceSchema,
} from "~/server/schemas/serviceSchema";
import { TRPCError } from "@trpc/server";

export const serviceRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.service.findFirst({
        where: {
          id: input.id,
        },
        include: {
          aditionals: true,
          provider: { select: { name: true } },
          favoritedBy: true,
        },
      });

      if (!data) {
        return null;
      }

      return {
        ...data,
        isFavorite: data?.favoritedBy.some(
          (user) => user.id === ctx.session?.user.id,
        ),
      };
    }),

  changeFavoriteBy: publicProcedure
    .input(favoritedByServiceSchema)
    .mutation(async ({ ctx, input: { id, isFavorite } }) => {
      const service = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
        include: {
          favoritedBy: true,
        },
      });

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user.email,
        },
      });

      if (service && user) {
        const updatedFavoritedBy = isFavorite
          ? [...service.favoritedBy, user]
          : service.favoritedBy.filter((u) => u.name !== user.name);

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
    .input(filterServiceSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 12;
      const { cursor, category, order, filters, searchFilter } = input;

      const [field = "", direction] = order.split("-");
      const orderBy = field ? { [field]: direction } : {};

      try {
        const data = await ctx.prisma.service.findMany({
          take: limit + 1,
          where: {
            type: category,
            OR: [
              {
                name: {
                  contains: searchFilter,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: searchFilter,
                  mode: "insensitive",
                },
              },
              {
                provider: {
                  name: {
                    contains: searchFilter,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          orderBy,
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            favoritedBy: true,
            provider: true,
            aditionals: true,
            assets: true,
          },
        });

        const filteredData = data.filter(
          (service) =>
            service.assets.filter((asset) => !filters.includes(asset.name))
              .length ===
            service.assets.length - filters.length,
        );

        let nextCursor: typeof cursor | undefined = undefined;

        if (filteredData.length > limit) {
          const nextItem = filteredData.pop();
          nextCursor = nextItem!.id;
        }

        const userEmail = ctx.session?.user.email;

        const dataFavorite = filteredData.flatMap((service) => {
          return {
            ...service,
            isFavorite: service.favoritedBy.some((u) => u.email === userEmail),
          };
        });

        return { data: dataFavorite, nextCursor };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas por parte del servidor",
        });
      }
    }),

  getAllAssetsFromCategory: publicProcedure
    .input(
      z.object({
        category: z.enum(["PRESENT", "CATERING", "MERCHANDISING", "EVENT"]),
      }),
    )
    .query(async ({ ctx, input: { category } }) => {
      try {
        const data = await ctx.prisma.service.findMany({
          where: {
            type: category,
          },
          include: {
            assets: true,
          },
        });

        const uniqueAssets = data
          ? [
              ...new Set(
                data.flatMap((service) =>
                  service.assets.map((asset) => asset.name),
                ),
              ),
            ]
          : [];

        return { filters: uniqueAssets };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas por parte del servidor",
        });
      }
    }),
});
