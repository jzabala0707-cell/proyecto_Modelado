import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import { BOOKING_STATUS_OPTIONS } from "../bookingServices";
import { useBookingsPage } from "../hooks/useBookingsPage";
import { BookingsStats, BookingDetailDialog } from "../components/BookingsStats";
import { BookingsFilters } from "../components/BookingsFilters";
import { BookingsTableFull } from "../components/BookingsTableFull";
import { BookingCreateEditDialog } from "../components/BookingCreateEditDialog";
import { BookingDeleteDialog } from "../components/BookingDeleteDialog";
export function BookingsPage() {
    const state = useBookingsPage();
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión Reservas"
                    subtitle="Administra todas las reservas del sistema"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Reserva
                        </Button>
                    }
                />

                <BookingsStats
                    total={state.stats.total}
                    confirmed={state.stats.confirmed}
                    pending={state.stats.pending}
                    revenue={state.stats.revenue}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar reserva..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) => state.setFilters({ ...state.filters, status: value })}
                    statusOptions={BOOKING_STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                />

                {state.dialogs.isFilterOpen && (
                    <BookingsFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <BookingsTableFull
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
                            itemsLabel="reservas"
                        />
                    </CardContent>
                </Card>
            </div>

            <BookingCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <BookingCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <BookingDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                booking={state.dialogs.selectedItem}
            />

            <BookingDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                booking={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
