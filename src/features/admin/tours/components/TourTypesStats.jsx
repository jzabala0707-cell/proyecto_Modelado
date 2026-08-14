import { StatsGrid } from "@/features/admin/components/StatCard";
import { Layers, Calendar, CalendarDays, Search } from "lucide-react";

export function TourTypesStats({ total, totalTours, activeTours, filtered }) {
    const stats = [
        { title: "Tipos de Tours", value: total, icon: Layers, color: "text-primary" },
        { title: "Tours Totales", value: totalTours, icon: Calendar, color: "text-success" },
        { title: "Tours Activos", value: activeTours, icon: CalendarDays, color: "text-secondary" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={4} />;
}
