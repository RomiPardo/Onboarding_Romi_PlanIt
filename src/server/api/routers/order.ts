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
          creditCardId,
          tryAgain,
          serviceId,
          userId,
          amount,
          aditionalsId,
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
            aditionals: {
              connect: aditionalsId.map((id) => ({ id })),
            },
            amount: amount,
            userId: userId,
            creditCardId,
            contactNumber,
            rut,
            socialReason,
            deliveryDate: deliveryDateHours,
            direction,
            surprise,
            message: mensage,
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
