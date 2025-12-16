import { z } from "zod";

const emailSchema = z.email({ message: "Invalid email address" });
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
