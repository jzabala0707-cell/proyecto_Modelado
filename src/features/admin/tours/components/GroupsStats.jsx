import { StatsGrid } from "@/features/admin/components/StatCard";
import {
    Calendar,
    Users,
    CalendarCheck,
    CalendarClock,
    CalendarX,
    CalendarRange,
    CalendarOff,
    Search,
} from "lucide-react";

export function GroupsStats({
    total,
    totalParticipantes,
    disponibles,
    completas,
    programadas,
    finalizadas,
    canceladas,
    filtered,
}) {
    const stats = [
        { title: "Total Salidas", value: total, icon: Calendar, color: "text-primary" },
        { title: "Participantes", value: totalParticipantes ?? 0, icon: Users, color: "text-success" },
        { title: "Programadas", value: programadas ?? 0, icon: CalendarClock, color: "text-secondary" },
        { title: "Disponibles", value: disponibles ?? 0, icon: CalendarCheck, color: "text-success" },
        { title: "Completas", value: completas ?? 0, icon: CalendarRange, color: "text-warning" },
        { title: "Finalizadas", value: finalizadas ?? 0, icon: Calendar, color: "text-muted-foreground" },
        { title: "Canceladas", value: canceladas ?? 0, icon: CalendarOff, color: "text-destructive" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={8} />;
}
