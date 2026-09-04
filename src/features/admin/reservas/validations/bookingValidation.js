import { z } from "zod";
import {
  requiredBigIntSchema,
  nonNegativeIntSchema,
  nonNegativeNumberSchema,
  precioSchema,
  estadoReservaSchema,
  optionalLongText,
  nameSchema,
  tipoDocumentoSchema,
  documentSchema,
  optionalDateSchema,
} from "@/shared/validations/sharedSchemas";

export const reservaSchema = z
  .object({
    id_turista: requiredBigIntSchema("Seleccione un turista."),
    id_salida: requiredBigIntSchema("Seleccione una salida de tour."),
    cantidad_adultos: nonNegativeIntSchema("Adultos es obligatorio.").default(1),
    cantidad_ninos: nonNegativeIntSchema("Niños es obligatorio.").default(0),
    precio_unitario: precioSchema("Precio unitario es obligatorio."),
    descuento: nonNegativeNumberSchema("Descuento es obligatorio.").default(0),
    estado: estadoReservaSchema,
    motivo_cancelacion: optionalLongText(255),
    observaciones: optionalLongText(),
  })
  .superRefine((data, ctx) => {
    const totalPax = Number(data.cantidad_adultos ?? 0) + Number(data.cantidad_ninos ?? 0);
    if (totalPax <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cantidad_adultos"],
        message: "Debe haber al menos una persona (adulto o niño).",
      });
    }
    if (data.estado === "CANCELADA" && (!data.motivo_cancelacion || String(data.motivo_cancelacion).trim().length < 3)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["motivo_cancelacion"],
        message: "Ingrese un motivo de cancelación (mínimo 3 caracteres).",
      });
    }
  });

export const participanteSchema = z.object({
  id_reserva: requiredBigIntSchema().optional(),
  nombres: nameSchema("Los nombres son obligatorios."),
  apellidos: nameSchema("Los apellidos son obligatorios."),
  tipo_documento: tipoDocumentoSchema,
  numero_documento: documentSchema,
  fecha_nacimiento: optionalDateSchema(),
  nacionalidad: optionalLongText(100),
  es_titular: z.boolean().default(false),
});
