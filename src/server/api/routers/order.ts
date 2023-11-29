import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  IdSchema,
  OrderSchema,
  PreOrderSchema,
} from "~/server/schemas/orderSchema";

export const orderRouter = createTRPCRouter({
  preOderGetById: publicProcedure
    .input(IdSchema)
    .query(async ({ ctx, input }) => {
      const preOrder = await ctx.prisma.preOrder.findFirst({
        where: {
          id: input.id,
        },
        include: {
          aditionals: true,
          service: { include: { provider: { select: { name: true } } } },
          user: {
            select: {
              name: true,
              lastName: true,
              contactNumber: true,
              cards: true,
            },
          },
        },
      });

      if (!preOrder) {
        return null;
      }

      const subtotal =
        (preOrder.service.price +
          preOrder.aditionals.reduce(
            (sum, aditional) => sum + aditional.price,
            0,
          )) *
        preOrder.amount;

      return { ...preOrder, subtotal };
    }),

  oderGetById: publicProcedure.input(IdSchema).query(async ({ ctx, input }) => {
    const order = await ctx.prisma.order.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!order) {
      return null;
    }

    return { ...order };
  }),

  createPreOrder: publicProcedure
    .input(PreOrderSchema)
    .mutation(async ({ ctx, input: { serviceId, aditionalsIds, amount } }) => {
      if (amount <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "La cantidad seleccionada debe ser mayor a 0",
        });
      }

      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas al identificar el usuario",
        });
      }

      const aditionals = await ctx.prisma.aditional.findMany({
        where: { id: { in: aditionalsIds } },
      });

      const preorder = await ctx.prisma.preOrder.create({
        data: {
          serviceId,
          aditionals: {
            connect: aditionals.map((aditional) => ({ id: aditional.id })),
          },
          userId,
          amount,
        },
      });

      return preorder.id;
    }),

  deletePreOrder: publicProcedure
    .input(IdSchema)
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.preOrder.delete({
        where: { id },
      });
    }),

  deleteOrder: publicProcedure
    .input(IdSchema)
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.order.delete({
        where: { id },
      });
    }),

  createOrder: publicProcedure
    .input(OrderSchema)
    .mutation(
      async ({
        ctx,
        input: {
          deliveryDate,
          deliveryHours,
          direction,
          contactNumber,
          mensage,
          image,
          rut,
          socialReason,
          cardNumber,
          tryAgain,
          serviceId,
          userId,
          amount,
          aditionalsId,
          sorprise,
        },
      }) => {
        const payment = await ctx.prisma.creditCard.findUnique({
          where: { number: cardNumber },
        });

        if (!payment) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Hubo problemas al identificar el metodo de pago",
          });
        }

        const deliveryDateHours = new Date(`${deliveryDate} ${deliveryHours}`);

        const createdOrder = await ctx.prisma.order.create({
          data: {
            serviceId: serviceId,
            aditionals: {
              connect: aditionalsId.map((id) => ({ id })),
            },
            amount: amount,
            userId: userId,
            creditCardId: payment.id,
            contactNumber,
            rut,
            socialReason,
            deliveryDate: deliveryDateHours,
            direction,
            sorprise,
            message: mensage,
            logo: image.files[0]?.name,
            tryAgain,
          },
        });

        return createdOrder;
      },
    ),
});
