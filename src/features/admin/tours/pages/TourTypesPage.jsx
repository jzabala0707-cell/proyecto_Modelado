import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { useTourTypesPage } from "../hooks/useToursPage";
import { TourTypesStats } from "../components/TourTypesStats";
import { TourTypesFilters } from "../components/TourTypesFilters";
import { TourTypesTableFull } from "../components/TourTypesTableFull";
import { TourTypeCreateEditDialog } from "../components/TourTypeCreateEditDialog";
import { TourTypeDeleteDialog } from "../components/TourTypeDeleteDialog";
import { TourTypeDetailDialog } from "../components/TourTypesGrid";

export function TourTypesPage() {
    const state = useTourTypesPage();
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Categorías de Tours"
                    subtitle="Clasifica y categoriza tus tours"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Categoría
                        </Button>
                    }
                />

                <TourTypesStats
                    total={state.stats.total}
                    activos={state.stats.activos}
                    inactivos={state.stats.inactivos}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar categoría..."
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <TourTypesFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <TourTypesTableFull
                            items={state.items}
                            onDetail={state.dialogs.openDetail}
                            onEdit={state.openEdit}
                            onDelete={state.dialogs.openDelete}
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
                            itemsLabel="categorías"
                        />
                    </CardContent>
                </Card>
            </div>

            <TourTypeCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <TourTypeCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <TourTypeDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                type={state.dialogs.selectedItem}
            />

            <TourTypeDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                type={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
