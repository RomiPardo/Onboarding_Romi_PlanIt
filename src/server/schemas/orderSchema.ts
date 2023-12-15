import { z } from "zod";

export const OrderSchema = z.object({
  firstName: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  deliveryDate: z.string().min(1, "Debe completar este campo"),
  deliveryHours: z.string().min(1, "Debe completar este campo"),
  address: z.string().min(1, "Debe completar este campo"),
  contactNumber: z.string().min(1, "Debe completar este campo"),
  message: z.string(),
  image: z.custom<File[]>(),
  rut: z.string(),
  socialReason: z.string(),
  creditCardId: z.string(),
  tryAgain: z.boolean().default(false),
  serviceId: z.string(),
  userId: z.string(),
  amount: z.number(),
  additionalsId: z.array(z.string()),
  surprise: z.boolean().default(false),
});

export const OrderFormSchema = z.object({
  firstName: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  deliveryDate: z.string().min(1, "Debe completar este campo"),
  deliveryHours: z.string().min(1, "Debe completar este campo"),
  address: z.string().min(1, "Debe completar este campo"),
  contactNumber: z.string().min(1, "Debe completar este campo"),
  message: z.string(),
  image: z.custom<File[]>(),
  rut: z.string(),
  socialReason: z.string(),
  creditCardId: z.string().min(1, "Debe completar este campo"),
  tryAgain: z.boolean().default(false),
  surprise: z.boolean().default(false),
  serviceId: z.string(),
  userId: z.string(),
  amount: z.number(),
});

export const IdSchema = z.object({
  id: z.string(),
});
