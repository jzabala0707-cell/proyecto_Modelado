import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { USER_STATUS_OPTIONS } from "../userServices";
import { useUsersPage } from "../hooks/useUsersPage";
import { UsersStats } from "../components/UsersStats";
import { UsersFilters } from "../components/UsersFilters";
import { UsersTable } from "../components/UsersTable";
import { UserCreateEditDialog } from "../components/UserCreateEditDialog";
import { UserDetailDialog } from "../components/UserDetailDialog";
import { UserDeleteDialog } from "../components/UserDeleteDialog";
export function UsersPage() {
    const state = useUsersPage();
    return (<DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Gestión de Usuarios" subtitle="Administra todos los usuarios del sistema" action={<Button onClick={state.openCreate}>
              <Plus className="mr-2 h-4 w-4"/>
              Crear Usuario
            </Button>}/>

        <UsersStats total={state.stats.total} active={state.stats.active} inactive={state.stats.inactive} blocked={state.stats.blocked} filtered={state.stats.filtered}/>

        <SearchToolbar searchTerm={state.search.searchTerm} onSearchChange={state.search.setSearchTerm} searchPlaceholder="Buscar usuario..." statusFilter={state.filters.estado ?? state.filters.status ?? "all"} onStatusFilterChange={(value) => state.setFilters({ ...state.filters, estado: value })} statusOptions={USER_STATUS_OPTIONS} hasActiveFilters={state.hasActiveFilters} onToggleFilters={state.dialogs.toggleFilters} onExport={state.handleExportCSV}/>

        {state.dialogs.isFilterOpen && (<UsersFilters filters={state.filters} setFilters={state.setFilters} onClear={state.clearFilters}/>)}

        <Card>
          <CardContent className="pt-6">
            <UsersTable items={state.items} onDetail={state.dialogs.openDetail} onEdit={state.openEdit} onDelete={state.dialogs.openDelete} onToggleStatus={state.handleToggleStatus} sortField={state.sortable.sortField} onSort={state.sortable.handleSort} getSortIcon={state.sortable.getSortIcon} totalItems={state.pagination.totalItems}/>
            <TablePagination currentPage={state.pagination.currentPage} totalPages={state.pagination.totalPages} totalItems={state.pagination.totalItems} onPageChange={state.pagination.goToPage} itemsLabel="usuarios"/>
          </CardContent>
        </Card>
      </div>

      <UserCreateEditDialog open={state.dialogs.isCreateOpen} onOpenChange={state.dialogs.setIsCreateOpen} formData={state.formData} setFormData={state.setFormData} onSubmit={state.handleCreate}/>

      <UserCreateEditDialog open={state.dialogs.isEditOpen} onOpenChange={state.dialogs.setIsEditOpen} formData={state.formData} setFormData={state.setFormData} onSubmit={state.handleEdit} isEdit/>

      <UserDetailDialog open={state.dialogs.isDetailOpen} onOpenChange={state.dialogs.setIsDetailOpen} user={state.dialogs.selectedItem}/>

      <UserDeleteDialog open={state.dialogs.isDeleteOpen} onOpenChange={state.dialogs.setIsDeleteOpen} user={state.dialogs.selectedItem} onConfirm={state.handleDelete}/>
    </DashboardLayout>);
}
