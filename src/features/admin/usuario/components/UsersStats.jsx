import { StatsGrid } from "@/features/admin/components/StatCard";
import { Users, UserCheck, UserX, Search } from "lucide-react";
export function UsersStats({ total, active, inactive, filtered }) {
    const stats = [
        { title: "Total Usuarios", value: total, icon: Users, color: "text-primary" },
        { title: "Usuarios Activos", value: active, icon: UserCheck, color: "text-success" },
        { title: "Usuarios Inactivos", value: inactive, icon: UserX, color: "text-destructive" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-secondary" },
    ];
    return <StatsGrid stats={stats} columns={4}/>;
}
