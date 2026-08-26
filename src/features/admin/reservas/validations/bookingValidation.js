import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  requiredSelectSchema,
  requiredDateSchema,
  positiveIntSchema,
  nonNegativeNumberSchema,
  nonNegativeIntSchema,
  optionalLongText,
  optionalString,
  optionalDateSchema,
} from "@/shared/validations/sharedSchemas";

export const bookingSchema = z.object({
  customer: fullNameSchema,
  tour: requiredSelectSchema("Seleccione un tour."),
  date: requiredDateSchema("La fecha es obligatoria."),
  time: requiredSelectSchema("Seleccione una hora."),
  people: positiveIntSchema("El número de personas es obligatorio."),
  total: nonNegativeNumberSchema("El total es obligatorio."),
  status: requiredSelectSchema("Seleccione un estado."),
  paymentMethod: requiredSelectSchema("Seleccione un método de pago."),
  phone: optionalPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  guide: optionalString(),
  notes: optionalLongText(600),
});
