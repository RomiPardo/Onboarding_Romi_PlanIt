import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import { RegisterUserSchema, cardSchema } from "~/server/schemas/userSchema";
import { EditUserSchema } from "~/server/schemas/userSchema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      }),
  ),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ ctx, input }) =>
      await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      }),
  ),

  registerUser: publicProcedure
    .input(RegisterUserSchema)
    .mutation(
      async ({ ctx, input: { name, lastName, email, business, password } }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user !== null) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Ya existe un usuario con ese mail",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await ctx.prisma.user.create({
          data: {
            name,
            lastName,
            email,
            business,
            hashedPassword,
          },
        });

        return {
          user: newUser,
        };
      },
    ),

  updateUser: publicProcedure
    .input(EditUserSchema)
    .mutation(
      async ({
        ctx,
        input: { name, lastName, email, contactNumber, password, oldEmail },
      }) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (oldEmail !== email) {
          const user = await ctx.prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (user !== null) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Ya existe un usuario con ese email",
            });
          }
        }

        if (password.length < 8 && password !== "")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "La contraseña debe tener mas de 8 caracteres",
          });

        const updatedUser =
          password.length > 0
            ? await ctx.prisma.user.update({
                where: {
                  email: oldEmail,
                },
                data: {
                  name,
                  lastName,
                  email,
                  hashedPassword,
                  contactNumber,
                },
              })
            : await ctx.prisma.user.update({
                where: {
                  email: oldEmail,
                },
                data: {
                  name,
                  lastName,
                  email,
                  contactNumber,
                },
              });

        return {
          user: updatedUser,
        };
      },
    ),

  addCard: publicProcedure
    .input(cardSchema)
    .mutation(async ({ ctx, input: { number, cvv } }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas al identificar el usuario",
        });
      }

      await ctx.prisma.creditCard.create({
        data: { number, cvv: parseInt(cvv), userId },
      });
    }),
});
