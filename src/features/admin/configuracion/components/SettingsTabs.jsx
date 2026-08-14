import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Switch } from "@/shared/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { User, Bell, Shield, Settings2, CreditCard, Zap, Save, } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
const iconMap = { User, Bell, Shield, Settings2, CreditCard, Zap };
export function SettingsTabsWrapper({ activeTab, onTabChange, children }) {
    const tabs = [
        { value: "profile", label: "Perfil", icon: "User" },
        { value: "notifications", label: "Notificaciones", icon: "Bell" },
        { value: "security", label: "Seguridad", icon: "Shield" },
        { value: "preferences", label: "Preferencias", icon: "Settings2" },
        { value: "billing", label: "Facturación", icon: "CreditCard" },
        { value: "integrations", label: "Integraciones", icon: "Zap" },
    ];
    return (<Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
        {tabs.map((tab) => {
            const Icon = iconMap[tab.icon];
            return (<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
              <Icon className="h-4 w-4"/>
              <span className="hidden md:inline">{tab.label}</span>
            </TabsTrigger>);
        })}
      </TabsList>
      {children}
    </Tabs>);
}
export function SectionCard({ title, description, onSave, children, saveLabel = "Guardar cambios" }) {
    return (<Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2"/>
          {saveLabel}
        </Button>
      </CardFooter>
    </Card>);
}
export function ProfileForm({ profile, onChange, onSave }) {
    return (<TabsContent value="profile">
      <SectionCard title="Información del Perfil" description="Actualiza tus datos personales y profisionales" onSave={onSave}>
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {profile.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" size="sm">Cambiar foto</Button>
            <p className="text-xs text-muted-foreground">PNG o JPG, máximo 5MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Nombre completo</Label><Input value={profile.fullName} onChange={(e) => onChange({ ...profile, fullName: e.target.value })}/></div>
          <div><Label>Email</Label><Input type="email" value={profile.email} onChange={(e) => onChange({ ...profile, email: e.target.value })}/></div>
          <div><Label>Teléfono</Label><Input value={profile.phone} onChange={(e) => onChange({ ...profile, phone: e.target.value })}/></div>
          <div><Label>Cargo</Label><Input value={profile.position} onChange={(e) => onChange({ ...profile, position: e.target.value })}/></div>
          <div className="md:col-span-2"><Label>Departamento</Label><Input value={profile.department} onChange={(e) => onChange({ ...profile, department: e.target.value })}/></div>
        </div>
      </SectionCard>
    </TabsContent>);
}
export function NotificationsForm({ notifications, onChange, onSave }) {
    const items = [
        { key: "emailBookings", title: "Reservas por Email", desc: "Recibe email cuando haya una nueva reserva" },
        { key: "emailClients", title: "Nuevos Clientes", desc: "Notifica cuando se registra un cliente" },
        { key: "emailReports", title: "Reportes Diarios", desc: "Resumen diario a tu bandeja" },
        { key: "smsBookings", title: "SMS de Reservas", desc: "Alertas rápidas por SMS" },
        { key: "pushAll", title: "Notificaciones Push", desc: "Notificaciones en navegador móvil" },
    ];
    return (<TabsContent value="notifications">
      <SectionCard title="Preferencias de Notificaciones" description="Decide cómo y cuándo quieres ser notificado" onSave={onSave}>
        <div className="space-y-4">
          {items.map(({ key, title, desc }) => (<div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
              <Switch checked={notifications[key]} onCheckedChange={(c) => onChange({ ...notifications, [key]: c })}/>
            </div>))}
        </div>
      </SectionCard>
    </TabsContent>);
}
export function SecurityForm({ security, onChange, onSave }) {
    return (<TabsContent value="security">
      <SectionCard title="Seguridad y Acceso" description="Cambia tu contraseña y opciones de autenticación" onSave={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2"><Label>Contraseña actual</Label><Input type="password" value={security.currentPassword} onChange={(e) => onChange({ ...security, currentPassword: e.target.value })}/></div>
          <div><Label>Nueva contraseña</Label><Input type="password" value={security.newPassword} onChange={(e) => onChange({ ...security, newPassword: e.target.value })}/></div>
          <div><Label>Confirmar contraseña</Label><Input type="password" value={security.confirmPassword} onChange={(e) => onChange({ ...security, confirmPassword: e.target.value })}/></div>
        </div>
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Autenticación de dos factores</div>
              <div className="text-sm text-muted-foreground">Añade una capa extra de seguridad</div>
            </div>
            <Switch checked={security.twoFactorEnabled} onCheckedChange={(c) => onChange({ ...security, twoFactorEnabled: c })}/>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tiempo de expiración de sesión (minutos)</div>
              <div className="text-sm text-muted-foreground">Tiempo de inactividad permitido</div>
            </div>
            <Input className="w-32" type="number" min={1} max={480} value={security.sessionTimeout} onChange={(e) => onChange({ ...security, sessionTimeout: Number(e.target.value) })}/>
          </div>
        </div>
      </SectionCard>
    </TabsContent>);
}
export function PreferencesForm({ preferences, onChange, onSave }) {
    return (<TabsContent value="preferences">
      <SectionCard title="Preferencias Generales" description="Personaliza la apariencia y comportamiento" onSave={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Idioma</Label>
            <Select value={preferences.language} onValueChange={(v) => onChange({ ...preferences, language: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Spanish">Español</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Portuguese">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Moneda</Label>
            <Select value={preferences.currency} onValueChange={(v) => onChange({ ...preferences, currency: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="COP">COP (Peso Colombiano)</SelectItem>
                <SelectItem value="USD">USD (Dólar)</SelectItem>
                <SelectItem value="EUR">EUR (Euro)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Zona horaria</Label>
            <Select value={preferences.timezone} onValueChange={(v) => onChange({ ...preferences, timezone: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                <SelectItem value="America/Mexico_City">CDMX</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Formato de fecha</Label>
            <Select value={preferences.dateFormat} onValueChange={(v) => onChange({ ...preferences, dateFormat: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Página de inicio</Label>
            <Select value={preferences.defaultTab} onValueChange={(v) => onChange({ ...preferences, defaultTab: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="bookings">Reservas</SelectItem>
                <SelectItem value="tours">Tours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <div className="font-medium">Vista compacta</div>
            <div className="text-sm text-muted-foreground">Más información por pantalla</div>
          </div>
          <Switch checked={preferences.compactView} onCheckedChange={(c) => onChange({ ...preferences, compactView: c })}/>
        </div>
      </SectionCard>
    </TabsContent>);
}
export function BillingForm({ billing, onChange, onSave }) {
    return (<TabsContent value="billing">
      <SectionCard title="Facturación" description="Información para emisión de facturas" onSave={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Empresa</Label><Input value={billing.companyName} onChange={(e) => onChange({ ...billing, companyName: e.target.value })}/></div>
          <div><Label>NIT / Identificación</Label><Input value={billing.taxId} onChange={(e) => onChange({ ...billing, taxId: e.target.value })}/></div>
          <div className="md:col-span-2"><Label>Dirección</Label><Input value={billing.address} onChange={(e) => onChange({ ...billing, address: e.target.value })}/></div>
          <div><Label>Ciudad</Label><Input value={billing.city} onChange={(e) => onChange({ ...billing, city: e.target.value })}/></div>
          <div><Label>País</Label><Input value={billing.country} onChange={(e) => onChange({ ...billing, country: e.target.value })}/></div>
          <div className="md:col-span-2"><Label>Email de facturación</Label><Input type="email" value={billing.invoiceEmail} onChange={(e) => onChange({ ...billing, invoiceEmail: e.target.value })}/></div>
        </div>
      </SectionCard>
    </TabsContent>);
}
export function IntegrationsForm({ integrations, onChange, onSave }) {
    return (<TabsContent value="integrations">
      <SectionCard title="Integraciones" description="Conecta servicios externos con el panel" onSave={onSave}>
        <div className="space-y-6">
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Stripe (Pagos)</div>
                <div className="text-sm text-muted-foreground">Recibe pagos online</div>
              </div>
              <Switch checked={integrations.stripeEnabled} onCheckedChange={(c) => onChange({ ...integrations, stripeEnabled: c })}/>
            </div>
            <Label>API Key Stripe</Label>
            <Input type="password" value={integrations.stripeApiKey} onChange={(e) => onChange({ ...integrations, stripeApiKey: e.target.value })}/>
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">WhatsApp Business</div>
                <div className="text-sm text-muted-foreground">Notificaciones automatizadas</div>
              </div>
              <Switch checked={integrations.whatsappEnabled} onCheckedChange={(c) => onChange({ ...integrations, whatsappEnabled: c })}/>
            </div>
            <Label>Número de WhatsApp</Label>
            <Input value={integrations.whatsappNumber} onChange={(e) => onChange({ ...integrations, whatsappNumber: e.target.value })}/>
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Google Analytics</div>
                <div className="text-sm text-muted-foreground">Analítica web</div>
              </div>
              <Switch checked={integrations.googleEnabled} onCheckedChange={(c) => onChange({ ...integrations, googleEnabled: c })}/>
            </div>
            <Label>Measurement ID</Label>
            <Input value={integrations.googleAnalyticsId} onChange={(e) => onChange({ ...integrations, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXX"/>
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <div className="font-medium">Servidor de correo SMTP</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div><Label>Host</Label><Input value={integrations.emailSmtpHost} onChange={(e) => onChange({ ...integrations, emailSmtpHost: e.target.value })}/></div>
              <div><Label>Puerto</Label><Input type="number" value={integrations.emailSmtpPort} onChange={(e) => onChange({ ...integrations, emailSmtpPort: Number(e.target.value) })}/></div>
              <div><Label>Remitente</Label><Input value={integrations.emailFrom} onChange={(e) => onChange({ ...integrations, emailFrom: e.target.value })}/></div>
            </div>
          </div>
        </div>
      </SectionCard>
    </TabsContent>);
}
