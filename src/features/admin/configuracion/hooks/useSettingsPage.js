import { useState } from "react";
import { toast } from "sonner";
import {
  loadAllSettings,
  saveSettingsSection,
} from "../settingsServices";

const LABEL_TO_SECTION = {
  Perfil: "profile",
  Notificaciones: "notifications",
  Seguridad: "security",
  Preferencias: "preferences",
  Facturación: "billing",
  Integraciones: "integrations",
};

export function useSettingsPage() {
  const initial = loadAllSettings();

  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initial.profile);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [security, setSecurity] = useState(initial.security);
  const [preferences, setPreferences] = useState(initial.preferences);
  const [billing, setBilling] = useState(initial.billing);
  const [integrations, setIntegrations] = useState(initial.integrations);

  const saveSection = (sectionLabel) => {
    const sectionKey = LABEL_TO_SECTION[sectionLabel] || sectionLabel?.toLowerCase();
    const stateBySection = {
      profile,
      notifications,
      security,
      preferences,
      billing,
      integrations,
    };
    const payload = stateBySection[sectionKey];
    if (payload && sectionKey) {
      saveSettingsSection(sectionKey, payload);
    }
    toast.success(`Sección "${sectionLabel}" guardada exitosamente`);
    if (sectionKey === "security") {
      setSecurity({
        ...security,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
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

