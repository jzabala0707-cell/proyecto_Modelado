import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { useReportsPage } from "../hooks/useReportsPage";
import { ReportsFilters, MonthlyChart, ToursChart, GuidesChart, ReportsStatsGrid } from "../components/ReportsFilters";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
export function ReportsPage() {
    const state = useReportsPage();
    const SortableHeader = ({ field, children, sortable }) => (<TableHead onClick={() => sortable.handleSort(field)} className="cursor-pointer select-none">
        <div className="flex items-center">
            {children}
            {sortable.getSortIcon(field)}
        </div>
    </TableHead>);
    return (<DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Reportes y Análisis" subtitle="Visualiza métricas clave y genera reportes"/>

        <ReportsStatsGrid stats={state.summary.stats} columns={4}/>

        <ReportsFilters reportType={state.reportType} onReportTypeChange={state.setReportType} dateStart={state.dateStart} onDateStartChange={state.setDateStart} dateEnd={state.dateEnd} onDateEndChange={state.setDateEnd} onGenerate={state.handleGenerate} onExport={state.handleExport}/>

        <SearchToolbar searchTerm={state.monthlySearch.searchTerm} onSearchChange={state.monthlySearch.setSearchTerm} searchPlaceholder="Buscar en reportes..." statusFilter={state.reportType} onStatusFilterChange={state.setReportType} statusOptions={state.reportTypes} statusFilterPlaceholder="Tipo reporte" hasActiveFilters={state.hasActiveFilters} onToggleFilters={state.clearFilters} onExport={state.handleExportCSV}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MonthlyChart />
          <ToursChart />
          <GuidesChart />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalle de Reportes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-2">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Resumen Mensual</h3>
                <Badge variant="outline">{state.tableData.monthly.length} registros</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableHeader field="month" sortable={state.monthlySortable}>Mes</SortableHeader>
                    <SortableHeader field="ventas" sortable={state.monthlySortable}>Ventas</SortableHeader>
                    <SortableHeader field="reservas" sortable={state.monthlySortable}>Reservas</SortableHeader>
                    <TableHead>Promedio/Reserva</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.tableData.monthly.map((m) => (<TableRow key={m.id}>
                      <TableCell className="font-medium">{m.month}</TableCell>
                      <TableCell>${m.ventas.toLocaleString()}</TableCell>
                      <TableCell>{m.reservas}</TableCell>
                      <TableCell className="text-muted-foreground">
                        ${Math.round(m.ventas / (m.reservas || 1)).toLocaleString()}
                      </TableCell>
                    </TableRow>))}
                </TableBody>
              </Table>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Rendimiento de Tours</h3>
                <Badge variant="outline">{state.tableData.tours.length} tours</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableHeader field="tour" sortable={state.toursSortable}>Tour</SortableHeader>
                    <SortableHeader field="reservas" sortable={state.toursSortable}>Reservas</SortableHeader>
                    <SortableHeader field="ingresos" sortable={state.toursSortable}>Ingresos</SortableHeader>
                    <TableHead>Promedio/Reserva</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.tableData.tours.map((t) => (<TableRow key={t.id}>
                      <TableCell className="font-medium">{t.tour}</TableCell>
                      <TableCell>{t.reservas}</TableCell>
                      <TableCell>${t.ingresos.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">
                        ${Math.round(t.ingresos / (t.reservas || 1)).toLocaleString()}
                      </TableCell>
                    </TableRow>))}
                </TableBody>
              </Table>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Rendimiento de Guías</h3>
                <Badge variant="outline">{state.tableData.guides.length} guías</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableHeader field="guia" sortable={state.guidesSortable}>Guía</SortableHeader>
                    <SortableHeader field="tours" sortable={state.guidesSortable}>Tours Realizados</SortableHeader>
                    <SortableHeader field="rating" sortable={state.guidesSortable}>Rating</SortableHeader>
                    <TableHead>Calificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.tableData.guides.map((g) => (<TableRow key={g.id}>
                      <TableCell className="font-medium">{g.guia}</TableCell>
                      <TableCell>{g.tours}</TableCell>
                      <TableCell>
                        <Badge variant={g.rating >= 4.8 ? "default" : g.rating >= 4.6 ? "secondary" : "outline"}>
                          {g.rating} ★
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {g.rating >= 4.8 ? "Excelente" : g.rating >= 4.6 ? "Muy bueno" : "Bueno"}
                      </TableCell>
                    </TableRow>))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);
}
