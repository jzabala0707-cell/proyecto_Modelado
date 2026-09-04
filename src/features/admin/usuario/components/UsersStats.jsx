import { StatsGrid } from "@/features/admin/components/StatCard";
import { Users, UserCheck, UserX, Lock, Search } from "lucide-react";
export function UsersStats({ total, active, inactive, blocked, filtered }) {
    const items = [
        { title: "Total Usuarios", value: total, icon: Users, color: "text-primary" },
        { title: "Usuarios Activos", value: active, icon: UserCheck, color: "text-success" },
        { title: "Usuarios Inactivos", value: inactive, icon: UserX, color: "text-secondary" },
    ];
    if (typeof blocked === "number") {
        items.push({ title: "Usuarios Bloqueados", value: blocked, icon: Lock, color: "text-destructive" });
    }
    items.push({ title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" });
    return <StatsGrid stats={items} columns={items.length}/>;
}
