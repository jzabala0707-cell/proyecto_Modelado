import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { CLIENT_STATUS_OPTIONS } from "@/features/admin/clientes/clientServices";
import { useClientsPage } from "../hooks/useClientsPage";
import { ClientsStats, ClientDetailDialog } from "../components/ClientsStats";
import { ClientsFilters } from "../components/ClientsFilters";
import { ClientsTableFull } from "../components/ClientsTableFull";
import { ClientCreateEditDialog } from "../components/ClientCreateEditDialog";
import { ClientDeleteDialog } from "../components/ClientDeleteDialog";
export function ClientsPage() {
    const state = useClientsPage();
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión Clientes"
                    subtitle="Administra tu base de clientes y su historial"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Cliente
                        </Button>
                    }
                />

                <ClientsStats
                    total={state.stats.total}
                    vip={state.stats.vip}
                    activos={state.stats.activos}
                    totalRevenue={state.stats.totalRevenue}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar cliente..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) => state.setFilters({ ...state.filters, status: value })}
                    statusOptions={CLIENT_STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <ClientsFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <ClientsTableFull
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
                            itemsLabel="clientes"
                        />
                    </CardContent>
                </Card>
            </div>

            <ClientCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <ClientCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <ClientDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                client={state.dialogs.selectedItem}
            />

            <ClientDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                client={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
