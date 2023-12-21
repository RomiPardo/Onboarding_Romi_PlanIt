import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Formato inválido del mail"),
  password: z.string(),
});

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato inválido del mail"),
  business: z.string().min(1, "Debe completar este campo"),
  password: z.string().min(8, "La contraseña debe tener más de 8 caracteres"),
});

export const EditUserSchema = z.object({
  name: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  oldEmail: z.string().email("Formato inválido del mail"),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato inválido del mail"),
  contactNumber: z.string(),
  password: z.string(),
});

export const NewUserSchema = z.object({
  name: z.string().min(1, "Debe completar este campo"),
  lastName: z.string().min(1, "Debe completar este campo"),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato inválido del mail"),
  contactNumber: z.string(),
  password: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato inválido del mail"),
});

export const CardSchema = z.object({
  number: z.string().min(1, "Debe completar este campo"),
  cvv: z.string().min(1, "Debe completar este campo"),
});

export const ChangePasswordSchema = z.object({
  password: z.string(),
  confirmationPassword: z.string(),
  email: z
    .string()
    .min(1, "Debe completar este campo")
    .email("Formato inválido del mail"),
});
