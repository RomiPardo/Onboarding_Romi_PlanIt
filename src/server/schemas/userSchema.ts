import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().min(1, "Invalid email").email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});

export const RegisterUserSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().min(1, "Invalid email").email("Invalid email"),
  business: z.string(),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});
