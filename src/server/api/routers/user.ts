import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import {
  ForgotPasswordSchema,
  RegisterUserSchema,
  cardSchema,
} from "~/server/schemas/userSchema";
import { EditUserSchema } from "~/server/schemas/userSchema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { sendEmail } from "~/server/email/mailService";

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

  forgotPassword: publicProcedure
    .input(ForgotPasswordSchema)
    .mutation(async ({ ctx, input: { email } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No existe un usuario con ese mail",
        });
      }

      const newPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await ctx.prisma.user.update({
        where: {
          email,
        },
        data: {
          hashedPassword,
        },
      });

      const message = `
      ¡Hola ${user.name}!

      Hemos recibido tu solicitud para restablecer la contraseña de tu cuenta. Para tu comodidad, aquí está tu nueva contraseña:

      ${newPassword}

      Utiliza esta contraseña para acceder a tu cuenta. Te recomendamos cambiarla tan pronto como ingreses.

      ¡Gracias y que tengas un excelente día!

      PlanIt
      `;

      const subject = "Recupera tu contraseña";

      await sendEmail(email, message, subject);
    }),

  addCard: publicProcedure
    .input(cardSchema)
    .mutation(async ({ ctx, input: { number, cvv } }) => {
      if (cvv.length !== 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El CVV debe tener 3 caracters",
        });
      }

      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hubo problemas al identificar el usuario",
        });
      }

      const card = await ctx.prisma.creditCard.findUnique({
        where: { number, userId },
      });

      if (card) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Ya existe una tarjeta con ese numero en su cuenta",
        });
      }

      await ctx.prisma.creditCard.create({
        data: { number, cvv: parseInt(cvv), userId },
      });
    }),

  getCards: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Hubo problemas al identificar el usuario",
      });
    }

    const cards = await ctx.prisma.creditCard.findMany({
      where: { userId: userId },
    });

    return cards;
  }),
});
