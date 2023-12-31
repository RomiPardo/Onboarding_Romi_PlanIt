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
          address,
          contactNumber,
          message,
          image,
          rut,
          socialReason,
          creditCardId,
          tryAgain,
          serviceId,
          userId,
          amount,
          additionalsId,
          surprise,
          firstName,
          lastName,
        },
      }) => {
        const deliveryDateHours = new Date(`${deliveryDate} ${deliveryHours}`);

        const logo = image[0] ? btoa(image[0].name) : "";

        const createdOrder = await ctx.prisma.order.create({
          data: {
            serviceId: serviceId,
            additionals: {
              connect: additionalsId.map((id) => ({ id })),
            },
            amount: amount,
            userId: userId,
            creditCardId,
            contactNumber,
            rut,
            socialReason,
            deliveryDate: deliveryDateHours,
            address,
            surprise,
            message,
            logo,
            tryAgain,
            firstNameClient: firstName,
            lastNameClient: lastName,
          },
        });

        return createdOrder;
      },
    ),
});
