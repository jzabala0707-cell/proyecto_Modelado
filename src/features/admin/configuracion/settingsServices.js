import { migrateLegacySettings } from "./validations/settingsValidation.js";

const STORAGE_PREFIX = "artetours_settings_";
const CURRENT_USER_ID_KEY = "artetours_current_user_id";

export const DEFAULT_PROFILE = {
  fullName: "Juan Pérez",
  email: "admin@artetours.com",
  phone: "+57 300 123 4567",
  cargo: "Administrador General",
  departamento: "Administración",
};

export const DEFAULT_NOTIFICATIONS = {
  notif_email_reservas: true,
  notif_email_usuarios: true,
  notif_email_pagos: false,
  notif_push_all: true,
  notif_push_urgente: true,
  notif_push_pagos: true,
};

export const DEFAULT_SECURITY = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  fa_activado: false,
  session_timeout_min: 30,
  alert_sesiones_nuevas: true,
};

export const DEFAULT_PREFERENCES = {
  idioma: "es",
  moneda: "COP",
  zona_horaria: "America/Bogota",
  formato_fecha: "DD/MM/YYYY",
  pestana_default: "dashboard",
  vista_compacta: false,
};

export const DEFAULT_BILLING = {
  factura_empresa: "Arte Tours SAS",
  factura_nit: "900.123.456-7",
  factura_direccion: "Calle 70 #8-50 Oficina 402",
  factura_ciudad: "Medellín",
  factura_pais: "Colombia",
  factura_email: "facturacion@artetours.com",
};

export const DEFAULT_INTEGRATIONS = {
  stripe_enabled: false,
  stripe_api_key: "",
  whatsapp_habilitado: false,
  whatsapp_numero: "+573001234567",
  google_habilitado: false,
  google_analytics_id: "",
  smtp_host: "",
  smtp_port: 587,
  smtp_usuario: "",
  smtp_password: "",
  smtp_tls: true,
};

export const SETTINGS_TABS = [
  { value: "profile", label: "Perfil", icon: "User" },
  { value: "notifications", label: "Notificaciones", icon: "Bell" },
  { value: "security", label: "Seguridad", icon: "Shield" },
  { value: "preferences", label: "Preferencias", icon: "Settings2" },
  { value: "billing", label: "Facturación", icon: "CreditCard" },
  { value: "integrations", label: "Integraciones", icon: "Zap" },
];

function getCurrentUserId() {
  try {
    return window.localStorage.getItem(CURRENT_USER_ID_KEY) || "anon";
  } catch {
    return "anon";
  }
}

function keyFor(section) {
  return `${STORAGE_PREFIX}${getCurrentUserId()}_${section}`;
}

export function loadSettingsSection(section, defaults) {
  try {
    const raw = window.localStorage.getItem(keyFor(section));
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    const migrated = migrateLegacySettings(parsed);
    return { ...defaults, ...migrated };
  } catch {
    return defaults;
  }
}

export function saveSettingsSection(section, payload) {
  try {
    const existing = loadSettingsSection(section, {});
    const merged = { ...existing, ...payload };
    delete merged.currentPassword;
    delete merged.newPassword;
    delete merged.confirmPassword;
    window.localStorage.setItem(keyFor(section), JSON.stringify(merged));
    return true;
  } catch {
    return false;
  }
}

export function getAllDefaults() {
  return {
    profile: DEFAULT_PROFILE,
    notifications: DEFAULT_NOTIFICATIONS,
    security: DEFAULT_SECURITY,
    preferences: DEFAULT_PREFERENCES,
    billing: DEFAULT_BILLING,
    integrations: DEFAULT_INTEGRATIONS,
  };
}

export function loadAllSettings() {
  const d = getAllDefaults();
  return {
    profile: loadSettingsSection("profile", d.profile),
    notifications: loadSettingsSection("notifications", d.notifications),
    security: { ...d.security, ...loadSettingsSection("security", {}) },
    preferences: loadSettingsSection("preferences", d.preferences),
    billing: loadSettingsSection("billing", d.billing),
    integrations: loadSettingsSection("integrations", d.integrations),
  };
}

