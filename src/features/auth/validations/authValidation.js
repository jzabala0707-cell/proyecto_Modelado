import { z } from "zod";
import {
  emailLowercaseSchema,
  strongPasswordSchema,
  confirmPasswordSchema,
  nameSchema,
  optionalPhoneSchema,
  registerPasswordMatchRefine,
  passwordMatchRefine,
  tipoDocumentoSchema,
  documentSchema,
  optionalLongText,
  optionalDateSchema,
  generoSchema,
  passwordSchema,
  emailSchema,
} from "@/shared/validations/sharedSchemas";

const SPANISH_NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s'\-]+$/;

const firstNameSchema = z
  .string({ required_error: "Nombre obligatorio", invalid_type_error: "Nombre obligatorio" })
  .trim()
  .min(2, "Nombre obligatorio")
  .max(100, "El nombre es demasiado largo.")
  .regex(SPANISH_NAME_REGEX, "El nombre solo puede contener letras, espacios y acentos.");

const lastNameSchema = z
  .string({ required_error: "Apellido obligatorio", invalid_type_error: "Apellido obligatorio" })
  .trim()
  .min(2, "Apellido obligatorio")
  .max(100, "El apellido es demasiado largo.")
  .regex(SPANISH_NAME_REGEX, "El apellido solo puede contener letras, espacios y acentos.");

export const loginSchema = z.object({
  email: emailLowercaseSchema,
  password: strongPasswordSchema,
  remember: z.boolean().optional().default(false),
});

export const registerSchema = registerPasswordMatchRefine(
  z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailLowercaseSchema,
    phone: optionalPhoneSchema,
    tipoDocumento: tipoDocumentoSchema,
    numeroDocumento: documentSchema,
    nacionalidad: optionalLongText(100),
    fechaNacimiento: optionalDateSchema(),
    genero: generoSchema,
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
