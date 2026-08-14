import { useState } from "react";
import { toast } from "sonner";
import { DEFAULT_PROFILE, DEFAULT_NOTIFICATIONS, DEFAULT_SECURITY, DEFAULT_PREFERENCES, DEFAULT_BILLING, DEFAULT_INTEGRATIONS, } from "../settingsServices";
export function useSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
    const [security, setSecurity] = useState(DEFAULT_SECURITY);
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
    const [billing, setBilling] = useState(DEFAULT_BILLING);
    const [integrations, setIntegrations] = useState(DEFAULT_INTEGRATIONS);
    const saveSection = (section) => {
        toast.success(`Sección "${section}" guardada exitosamente`);
        if (section === "Seguridad") {
            setSecurity({ ...security, currentPassword: "", newPassword: "", confirmPassword: "" });
        }
    };
    return {
        activeTab,
        setActiveTab,
        profile,
        setProfile,
        notifications,
        setNotifications,
        security,
        setSecurity,
        preferences,
        setPreferences,
        billing,
        setBilling,
        integrations,
        setIntegrations,
        saveSection,
    };
}
