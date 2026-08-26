import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
  strongPasswordSchema,
  confirmPasswordSchema,
  nameSchema,
  phoneSchema,
  registerPasswordMatchRefine,
  passwordMatchRefine,
} from "@/shared/validations/sharedSchemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean().optional().default(false),
});

export const registerSchema = registerPasswordMatchRefine(
  z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: strongPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
);

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const changePasswordSchema = passwordMatchRefine(
  z.object({
    currentPassword: passwordSchema,
    newPassword: strongPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
);
