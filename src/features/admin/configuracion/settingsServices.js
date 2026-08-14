export const DEFAULT_PROFILE = {
    fullName: "Juan Pérez",
    email: "admin@artetours.com",
    phone: "+57 300 123 4567",
    department: "Administración",
    position: "Administrador General",
};
export const DEFAULT_NOTIFICATIONS = {
    emailBookings: true,
    emailClients: true,
    emailReports: false,
    smsBookings: true,
    pushAll: true,
};
export const DEFAULT_SECURITY = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: 30,
};
export const DEFAULT_PREFERENCES = {
    language: "Spanish",
    currency: "COP",
    timezone: "America/Bogota",
    dateFormat: "DD/MM/YYYY",
    defaultTab: "dashboard",
    compactView: false,
};
export const DEFAULT_BILLING = {
    companyName: "Arte Tours SAS",
    taxId: "900.123.456-7",
    address: "Calle 70 #8-50 Oficina 402",
    city: "Medellín",
    country: "Colombia",
    invoiceEmail: "facturacion@artetours.com",
};
export const DEFAULT_INTEGRATIONS = {
    stripeEnabled: true,
    stripeApiKey: "sk_test_••••••••••••••••",
    whatsappEnabled: true,
    whatsappNumber: "+573001234567",
    googleEnabled: false,
    googleAnalyticsId: "",
    emailSmtpHost: "smtp.artetours.com",
    emailSmtpPort: 587,
    emailFrom: "no-reply@artetours.com",
};
export const SETTINGS_TABS = [
    { value: "profile", label: "Perfil", icon: "User" },
    { value: "notifications", label: "Notificaciones", icon: "Bell" },
    { value: "security", label: "Seguridad", icon: "Shield" },
    { value: "preferences", label: "Preferencias", icon: "Settings2" },
    { value: "billing", label: "Facturación", icon: "CreditCard" },
    { value: "integrations", label: "Integraciones", icon: "Zap" },
];
