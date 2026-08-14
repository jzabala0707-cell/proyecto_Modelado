import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { GROUP_STATUS_OPTIONS } from "../tourServices";
import { useGroupsPage } from "../hooks/useToursPage";
import { GroupsStats } from "../components/GroupsStats";
import { GroupsFilters } from "../components/GroupsFilters";
import { GroupsTableFull } from "../components/GroupsTableFull";
import { GroupCreateEditDialog } from "../components/GroupCreateEditDialog";
import { GroupDeleteDialog } from "../components/GroupDeleteDialog";
import { GroupDetailDialog } from "../components/GroupsGrid";

export function GroupsPage() {
    const state = useGroupsPage();
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Asignación de Grupos"
                    subtitle="Organiza grupos, asigna guías y gestiona participantes"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Grupo
                        </Button>
                    }
                />

                <GroupsStats
                    total={state.stats.total}
                    totalParticipants={state.stats.totalParticipants}
                    confirmed={state.stats.confirmed}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar grupo..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) =>
                        state.setFilters({ ...state.filters, status: value })
                    }
                    statusOptions={GROUP_STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <GroupsFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <GroupsTableFull
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
                            itemsLabel="grupos"
                        />
                    </CardContent>
                </Card>
            </div>

            <GroupCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <GroupCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <GroupDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                group={state.dialogs.selectedItem}
            />

            <GroupDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                group={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
