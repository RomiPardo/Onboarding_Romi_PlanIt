import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import { RegisterUserSchema } from "~/server/schemas/userSchema";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      }),
  ),

  getById: publicProcedure.input(z.string()).query(
    async ({ ctx, input }) =>
      await ctx.prisma.user.findFirst({
        where: {
          id: input,
        },
      }),
  ),

  registerUser: publicProcedure
    .input(RegisterUserSchema)
    .query(async ({ ctx, input }) => {
      const { name, lastName, email, business, password } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user !== null) {
        return {
          user: null,
          message: "The user already exists",
        };
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
        message: "User registered successfully",
      };
    }),
});
