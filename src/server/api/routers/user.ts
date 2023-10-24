import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { protectedProcedure } from '../trpc';
import prisma from "~/server/db";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
/*
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => (
    await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  )),*/
});
