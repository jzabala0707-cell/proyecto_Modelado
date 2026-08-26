import { z } from "zod";
import {
  requiredDateSchema,
  requiredSelectSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  optionalString,
} from "@/shared/validations/sharedSchemas";

export const saleSchema = z.object({
  client: requiredSelectSchema("Seleccione un cliente."),
  tour: requiredSelectSchema("Seleccione un tour."),
  date: requiredDateSchema("La fecha es obligatoria."),
  subtotal: nonNegativeNumberSchema("El subtotal es obligatorio."),
  discount: nonNegativeNumberSchema("El descuento es obligatorio."),
  status: requiredSelectSchema("Seleccione un estado."),
  paymentMethod: requiredSelectSchema("Seleccione un método de pago."),
});

export const paymentSchema = z.object({
  saleId: requiredSelectSchema("Seleccione la factura asociada."),
  date: requiredDateSchema("La fecha de pago es obligatoria."),
  method: requiredSelectSchema("Seleccione un método."),
  amount: positiveNumberSchema("El monto es obligatorio."),
  status: requiredSelectSchema("Seleccione un estado."),
  reference: optionalString(),
});
