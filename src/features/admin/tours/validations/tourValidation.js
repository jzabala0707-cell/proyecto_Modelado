import { z } from "zod";
import {
  shortTextSchema,
  longTextSchema,
  positiveIntSchema,
  positiveNumberSchema,
  nonNegativeNumberSchema,
  requiredSelectSchema,
  ratingSchema,
  csvStringArrayTransform,
  requiredDateSchema,
  optionalString,
  optionalLongText,
  requiredString,
} from "@/shared/validations/sharedSchemas";

export const tourSchema = z.object({
  name: shortTextSchema("El nombre del tour es obligatorio.", 120),
  type: requiredSelectSchema("Seleccione el tipo de tour."),
  duration: shortTextSchema("La duración es obligatoria.", 40),
  capacity: positiveIntSchema("La capacidad es obligatoria."),
  price: positiveNumberSchema("El precio es obligatorio."),
  rating: ratingSchema,
  status: requiredSelectSchema("Seleccione un estado."),
  description: longTextSchema("La descripción es obligatoria.", 1500),
  language: csvStringArrayTransform.optional().default([]),
});

export const groupSchema = z.object({
  tourName: requiredSelectSchema("Seleccione un tour."),
  groupName: shortTextSchema("El nombre del grupo es obligatorio.", 80),
  guideName: requiredSelectSchema("Seleccione un guía."),
  date: requiredDateSchema("La fecha es obligatoria."),
  startTime: z.string().min(1, "La hora de inicio es obligatoria."),
  maxCapacity: positiveIntSchema("La capacidad máxima es obligatoria."),
  status: requiredSelectSchema("Seleccione un estado."),
  meetingPoint: shortTextSchema("El punto de encuentro es obligatorio.", 150),
  notes: optionalLongText(800),
});

export const tourTypeSchema = z.object({
  name: shortTextSchema("El nombre del tipo de tour es obligatorio.", 60),
  description: longTextSchema("La descripción es obligatoria.", 400),
  color: requiredSelectSchema("Seleccione un color."),
});
