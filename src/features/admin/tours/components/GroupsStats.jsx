import { StatsGrid } from "@/features/admin/components/StatCard";
import { Calendar, Users, UserCheck, Search } from "lucide-react";

export function GroupsStats({ total, totalParticipants, confirmed, filtered }) {
    const stats = [
        { title: "Total Grupos", value: total, icon: Calendar, color: "text-primary" },
        { title: "Participantes", value: totalParticipants, icon: Users, color: "text-success" },
        { title: "Grupos Confirmados", value: confirmed, icon: UserCheck, color: "text-secondary" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={4} />;
}
