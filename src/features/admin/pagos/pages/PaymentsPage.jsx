import { DashboardLayout } from "@/features/admin/layout/components/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SearchToolbar } from "@/features/admin/components/SearchToolbar";
import { TablePagination } from "@/features/admin/components/TablePagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { PAYMENT_METHOD_OPTIONS } from "../paymentServices";
import { usePaymentsPage } from "../hooks/useSalesPage";
import { PaymentsStats, PaymentDetailDialog } from "../components/PaymentsStats";
import { PaymentsFilters } from "../components/PaymentsFilters";
import { PaymentsTableFull } from "../components/PaymentsTableFull";
import { PaymentCreateEditDialog } from "../components/PaymentCreateEditDialog";
import { PaymentDeleteDialog } from "../components/PaymentDeleteDialog";

const STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "completed", label: "Completados" },
    { value: "pending", label: "Pendientes" },
    { value: "partial", label: "Parciales" },
];

export function PaymentsPage() {
    const state = usePaymentsPage();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión de Abonos"
                    subtitle="Administra los pagos parciales y su seguimiento"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Abono
                        </Button>
                    }
                />

                <PaymentsStats
                    total={state.stats.total}
                    completed={state.stats.completed}
                    collected={state.stats.collected}
                    pending={state.stats.pending}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar abono..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) =>
                        state.setFilters({ ...state.filters, status: value })
                    }
                    statusOptions={STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                    extraContent={
                        <Select
                            value={state.filters.method ?? "all"}
                            onValueChange={(value) =>
                                state.setFilters({ ...state.filters, method: value })
                            }
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Método" />
                            </SelectTrigger>
                            <SelectContent>
                                {PAYMENT_METHOD_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    }
                />

                {state.dialogs.isFilterOpen && (
                    <PaymentsFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <PaymentsTableFull
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
                            itemsLabel="abonos"
                        />
                    </CardContent>
                </Card>
            </div>

            <PaymentCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <PaymentCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <PaymentDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                payment={state.dialogs.selectedItem}
            />

            <PaymentDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                payment={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
