import { z } from "zod";
import {
  fullNameSchema,
  emailSchema,
  optionalPhoneSchema,
  optionalString,
  shortTextSchema,
  dateRangeSchema,
  requiredSelectSchema,
  strongPasswordSchema,
  confirmPasswordSchema,
  passwordMatchRefine,
  nonNegativeIntSchema,
  optionalLongText,
} from "@/shared/validations/sharedSchemas";

export const profileSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  position: shortTextSchema("El cargo es obligatorio.", 80),
  department: shortTextSchema("El departamento es obligatorio.", 80),
});

export const notificationsSchema = z.object({
  emailBookings: z.boolean().default(false),
  emailClients: z.boolean().default(false),
  emailReports: z.boolean().default(false),
  smsBookings: z.boolean().default(false),
  pushAll: z.boolean().default(false),
});

export const securitySchema = passwordMatchRefine(
  z.object({
    currentPassword: confirmPasswordSchema,
    newPassword: strongPasswordSchema,
    confirmPassword: confirmPasswordSchema,
    twoFactorEnabled: z.boolean().default(false),
    sessionTimeout: nonNegativeIntSchema("El tiempo de sesión es obligatorio."),
  })
);

export const preferencesSchema = z.object({
  language: requiredSelectSchema("Seleccione un idioma."),
  currency: requiredSelectSchema("Seleccione una moneda."),
  timezone: requiredSelectSchema("Seleccione una zona horaria."),
  dateFormat: requiredSelectSchema("Seleccione un formato de fecha."),
  defaultTab: requiredSelectSchema("Seleccione una página de inicio."),
  compactView: z.boolean().default(false),
});

export const billingSchema = z.object({
  companyName: shortTextSchema("El nombre de la empresa es obligatorio.", 120),
  taxId: shortTextSchema("El NIT/Identificación es obligatorio.", 40),
  address: shortTextSchema("La dirección es obligatoria.", 150),
  city: shortTextSchema("La ciudad es obligatoria.", 60),
  country: shortTextSchema("El país es obligatorio.", 60),
  invoiceEmail: emailSchema,
});

export const integrationsSchema = z.object({
  stripeEnabled: z.boolean().default(false),
  stripeApiKey: optionalString(),
  whatsappEnabled: z.boolean().default(false),
  whatsappNumber: optionalPhoneSchema,
  googleEnabled: z.boolean().default(false),
  googleAnalyticsId: optionalString(),
  emailSmtpHost: optionalString(),
  emailSmtpPort: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" || v == null ? 0 : Number(v)))
    .refine((v) => Number.isInteger(v) && v >= 0, "El puerto debe ser un número entero no negativo."),
  emailFrom: optionalString(),
  smtpUser: optionalString(),
  smtpPass: optionalString(),
});

export const reportFiltersSchema = dateRangeSchema.and(
  z.object({
    reportType: requiredSelectSchema("Seleccione un tipo de reporte."),
  })
);
