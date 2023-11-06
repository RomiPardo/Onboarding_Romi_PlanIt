import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Formato invalido del mail"),
  password: z.string(),
});

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato invalido del mail"),
  business: z.string().min(1, "Debe completar este campo"),
  password: z.string().min(8, "La contraseña debe tener mas de 8 caracteres"),
});

export const EditionUserSchema = z.object({
  completeName: z.string().min(1, "Debe completar este campo"),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato invalido del mail"),
  contactNumber: z.string().min(1, "Debe completar este campo"),
  password: z.string().min(8, "La contraseña debe tener mas de 8 caracteres"),
});
