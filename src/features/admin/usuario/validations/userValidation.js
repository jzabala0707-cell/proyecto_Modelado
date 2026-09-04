import { z } from "zod";
import {
  nameSchema,
  emailLowercaseSchema,
  optionalPhoneSchema,
  requiredBigIntSchema,
  estadoUsuarioSchema,
  nonEmptyArraySchema,
  optionalLongText,
  requiredString,
  optionalColorSchema,
  shortTextSchema,
  strongPasswordSchema,
} from "@/shared/validations/sharedSchemas";

export const userCreateSchema = z.object({
  firstName: nameSchema("Nombre obligatorio"),
  lastName: nameSchema("Apellido obligatorio"),
  correo: emailLowercaseSchema,
  telefono: optionalPhoneSchema,
  rolId: requiredBigIntSchema("Seleccione un rol."),
  estado: estadoUsuarioSchema,
  cargo: optionalLongText(120),
  departamento: optionalLongText(120),
  direccion: optionalLongText(255),
  password: strongPasswordSchema,
});

export const userEditSchema = z.object({
  firstName: nameSchema("Nombre obligatorio"),
  lastName: nameSchema("Apellido obligatorio"),
  correo: emailLowercaseSchema,
  telefono: optionalPhoneSchema,
  rolId: requiredBigIntSchema("Seleccione un rol."),
  estado: estadoUsuarioSchema,
  cargo: optionalLongText(120),
  departamento: optionalLongText(120),
  direccion: optionalLongText(255),
  password: strongPasswordSchema.nullish(),
});

export const roleSchema = z.object({
  nombre: shortTextSchema("Nombre rol", 50),
  descripcion: optionalLongText(255),
  activo: z.boolean().default(true),
  permisosIds: z.array(requiredBigIntSchema()).default([]),
});
