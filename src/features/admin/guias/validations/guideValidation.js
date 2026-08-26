import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  requiredSelectSchema,
  optionalString,
  optionalLongText,
  csvStringArrayTransform,
} from "@/shared/validations/sharedSchemas";

export const guideSchema = z.object({
  name: fullNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  status: requiredSelectSchema("Seleccione un estado."),
  languages: csvStringArrayTransform.optional().default([]),
  specialties: csvStringArrayTransform.optional().default([]),
  address: optionalString(),
  bio: optionalLongText(800),
});
