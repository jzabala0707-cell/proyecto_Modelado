import { z } from "zod";
import {
  fullNameSchema,
  emailLowercaseSchema,
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
  email: emailLowercaseSchema,
  phone: optionalPhoneSchema,
  cargo: shortTextSchema("El cargo es obligatorio.", 120),
  departamento: shortTextSchema("El departamento es obligatorio.", 120),
});

export const notificationsSchema = z.object({
  notif_email_reservas: z.boolean().default(true),
  notif_email_usuarios: z.boolean().default(false),
  notif_email_pagos: z.boolean().default(true),
  notif_push_all: z.boolean().default(true),
  notif_push_urgente: z.boolean().default(true),
  notif_push_pagos: z.boolean().default(true),
});

export const securitySchema = passwordMatchRefine(
  z.object({
    currentPassword: confirmPasswordSchema,
    newPassword: strongPasswordSchema,
    confirmPassword: confirmPasswordSchema,
    fa_activado: z.boolean().default(false),
    session_timeout_min: nonNegativeIntSchema("Tiempo de sesión obligatorio."),
    alert_sesiones_nuevas: z.boolean().default(true),
  })
);

export const preferencesSchema = z.object({
  idioma: requiredSelectSchema("Seleccione un idioma."),
  moneda: requiredSelectSchema("Seleccione una moneda."),
  zona_horaria: requiredSelectSchema("Seleccione zona horaria."),
  formato_fecha: requiredSelectSchema("Seleccione formato fecha."),
  pestana_default: requiredSelectSchema("Seleccione página de inicio."),
  vista_compacta: z.boolean().default(false),
});

export const billingSchema = z.object({
  factura_empresa: shortTextSchema("Empresa es obligatoria.", 120),
  factura_nit: shortTextSchema("NIT es obligatorio.", 40),
  factura_direccion: shortTextSchema("Dirección obligatoria.", 150),
  factura_ciudad: shortTextSchema("Ciudad obligatoria.", 60),
  factura_pais: shortTextSchema("País obligatorio.", 60),
  factura_email: emailLowercaseSchema,
});

export const integrationsSchema = z.object({
  stripe_enabled: z.boolean().default(false),
  stripe_api_key: optionalString(),
  whatsapp_habilitado: z.boolean().default(false),
  whatsapp_numero: optionalPhoneSchema,
  google_habilitado: z.boolean().default(false),
  google_analytics_id: optionalString(),
  smtp_host: optionalString(),
  smtp_port: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" || v == null ? 0 : Number(v)))
    .refine((v) => Number.isInteger(v) && v >= 0, "Puerto entero ≥ 0."),
  smtp_usuario: optionalString(),
  smtp_password: optionalString(),
  smtp_remitente: optionalString(),
  smtp_tls: z.boolean().default(true),
});

export const reportFiltersSchema = dateRangeSchema.and(
  z.object({
    reportType: requiredSelectSchema("Seleccione tipo reporte."),
  })
);

const SETTINGS_KEYS_MIGRATION = {
  position: "cargo",
  department: "departamento",
  emailBookings: "notif_email_reservas",
  emailClients: "notif_email_usuarios",
  emailReports: "notif_email_pagos",
  smsBookings: "notif_push_urgente",
  pushAll: "notif_push_all",
  twoFactorEnabled: "fa_activado",
  sessionTimeout: "session_timeout_min",
  language: "idioma",
  currency: "moneda",
  timezone: "zona_horaria",
  dateFormat: "formato_fecha",
  defaultTab: "pestana_default",
  compactView: "vista_compacta",
  companyName: "factura_empresa",
  taxId: "factura_nit",
  address: "factura_direccion",
  city: "factura_ciudad",
  country: "factura_pais",
  invoiceEmail: "factura_email",
  stripeEnabled: "stripe_enabled",
  stripeApiKey: "stripe_api_key",
  whatsappEnabled: "whatsapp_habilitado",
  whatsappNumber: "whatsapp_numero",
  googleEnabled: "google_habilitado",
  googleAnalyticsId: "google_analytics_id",
  emailSmtpHost: "smtp_host",
  emailSmtpPort: "smtp_port",
  smtpUser: "smtp_usuario",
  smtpPass: "smtp_password",
};

export function migrateLegacySettings(section) {
  if (!section || typeof section !== "object") return section;
  const out = { ...section };
  Object.entries(SETTINGS_KEYS_MIGRATION).forEach(([oldK, newK]) => {
    if (oldK in out && !(newK in out)) {
      out[newK] = out[oldK];
      delete out[oldK];
    }
  });
  return out;
}

