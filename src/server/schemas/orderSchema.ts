import { z } from "zod";

const now = new Date();

export const OrderSchema = z.object({
  completeName: z.string().min(1, "Debe completar este campo"),
  deliveryDate: z.string().min(1, "Debe completar este campo"),
  deliveryHours: z.string().min(1, "Debe completar este campo"),
  direction: z.string().min(1, "Debe completar este campo"),
  contactNumber: z.string().min(1, "Debe completar este campo"),
  mensage: z.string(),
  image: z.custom<File[]>(),
  rut: z.string(),
  socialReason: z.string(),
  cardNumber: z.string().min(1, "Debe completar este campo"),
  tryAgain: z.boolean().default(false),
  serviceId: z.string(),
  userId: z.string(),
  amount: z.number(),
  aditionalsId: z.array(z.string()),
  sorprise: z.boolean().default(false),
});

export const IdSchema = z.object({
  id: z.string(),
});
