import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Save, User, Bell, Shield, Settings2, CreditCard, Zap } from "lucide-react";
import { StatsGrid } from "@/features/admin/components/StatCard";
import { useSettingsPage } from "../hooks/useSettingsPage";
import { SettingsTabsWrapper, ProfileForm, NotificationsForm, SecurityForm, PreferencesForm, BillingForm, IntegrationsForm, } from "../components/SettingsTabs";
export function SettingsPage() {
    const s = useSettingsPage();
    const quickStats = [
        { title: "Perfil", value: "Activo", icon: User, color: "text-primary" },
        { title: "Notificaciones", value: s.notifications.emailBookings && s.notifications.pushAll ? "5/5" : "Parcial", icon: Bell, color: "text-secondary" },
        { title: "2FA", value: s.security.twoFactorEnabled ? "Activado" : "Desactivado", icon: Shield, color: s.security.twoFactorEnabled ? "text-success" : "text-warning" },
        { title: "Stripe", value: s.integrations.stripeEnabled ? "Conectado" : "Desconectado", icon: CreditCard, color: s.integrations.stripeEnabled ? "text-success" : "text-destructive" },
    ];
    const handleSaveAll = () => {
        s.saveSection("Perfil");
        s.saveSection("Notificaciones");
        s.saveSection("Preferencias");
        s.saveSection("Facturación");
        s.saveSection("Integraciones");
    };
    return (<DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Configuración" subtitle="Personaliza tu experiencia y gestiona el sistema" action={<Button onClick={handleSaveAll}>
              <Save className="mr-2 h-4 w-4"/>
              Guardar Todo
            </Button>}/>

        <StatsGrid stats={quickStats} columns={4}/>

        <SettingsTabsWrapper activeTab={s.activeTab} onTabChange={s.setActiveTab}>
          <ProfileForm profile={s.profile} onChange={s.setProfile} onSave={() => s.saveSection("Perfil")}/>
          <NotificationsForm notifications={s.notifications} onChange={s.setNotifications} onSave={() => s.saveSection("Notificaciones")}/>
          <SecurityForm security={s.security} onChange={s.setSecurity} onSave={() => s.saveSection("Seguridad")}/>
          <PreferencesForm preferences={s.preferences} onChange={s.setPreferences} onSave={() => s.saveSection("Preferencias")}/>
          <BillingForm billing={s.billing} onChange={s.setBilling} onSave={() => s.saveSection("Facturación")}/>
          <IntegrationsForm integrations={s.integrations} onChange={s.setIntegrations} onSave={() => s.saveSection("Integraciones")}/>
        </SettingsTabsWrapper>
      </div>
    </DashboardLayout>);
}
