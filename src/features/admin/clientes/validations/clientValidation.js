import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  requiredSelectSchema,
  requiredDateSchema,
  nonNegativeIntSchema,
  nonNegativeNumberSchema,
  optionalDateSchema,
} from "@/shared/validations/sharedSchemas";

export const clientSchema = z.object({
  name: fullNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  status: requiredSelectSchema("Seleccione un estado."),
  nationality: requiredSelectSchema("Seleccione la nacionalidad."),
  bookings: nonNegativeIntSchema("La cantidad de reservas es obligatoria."),
  totalSpent: nonNegativeNumberSchema("El gasto total es obligatorio."),
  registrationDate: requiredDateSchema("La fecha de registro es obligatoria."),
  lastBooking: optionalDateSchema(),
});
