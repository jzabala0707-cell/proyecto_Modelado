import { z } from "zod";
import {
  requiredBigIntSchema,
  precioSchema,
  nonNegativeNumberSchema,
  estadoVentaSchema,
  optionalLongText,
  requiredDateSchema,
} from "@/shared/validations/sharedSchemas";

export const ventaSchema = z.object({
  id_reserva: requiredBigIntSchema("Seleccione la reserva asociada."),
  fecha_venta: requiredDateSchema("Fecha de venta es obligatoria."),
  subtotal: precioSchema("Subtotal es obligatorio."),
  impuestos: nonNegativeNumberSchema("Impuestos obligatorios").default(0),
  descuento: nonNegativeNumberSchema("Descuento obligatorio").default(0),
  total: precioSchema("Total es obligatorio."),
  estado: estadoVentaSchema,
  observaciones: optionalLongText(),
});

export const abonoSchema = z.object({
  id_venta: requiredBigIntSchema("Seleccione la venta."),
  fecha_abono: requiredDateSchema("Fecha de abono es obligatoria."),
  id_metodo_pago: requiredBigIntSchema("Seleccione método de pago."),
  monto: precioSchema("Monto del abono es obligatorio."),
  referencia: optionalLongText(100),
  comprobante_url: optionalLongText(500),
  observaciones: optionalLongText(),
});

export const saleSchema = ventaSchema;
export const paymentSchema = abonoSchema;
