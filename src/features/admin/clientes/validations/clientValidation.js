import { z } from "zod";
import {
  nameSchema,
  emailLowercaseSchema,
  optionalPhoneSchema,
  estadoUsuarioSchema,
  tipoDocumentoSchema,
  documentSchema,
  optionalDateSchema,
  generoSchema,
  optionalLongText,
} from "@/shared/validations/sharedSchemas";

export const clientSchema = z.object({
  firstName: nameSchema("El nombre es obligatorio."),
  lastName: nameSchema("El apellido es obligatorio."),
  correo: emailLowercaseSchema,
  telefono: optionalPhoneSchema,
  estado: estadoUsuarioSchema,

  tipo_documento: tipoDocumentoSchema,
  numero_documento: documentSchema,
  fecha_nacimiento: optionalDateSchema(),
  genero: generoSchema,
  nacionalidad: optionalLongText(100),
  pais_residencia: optionalLongText(100),
  ciudad_residencia: optionalLongText(100),
  direccion: optionalLongText(255),
  contacto_emergencia_nombre: optionalLongText(150),
  contacto_emergencia_telefono: optionalPhoneSchema,
  contacto_emergencia_parentesco: optionalLongText(50),
  preferencias: optionalLongText(),
  observaciones: optionalLongText(),
  vip: z.boolean().default(false),
});
