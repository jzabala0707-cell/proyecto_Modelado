import { z } from "zod";
import {
  TIPO_DOCUMENTO_ENUM,
  GENERO_ENUM,
  NIVEL_IDIOMA_ENUM,
  ESTADO_USUARIO_ENUM,
  ESTADO_TOUR_ENUM,
  ESTADO_SALIDA_ENUM,
  ESTADO_RESERVA_ENUM,
  ESTADO_GRUPO_ENUM,
  ESTADO_VENTA_ENUM,
} from "../constants/dbEnums.js";

const SPANISH_NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s'\-]+$/;
const COLOMBIAN_PHONE_REGEX = /^(\+?\d{1,3}[-.\s]?)?\d{7,15}$/;
const DOCUMENT_REGEX = /^[A-Za-z0-9\-.\s]+$/;

export const requiredString = (message, min = 1) =>
  z
    .string({ required_error: message, invalid_type_error: message })
    .trim()
    .min(min, { message });

export const optionalString = () =>
  z
    .string()
    .trim()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v ? String(v).trim() : ""));

export const emailSchema = requiredString("El correo electrónico es obligatorio.")
  .email("El correo electrónico no tiene un formato válido.")
  .max(255, "El correo electrónico es demasiado largo.");

export const passwordSchema = requiredString("La contraseña es obligatoria.")
  .min(8, "La contraseña debe tener al menos 8 caracteres.")
  .max(128, "La contraseña es demasiado larga.")
  .regex(/[A-Za-z]/, "La contraseña debe contener al menos una letra.");

export const strongPasswordSchema = passwordSchema
  .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula.")
  .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula.")
  .regex(/\d/, "La contraseña debe contener al menos un número.");

export const confirmPasswordSchema = z
  .string({ required_error: "Confirma la contraseña." })
  .trim()
  .min(1, "Confirma la contraseña.");

export const nameSchema = (message = "El nombre es obligatorio.") =>
  requiredString(message, 2)
    .max(100, "El nombre es demasiado largo.")
    .regex(SPANISH_NAME_REGEX, "El nombre solo puede contener letras, espacios y acentos.");

export const fullNameSchema = requiredString("El nombre completo es obligatorio.", 3)
  .max(150, "El nombre completo es demasiado largo.")
  .regex(SPANISH_NAME_REGEX, "El nombre solo puede contener letras, espacios y acentos.");

export const shortTextSchema = (requiredMessage, max = 80) =>
  requiredString(requiredMessage, 2).max(max, `Máximo ${max} caracteres.`);

export const longTextSchema = (requiredMessage, max = 500) =>
  requiredString(requiredMessage, 5).max(max, `Máximo ${max} caracteres.`);

export const optionalLongText = (max = 500) =>
  z
    .string()
    .trim()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v ? String(v).trim() : ""))
    .refine((v) => !v || v.length <= max, `Máximo ${max} caracteres.`);

export const phoneSchema = requiredString("El teléfono es obligatorio.")
  .max(30, "El teléfono es demasiado largo.")
  .regex(COLOMBIAN_PHONE_REGEX, "El teléfono no tiene un formato válido (solo números, +, - y espacios).");

export const optionalPhoneSchema = optionalString().refine(
  (v) => !v || COLOMBIAN_PHONE_REGEX.test(v),
  "El teléfono no tiene un formato válido."
);

export const documentSchema = requiredString("El documento es obligatorio.", 4)
  .max(30, "El documento es demasiado largo.")
  .regex(DOCUMENT_REGEX, "El documento contiene caracteres inválidos.");

export const positiveNumberSchema = (message = "El valor es obligatorio.") =>
  z
    .number({ required_error: message, invalid_type_error: "Debe ser un número." })
    .positive("El valor debe ser mayor que cero.");

export const nonNegativeNumberSchema = (message = "El valor es obligatorio.") =>
  z
    .number({ required_error: message, invalid_type_error: "Debe ser un número." })
    .min(0, "El valor no puede ser negativo.");

export const positiveIntSchema = (message = "El valor es obligatorio.") =>
  z
    .number({ required_error: message, invalid_type_error: "Debe ser un número entero." })
    .int("Debe ser un número entero.")
    .positive("El valor debe ser mayor que cero.");

export const nonNegativeIntSchema = (message = "El valor es obligatorio.") =>
  z
    .number({ required_error: message, invalid_type_error: "Debe ser un número entero." })
    .int("Debe ser un número entero.")
    .min(0, "El valor no puede ser negativo.");

export const requiredDateSchema = (message = "La fecha es obligatoria.") =>
  z
    .string({ required_error: message })
    .min(1, message)
    .refine((v) => !isNaN(new Date(v).getTime()), "La fecha no es válida.");

export const optionalDateSchema = () =>
  z
    .string()
    .nullish()
    .or(z.literal(""))
    .transform((v) => v || "")
    .refine((v) => !v || !isNaN(new Date(v).getTime()), "La fecha no es válida.");

