import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import { RegisterUserSchema } from "~/server/schemas/userSchema";
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
            message: "The user already exists",
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
});
