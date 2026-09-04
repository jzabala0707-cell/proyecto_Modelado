import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
export const kpiData = [
    {
        title: "Total Tours",
        value: "156",
        change: "+12%",
        trend: "up",
        icon: Calendar,
        color: "text-primary",
    },
    {
        title: "Tours Activos",
        value: "48",
        change: "+8%",
        trend: "up",
        icon: TrendingUp,
        color: "text-success",
    },
    {
        title: "Total Clientes",
        value: "2,840",
        change: "+23%",
        trend: "up",
        icon: Users,
        color: "text-secondary",
    },
    {
        title: "Ingresos Mes",
        value: "$48,560",
        change: "-5%",
        trend: "down",
        icon: DollarSign,
        color: "text-warning",
    },
];
export const salesData = [
    { month: "Ene", ventas: 4000, reservas: 2400 },
    { month: "Feb", ventas: 3000, reservas: 1398 },
    { month: "Mar", ventas: 2000, reservas: 9800 },
    { month: "Abr", ventas: 2780, reservas: 3908 },
    { month: "May", ventas: 1890, reservas: 4800 },
    { month: "Jun", ventas: 2390, reservas: 3800 },
];
export const toursData = [
    { name: "Comuna 13 Tour", value: 400 },
    { name: "City Tour", value: 300 },
    { name: "Pablo Escobar Tour", value: 200 },
    { name: "Food Tour", value: 150 },
];
export const PIE_CHART_COLORS = ["#2563eb", "#06b6d4", "#8b5cf6", "#22c55e"];
export const recentActivity = [
    {
        id: 1,
        action: "Nueva reserva",
        description: "Tour Comuna 13 - 4 personas",
        time: "Hace 5 min",
        type: "booking",
    },
    {
        id: 2,
        action: "Nuevo cliente",
        description: "María González registrada",
        time: "Hace 15 min",
        type: "user",
    },
    {
        id: 3,
        action: "Tour confirmado",
        description: "City Tour - Confirmado",
        time: "Hace 1 hora",
        type: "tour",
    },
    {
        id: 4,
        action: "Pago recibido",
        description: "$250 - Reserva #1234",
        time: "Hace 2 horas",
        type: "payment",
    },
];
export const upcomingTours = [
    {
        timeNumber: "10",
        timePeriod: "AM",
        tourName: "Comuna 13 Tour",
        people: 6,
        variant: "primary",
        badge: "default",
    },
    {
        timeNumber: "2",
        timePeriod: "PM",
        tourName: "City Tour",
        people: 4,
        variant: "muted",
        badge: "outline",
    },
    {
        timeNumber: "4",
        timePeriod: "PM",
        tourName: "Food Tour",
        people: 8,
        variant: "muted",
        badge: "outline",
    },
];
export const menuItems = [
    { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "Users", label: "Usuarios", href: "/dashboard/users" },
    { icon: "UserCheck", label: "Roles", href: "/dashboard/roles" },
    { icon: "Users", label: "Guías", href: "/dashboard/guides" },
    { icon: "Calendar", label: "Tours", href: "/dashboard/tours" },
    { icon: "FileText", label: "Categorías de Tours", href: "/dashboard/tour-types" },
    { icon: "FileText", label: "Reservas", href: "/dashboard/bookings" },
    { icon: "UserCheck", label: "Clientes", href: "/dashboard/clients" },
    { icon: "FileText", label: "Ventas", href: "/dashboard/sales" },
    { icon: "Calendar", label: "Salidas de Tours", href: "/dashboard/groups" },
    { icon: "FileText", label: "Abonos", href: "/dashboard/payments" },
    { icon: "FileText", label: "Reportes", href: "/dashboard/reports" },
    { icon: "Settings", label: "Configuración", href: "/dashboard/settings" },
];