export const dateRangeSchema = z
  .object({
    startDate: optionalDateSchema(),
    endDate: optionalDateSchema(),
  })
  .refine(
    (d) => !d.startDate || !d.endDate || new Date(d.startDate) <= new Date(d.endDate),
    {
      message: "La fecha de finalización no puede ser anterior a la fecha de inicio.",
      path: ["endDate"],
    }
  );

export const requiredSelectSchema = (message = "Seleccione una opción.") =>
  z
    .string({ required_error: message })
    .trim()
    .min(1, message);

export const nonEmptyArraySchema = (message = "Seleccione al menos un elemento.") =>
  z.array(z.any()).min(1, message);

export const ratingSchema = z
  .number({ invalid_type_error: "Debe ser un número." })
  .min(0, "La calificación mínima es 0.")
  .max(5, "La calificación máxima es 5.")
  .nullish()
  .or(z.literal(""))
  .transform((v) => (v === "" || v == null ? 0 : Number(v)))
  .refine((v) => v >= 0 && v <= 5, "La calificación debe estar entre 0 y 5.");

export const csvStringArrayTransform = z.preprocess(
  (val) => {
    if (Array.isArray(val)) return val.filter(Boolean).map((v) => String(v).trim());
    if (!val) return [];
    return String(val)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  },
  z.array(z.string().trim().min(1, "Cada elemento no puede estar vacío."))
);

export const optionalSelect = () =>
  z
    .string()
    .nullish()
    .or(z.literal(""))
    .transform((v) => v || "");

export const passwordMatchRefine = (schema) =>
  schema.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const registerPasswordMatchRefine = (schema) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export function enumSchema(allowedValues, message = "Valor inválido.") {
  return z
    .string({ required_error: message })
    .trim()
    .toUpperCase()
    .refine((v) => allowedValues.includes(v), message);
}

export function optionalEnumSchema(allowedValues) {
  return z
    .string()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v ? String(v).trim().toUpperCase() : ""))
    .refine((v) => !v || allowedValues.includes(v), "Valor inválido.");
}

export const tipoDocumentoSchema = enumSchema(
  TIPO_DOCUMENTO_ENUM,
  "Seleccione un tipo de documento."
);

export const generoSchema = optionalEnumSchema(GENERO_ENUM);

export const nivelIdiomaSchema = enumSchema(
  NIVEL_IDIOMA_ENUM,
  "Seleccione un nivel."
);

export const estadoUsuarioSchema = enumSchema(
  ESTADO_USUARIO_ENUM,
  "Seleccione un estado."
);

export const estadoTourSchema = enumSchema(
  ESTADO_TOUR_ENUM,
  "Seleccione un estado."
);

export const estadoSalidaSchema = enumSchema(
  ESTADO_SALIDA_ENUM,
  "Seleccione un estado."
);

export const estadoReservaSchema = enumSchema(
  ESTADO_RESERVA_ENUM,
  "Seleccione un estado."
);

export const estadoGrupoSchema = enumSchema(
  ESTADO_GRUPO_ENUM,
  "Seleccione un estado."
);

export const estadoVentaSchema = enumSchema(
  ESTADO_VENTA_ENUM,
  "Seleccione un estado."
);

export const bigIntIdSchema = z.union([
  z
    .number({ invalid_type_error: "Debe ser un ID numérico." })
    .int("Debe ser entero.")
    .positive("ID debe ser positivo."),
  z
    .string()
    .trim()
    .refine((v) => /^\d+$/.test(v), "Debe ser un ID numérico.")
    .transform((v) => Number(v)),
]);

export const requiredBigIntSchema = (message = "Seleccione una opción.") =>
  bigIntIdSchema.refine((v) => Number(v) > 0, message);

export const emailLowercaseSchema = emailSchema.transform((v) =>
  v.toLowerCase()
);

export function splitFullNameToFirstLast(fullName) {
  const trimmed = String(fullName || "").trim();
  if (!trimmed) return { nombre: "", apellido: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { nombre: parts[0], apellido: "" };
  const mid = Math.ceil(parts.length / 2);
  return {
    nombre: parts.slice(0, mid).join(" "),
    apellido: parts.slice(mid).join(" "),
  };
}

export function joinFirstLastToFull(nombre = "", apellido = "") {
  return [String(nombre || "").trim(), String(apellido || "").trim()]
    .filter(Boolean)
    .join(" ");
}

export function precioSchema(message = "El precio es obligatorio.") {
  return z
    .number({ required_error: message, invalid_type_error: "Debe ser un número." })
    .min(0, "El precio no puede ser negativo.");
}

export function porcentajeSchema(message = "El descuento es obligatorio.") {
  return z
    .number({ required_error: message, invalid_type_error: "Debe ser un número." })
    .min(0, "No puede ser negativo.")
    .max(100, "No puede exceder el 100%.");
}

export const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export const colorSchema = z
  .string({ required_error: "Seleccione un color." })
  .trim()
  .regex(HEX_COLOR_REGEX, "Color hex inválido (ej: #FF8A3D).");

export const optionalColorSchema = z
  .string()
  .nullish()
  .or(z.literal(""))
  .transform((v) => (v ? String(v).trim() : ""))
  .refine((v) => !v || HEX_COLOR_REGEX.test(v), "Color hex inválido.");
