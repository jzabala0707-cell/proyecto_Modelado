import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { TOUR_STATUS_OPTIONS } from "../tourServices";
import { useToursPage } from "../hooks/useToursPage";
import { ToursStats } from "../components/ToursStats";
import { ToursFilters } from "../components/ToursFilters";
import { ToursTableFull } from "../components/ToursTableFull";
import { TourCreateEditDialog } from "../components/TourCreateEditDialog";
import { TourDeleteDialog } from "../components/TourDeleteDialog";
import { TourDetailDialog } from "../components/ToursGrid";

export function ToursPage() {
    const state = useToursPage();
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión de Tours"
                    subtitle="Administra todos los tours disponibles"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Tour
                        </Button>
                    }
                />

                <ToursStats
                    total={state.stats.total}
                    active={state.stats.active}
                    avgPrice={state.stats.avgPrice}
                    avgRating={state.stats.avgRating}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar tour..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) =>
                        state.setFilters({ ...state.filters, status: value })
                    }
                    statusOptions={TOUR_STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <ToursFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <ToursTableFull
                            items={state.items}
                            onDetail={state.dialogs.openDetail}
                            onEdit={state.openEdit}
                            onDelete={state.dialogs.openDelete}
                            onToggleStatus={state.handleToggleStatus}
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
                            itemsLabel="tours"
                        />
                    </CardContent>
                </Card>
            </div>

            <TourCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <TourCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <TourDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                tour={state.dialogs.selectedItem}
            />

            <TourDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                tour={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
