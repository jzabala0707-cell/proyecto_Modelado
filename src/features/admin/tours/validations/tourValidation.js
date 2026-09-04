import { z } from "zod";
import {
  shortTextSchema,
  longTextSchema,
  optionalLongText,
  requiredBigIntSchema,
  nonNegativeIntSchema,
  positiveIntSchema,
  precioSchema,
  estadoTourSchema,
  estadoSalidaSchema,
  estadoGrupoSchema,
  optionalColorSchema,
  nameSchema,
  requiredDateSchema,
  requiredString,
  optionalSelect,
} from "@/shared/validations/sharedSchemas";

export const tourSchema = z.object({
  nombre: shortTextSchema("Nombre del tour es obligatorio.", 150),
  id_categoria: requiredBigIntSchema("Seleccione una categoría."),
  duracion_horas: z.coerce
    .number()
    .positive("Duración debe ser >0")
    .max(999, "Máx 999.99"),
  capacidad_maxima: positiveIntSchema("Capacidad máxima es obligatoria."),
  precio_base: precioSchema("Precio base es obligatorio."),
  estado: estadoTourSchema,
  descripcion: longTextSchema("Descripción es obligatoria.", 1500),
  punto_encuentro: shortTextSchema("Punto de encuentro es obligatorio.", 255),
  destino: optionalLongText(255),
  dificultad: optionalLongText(50),
  edad_minima: nonNegativeIntSchema("")
    .optional()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v ? Number(v) : null)),
  edad_maxima: nonNegativeIntSchema("")
    .optional()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v ? Number(v) : null)),
  latitud: z.coerce.number().min(-90).max(90).optional(),
  longitud: z.coerce.number().min(-180).max(180).optional(),
  incluye: optionalLongText(),
  no_incluye: optionalLongText(),
  recomendaciones: optionalLongText(),
  politica_cancelacion: optionalLongText(),
});

export const tourTypeSchema = z.object({
  nombre: shortTextSchema("Nombre categoría", 100),
  descripcion: optionalLongText(255),
  color: optionalColorSchema,
  activo: z.boolean().default(true),
});

export const salidaSchema = z.object({
  id_tour: requiredBigIntSchema("Seleccione un tour."),
  id_guia: requiredBigIntSchema("Seleccione un guía.").optional().nullable(),
  fecha_salida: requiredDateSchema("Fecha de salida es obligatoria."),
  hora_salida: requiredString("Hora salida obligatoria.", 4),
  hora_finalizacion: optionalSelect(),
  cupo_maximo: positiveIntSchema("Cupo máximo es obligatorio."),
  estado: estadoSalidaSchema,
  observaciones: optionalLongText(),
});

export const grupoSchema = z.object({
  nombre: shortTextSchema("Nombre del grupo es obligatorio.", 100),
  descripcion: optionalLongText(),
  estado: estadoGrupoSchema,
});
