import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Switch } from "@/shared/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/shared/components/ui/form";
import { User, Bell, Shield, Settings2, CreditCard, Zap, Save, Eye, EyeOff, } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
    profileSchema,
    notificationsSchema,
    securitySchema,
    preferencesSchema,
    billingSchema,
    integrationsSchema,
} from "../validations/settingsValidation";

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
        <Button type="submit" onClick={onSave}>
          <Save className="h-4 w-4 mr-2"/>
          {saveLabel}
        </Button>
      </CardFooter>
    </Card>);
}

export function ProfileForm({ profile, onChange, onSave }) {
    const form = useForm({
        defaultValues: profile,
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        form.reset(profile);
    }, [profile, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    return (<TabsContent value="profile">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Información del Perfil" description="Actualiza tus datos personales y profisionales" onSave={handleSubmit}>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {(form.watch("fullName") || "").split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm" type="button">Cambiar foto</Button>
                <p className="text-xs text-muted-foreground">PNG o JPG, máximo 5MB</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}

export function NotificationsForm({ notifications, onChange, onSave }) {
    const form = useForm({
        defaultValues: notifications,
        resolver: zodResolver(notificationsSchema),
    });

    useEffect(() => {
        form.reset(notifications);
    }, [notifications, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    const items = [
        { key: "emailBookings", title: "Reservas por Email", desc: "Recibe email cuando haya una nueva reserva" },
        { key: "emailClients", title: "Nuevos Clientes", desc: "Notifica cuando se registra un cliente" },
        { key: "emailReports", title: "Reportes Diarios", desc: "Resumen diario a tu bandeja" },
        { key: "smsBookings", title: "SMS de Reservas", desc: "Alertas rápidas por SMS" },
        { key: "pushAll", title: "Notificaciones Push", desc: "Notificaciones en navegador móvil" },
    ];

    return (<TabsContent value="notifications">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Preferencias de Notificaciones" description="Decide cómo y cuándo quieres ser notificado" onSave={handleSubmit}>
            <div className="space-y-4">
              {items.map(({ key, title, desc }) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between py-3 border-b last:border-0 flex-row">
                      <div>
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-muted-foreground">{desc}</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}

export function SecurityForm({ security, onChange, onSave }) {
    const form = useForm({
        defaultValues: security,
        resolver: zodResolver(securitySchema),
    });

    useEffect(() => {
        form.reset(security);
    }, [security, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    return (<TabsContent value="security">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Seguridad y Acceso" description="Cambia tu contraseña y opciones de autenticación" onSave={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 border-t pt-4">
              <FormField
                control={form.control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between flex-row">
                    <div>
                      <div className="font-medium">Autenticación de dos factores</div>
                      <div className="text-sm text-muted-foreground">Añade una capa extra de seguridad</div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionTimeout"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between flex-row">
                    <div>
                      <div className="font-medium">Tiempo de expiración de sesión (minutos)</div>
                      <div className="text-sm text-muted-foreground">Tiempo de inactividad permitido</div>
                    </div>
                    <FormControl>
                      <Input
                        className="w-32"
                        type="number"
                        min={1}
                        max={480}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}

export function PreferencesForm({ preferences, onChange, onSave }) {
    const form = useForm({
        defaultValues: preferences,
        resolver: zodResolver(preferencesSchema),
    });

    useEffect(() => {
        form.reset(preferences);
    }, [preferences, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    return (<TabsContent value="preferences">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Preferencias Generales" description="Personaliza la apariencia y comportamiento" onSave={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idioma</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Spanish">Español</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Portuguese">Português</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moneda</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="COP">COP (Peso Colombiano)</SelectItem>
                        <SelectItem value="USD">USD (Dólar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zona horaria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                        <SelectItem value="America/Mexico_City">CDMX</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formato de fecha</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultTab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Página de inicio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="bookings">Reservas</SelectItem>
                        <SelectItem value="tours">Tours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="compactView"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border-t pt-4 flex-row">
                  <div>
                    <div className="font-medium">Vista compacta</div>
                    <div className="text-sm text-muted-foreground">Más información por pantalla</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}

export function BillingForm({ billing, onChange, onSave }) {
    const form = useForm({
        defaultValues: billing,
        resolver: zodResolver(billingSchema),
    });

    useEffect(() => {
        form.reset(billing);
    }, [billing, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    return (<TabsContent value="billing">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Facturación" description="Información para emisión de facturas" onSave={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT / Identificación</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceEmail"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email de facturación</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}

export function IntegrationsForm({ integrations, onChange, onSave }) {
    const form = useForm({
        defaultValues: integrations,
        resolver: zodResolver(integrationsSchema),
    });
    const [showStripeKey, setShowStripeKey] = useState(false);
    const [showSmtpPass, setShowSmtpPass] = useState(false);

    useEffect(() => {
        form.reset(integrations);
    }, [integrations, form]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onChange(value);
        });
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    const handleSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    return (<TabsContent value="integrations">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <SectionCard title="Integraciones" description="Conecta servicios externos con el panel" onSave={handleSubmit}>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg space-y-3">
                <FormField
                  control={form.control}
                  name="stripeEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between flex-row">
                      <div>
                        <div className="font-medium">Stripe (Pagos)</div>
                        <div className="text-sm text-muted-foreground">Recibe pagos online</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stripeApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key Stripe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showStripeKey ? "text" : "password"}
                            {...field}
                            value={field.value ?? ""}
                            className="pr-10"
                            placeholder="sk_live_••••••••••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowStripeKey((s) => !s)}
                            tabIndex={-1}
                          >
                            {showStripeKey ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        La clave se almacena encriptada y nunca se expone al cliente.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <FormField
                  control={form.control}
                  name="whatsappEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between flex-row">
                      <div>
                        <div className="font-medium">WhatsApp Business</div>
                        <div className="text-sm text-muted-foreground">Notificaciones automatizadas</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <FormField
                  control={form.control}
                  name="googleEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between flex-row">
                      <div>
                        <div className="font-medium">Google Analytics</div>
                        <div className="text-sm text-muted-foreground">Analítica web</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="googleAnalyticsId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Measurement ID</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} placeholder="G-XXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <div className="font-medium">Servidor de correo SMTP</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormField
                    control={form.control}
                    name="emailSmtpHost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailSmtpPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Puerto</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remitente</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smtpUser"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuario SMTP</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} placeholder="usuario@tudominio.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smtpPass"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Contraseña SMTP</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showSmtpPass ? "text" : "password"}
                              {...field}
                              value={field.value ?? ""}
                              className="pr-10"
                              placeholder="••••••••••••"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowSmtpPass((s) => !s)}
                              tabIndex={-1}
                            >
                              {showSmtpPass ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Se recomienda usar contraseñas de aplicaciones (OAuth2 en producción).
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </form>
      </Form>
    </TabsContent>);
}
