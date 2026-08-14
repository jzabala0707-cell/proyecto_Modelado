# Arte Tours - Sistema de Gestión de Tours

Sistema profesional de gestión de tours turísticos desarrollado con React, TypeScript, Tailwind CSS y React Router.

## 🎯 Características Principales

### Módulos Implementados

- ✅ **Landing Page** - Página de presentación moderna y atractiva
- ✅ **Autenticación**
  - Login con validación
  - Registro de usuarios
  - Recuperación de contraseña
- ✅ **Dashboard Principal**
  - KPIs y métricas en tiempo real
  - Gráficos interactivos (Recharts)
  - Actividad reciente
  - Próximos tours
- ✅ **Gestión de Usuarios** - CRUD completo con búsqueda y filtros
- ✅ **Gestión de Tours** - Catálogo visual de tours disponibles
- ✅ **Gestión de Reservas** - Control completo de reservas y estados
- ✅ **Gestión de Clientes** - Base de datos de clientes y turistas
- ✅ **Reportes y Análisis** - Estadísticas detalladas con gráficos
- ✅ **Configuración** - Preferencias del sistema

## 🎨 Diseño y UX

### Paleta de Colores

- **Primario**: `#2563eb` (Azul corporativo)
- **Secundario**: `#06b6d4` (Turquesa)
- **Éxito**: `#22c55e` (Verde)
- **Advertencia**: `#f97316` (Naranja)
- **Error**: `#ef4444` (Rojo)
- **Info**: `#3b82f6` (Azul claro)

### Tipografía

- **Principal**: Inter - Para cuerpo de texto
- **Encabezados**: Poppins - Para títulos y headings

### Características de Diseño

- ✨ Diseño moderno y profesional
- 🎨 Modo claro/oscuro
- 📱 Totalmente responsive (Mobile, Tablet, Desktop)
- 🎯 Sistema de diseño basado en shadcn/ui
- 🔄 Animaciones suaves y microinteracciones
- ♿ Accesibilidad WCAG 2.1

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Framework de estilos
- **React Router 7** - Navegación
- **Recharts** - Gráficos y visualizaciones
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía
- **Material UI** - Componentes complementarios

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Componentes de UI reutilizables
│   │   └── dashboard-layout.tsx  # Layout del dashboard
│   ├── pages/
│   │   ├── landing.tsx      # Landing page
│   │   ├── login.tsx        # Inicio de sesión
│   │   ├── register.tsx     # Registro
│   │   ├── forgot-password.tsx  # Recuperar contraseña
│   │   └── dashboard/       # Páginas del dashboard
│   │       ├── dashboard.tsx
│   │       ├── users.tsx
│   │       ├── tours.tsx
│   │       ├── bookings.tsx
│   │       ├── clients.tsx
│   │       ├── reports.tsx
│   │       └── settings.tsx
│   └── App.tsx             # Componente principal
├── styles/
│   ├── theme.css           # Variables de tema
│   └── fonts.css           # Fuentes
└── lib/
    └── utils.ts            # Utilidades
```

## 🚀 Rutas de Navegación

### Públicas
- `/` - Landing Page
- `/login` - Inicio de sesión
- `/register` - Registro
- `/forgot-password` - Recuperar contraseña

### Privadas (Dashboard)
- `/dashboard` - Dashboard principal
- `/dashboard/users` - Gestión de usuarios
- `/dashboard/tours` - Gestión de tours
- `/dashboard/bookings` - Gestión de reservas
- `/dashboard/clients` - Gestión de clientes
- `/dashboard/reports` - Reportes y análisis
- `/dashboard/settings` - Configuración

## 💡 Características Técnicas

### Componentes UI Incluidos

- ✅ Buttons (Primary, Secondary, Success, Warning, Destructive, Ghost, Outline)
- ✅ Inputs y Forms
- ✅ Cards y Layouts
- ✅ Tables con paginación
- ✅ Modales y Diálogos
- ✅ Alerts y Notificaciones (Toast)
- ✅ Dropdowns y Selects
- ✅ Badges y Avatares
- ✅ Tabs y Separadores
- ✅ Switch y Checkbox
- ✅ Sidebar colapsable
- ✅ Navigation Menu

### Funcionalidades

- 🔍 Búsqueda en tiempo real
- 🎯 Filtros avanzados
- 📊 Gráficos interactivos
- 📱 Notificaciones en tiempo real
- 🌙 Modo oscuro
- 🔔 Centro de notificaciones
- 👤 Gestión de perfil
- 🔐 Autenticación segura
- 📄 Exportación de datos
- ⚙️ Configuración personalizable

## 📊 Dashboard Features

### KPIs Principales
- Total de tours
- Tours activos
- Total de clientes
- Ingresos del mes

### Gráficos
- Ventas y reservas mensuales (Area Chart)
- Tours más populares (Pie Chart)
- Evolución de ingresos (Line Chart)
- Rendimiento por tour (Bar Chart)

### Widgets
- Actividad reciente
- Próximos tours
- Notificaciones
- Calendario

## 🎯 Casos de Uso

### Para Administradores
- Gestión completa de usuarios y roles
- Supervisión de todas las operaciones
- Reportes y análisis detallados
- Configuración del sistema

### Para Recepcionistas
- Crear y gestionar reservas
- Registrar clientes
- Gestionar pagos
- Ver calendario de tours

### Para Guías
- Ver tours asignados
- Gestionar disponibilidad
- Acceder a información de grupos
- Actualizar estado de tours

### Para Turistas (Futuro)
- Ver catálogo de tours
- Realizar reservas
- Gestionar perfil
- Ver historial

## 🔒 Seguridad

- Validación de formularios
- Confirmaciones de acciones destructivas
- Gestión de sesiones
- Protección de rutas privadas

## 📱 Responsive Design

El sistema está optimizado para:
- 📱 **Mobile**: 390px - 767px
- 📱 **Tablet**: 768px - 1023px
- 💻 **Desktop**: 1024px+

## 🎨 Temas

### Modo Claro
- Fondo blanco limpio
- Contraste optimizado
- Ideal para trabajo diurno

### Modo Oscuro
- Fondo oscuro elegante
- Reduce fatiga visual
- Perfecto para trabajo nocturno

## 🚀 Próximas Mejoras

- [ ] Integración con backend real
- [ ] Autenticación con JWT
- [ ] Integración de pagos (Stripe/PayPal)
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Integración con Google Calendar
- [ ] Sistema de calificaciones y reseñas
- [ ] Multiidioma (i18n)
- [ ] Exportación de reportes PDF/Excel
- [ ] Panel de turista

## 📄 Licencia

Este proyecto fue desarrollado para Arte Tours © 2026

---

Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS
