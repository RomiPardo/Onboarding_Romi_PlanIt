import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { IdSchema, OrderSchema } from "~/server/schemas/orderSchema";

export const orderRouter = createTRPCRouter({
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

        const logo = image[0] ? btoa(image[0].name) : "";

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
            logo,
            tryAgain,
          },
        });

        return createdOrder;
      },
    ),
});
