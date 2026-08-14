import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { DashboardKpiGrid } from "../components/DashboardKpiGrid";
import { DashboardSalesChart } from "../components/DashboardSalesChart";
import { DashboardPopularTours } from "../components/DashboardPopularTours";
import { DashboardRecentActivity } from "../components/DashboardRecentActivity";
import { DashboardUpcomingTours } from "../components/DashboardUpcomingTours";
export function DashboardPage() {
    return (<DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Dashboard" subtitle="Bienvenido de nuevo, aquí está tu resumen"/>

        <DashboardKpiGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardSalesChart />
          <DashboardPopularTours />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardRecentActivity />
          <DashboardUpcomingTours />
        </div>
      </div>
    </DashboardLayout>);
}
