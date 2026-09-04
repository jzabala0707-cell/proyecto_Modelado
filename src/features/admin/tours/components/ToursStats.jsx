import { StatsGrid } from "@/features/admin/components/StatCard";
import { Calendar, CalendarDays, CalendarX, DollarSign, FileEdit, Search } from "lucide-react";

export function ToursStats({ total, activos, inactivos, borradores, avgPrice, filtered }) {
    const stats = [
        { title: "Total Tours", value: total, icon: Calendar, color: "text-primary" },
        { title: "Activos", value: activos ?? 0, icon: CalendarDays, color: "text-success" },
        { title: "Inactivos", value: inactivos ?? 0, icon: CalendarX, color: "text-destructive" },
        { title: "Borradores", value: borradores ?? 0, icon: FileEdit, color: "text-secondary" },
        { title: "Precio Promedio", value: avgPrice ?? "$0", icon: DollarSign, color: "text-warning" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={6} />;
}
