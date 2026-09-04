import { StatsGrid } from "@/features/admin/components/StatCard";
import { Layers, CheckCircle, XCircle, Search } from "lucide-react";

export function TourTypesStats({ total, activos, inactivos, filtered }) {
    const stats = [
        { title: "Categorías", value: total, icon: Layers, color: "text-primary" },
        { title: "Activas", value: activos ?? 0, icon: CheckCircle, color: "text-success" },
        { title: "Inactivas", value: inactivos ?? 0, icon: XCircle, color: "text-destructive" },
        { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-muted-foreground" },
    ];
    return <StatsGrid stats={stats} columns={4} />;
}
