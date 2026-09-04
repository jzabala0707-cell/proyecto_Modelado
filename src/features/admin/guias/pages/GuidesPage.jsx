import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { useGuidesPage } from "../hooks/useGuidesPage";
import { GuideStats, GuideDetailDialog } from "../components/GuidesStats";
import { GuidesFilters } from "../components/GuidesFilters";
import { GuidesTableFull } from "../components/GuidesTableFull";
import { GuideCreateEditDialog } from "../components/GuideCreateEditDialog";
import { GuideDeleteDialog } from "../components/GuideDeleteDialog";

const STATUS_OPTIONS = [
    { value: "all", label: "Todos los estados" },
    { value: "ACTIVO", label: "Activos" },
    { value: "INACTIVO", label: "Inactivos" },
    { value: "BLOQUEADO", label: "Bloqueados" },
];

export function GuidesPage() {
    const state = useGuidesPage();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión de Guías"
                    subtitle="Administra los guías turísticos del equipo"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Guía
                        </Button>
                    }
                />

                <GuideStats
                    total={state.stats.total}
                    disponibles={state.stats.disponibles}
                    ocupados={state.stats.ocupados}
                    inactivos={state.stats.inactivos}
                    avgRating={state.stats.avgRating}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar guía por nombre, correo, documento..."
                    statusFilter={state.filters.estado_usuario}
                    onStatusFilterChange={(value) =>
                        state.setFilters({ ...state.filters, estado_usuario: value })
                    }
                    statusOptions={STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <GuidesFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <GuidesTableFull
                            items={state.items}
                            onDetail={state.dialogs.openDetail}
                            onEdit={state.openEdit}
                            onDelete={state.dialogs.openDelete}
                            onToggleActivo={state.handleToggleActivo}
                            onToggleDisponibilidad={state.handleToggleDisponibilidad}
                            sortField={state.sortable.sortField}
                            onSort={state.sortable.handleSort}
                            getSortIcon={state.sortable.getSortIcon}
                            totalItems={state.pagination.totalItems}
                        />
                        <TablePagination
                            currentPage={state.pagination.currentPage}
                            totalPages={state.pagination.totalPages}
                            totalItems={state.pagination.totalItems}
                            onPageChange={state.pagination.goToPage}
                            itemsLabel="guías"
                        />
                    </CardContent>
                </Card>
            </div>

            <GuideCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <GuideCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <GuideDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                guide={state.dialogs.selectedItem}
            />

            <GuideDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                guide={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
