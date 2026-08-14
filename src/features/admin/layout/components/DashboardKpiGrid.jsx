import { StatsGrid } from "@/features/admin/components/StatCard";
import { kpiData } from "../layoutServices";
export function DashboardKpiGrid({ stats = kpiData }) {
    return <StatsGrid stats={stats} columns={4}/>;
}
