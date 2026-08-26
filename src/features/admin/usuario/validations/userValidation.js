import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  requiredSelectSchema,
  optionalString,
  shortTextSchema,
} from "@/shared/validations/sharedSchemas";

export const userCreateSchema = z.object({
  name: fullNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  role: requiredSelectSchema("Seleccione un rol."),
  status: requiredSelectSchema("Seleccione un estado."),
  department: optionalString(),
  address: optionalString(),
  password: z
    .string({ required_error: "La contraseña es obligatoria." })
    .trim()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(128),
});

export const userEditSchema = z.object({
  name: fullNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  role: requiredSelectSchema("Seleccione un rol."),
  status: requiredSelectSchema("Seleccione un estado."),
  department: optionalString(),
  address: optionalString(),
});

export const roleSchema = z.object({
  name: shortTextSchema("El nombre del rol es obligatorio.", 50),
  description: shortTextSchema("La descripción es obligatoria.", 200),
  permissions: z
    .array(z.string())
    .min(1, "Seleccione al menos un permiso."),
});
