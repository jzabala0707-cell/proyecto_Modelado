import { StatsGrid } from "@/features/admin/components/StatCard";
import { Calendar, CalendarDays, DollarSign, Star, Search } from "lucide-react";

export function ToursStats({ total, active, avgPrice, avgRating, filtered }) {
    const stats = [
        { title: "Total Tours", value: total, icon: Calendar, color: "text-primary" },
        { title: "Tours Activos", value: active, icon: CalendarDays, color: "text-success" },
        { title: "Precio Promedio", value: avgPrice, icon: DollarSign, color: "text-secondary" },
        { title: "Rating Promedio", value: avgRating, icon: Star, color: "text-warning" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={5} />;
}
