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
          additionals: true,
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
      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user.email,
        },
      });

      if (currentUser) {
        const data = isFavorite
          ? {
              favoritedBy: { disconnect: [{ id: currentUser.id }] },
            }
          : {
              favoritedBy: { connect: [{ id: currentUser.id }] },
            };
        await ctx.prisma.service.update({
          where: {
            id,
          },
          data,
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
      const { cursor, category, order, subcategoryFilter, searchFilter } =
        input;

      const [field = "", direction] = order.split("-");
      const orderBy = field ? { [field]: direction } : {};

      const subcategoriesFiltered =
        subcategoryFilter.length !== 0
          ? {
              subcategories: {
                some: {
                  name: {
                    in: subcategoryFilter,
                  },
                },
              },
            }
          : {};

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
            ...subcategoriesFiltered,
          },
          orderBy,
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            favoritedBy: true,
            provider: true,
            additionals: true,
            subcategories: true,
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;

        if (data.length > limit) {
          const nextItem = data.pop();
          nextCursor = nextItem!.id;
        }

        const userEmail = ctx.session?.user.email;

        const dataFavorite = data.flatMap((service) => {
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

  getAllSubcategoriesFromCategory: publicProcedure
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
            subcategories: true,
          },
        });

        const uniqueSubcategories = data
          ? [
              ...new Set(
                data.flatMap((service) =>
                  service.subcategories.map((subcategory) => subcategory.name),
                ),
              ),
            ]
          : [];

        return { filters: uniqueSubcategories };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas por parte del servidor",
        });
      }
    }),
});
