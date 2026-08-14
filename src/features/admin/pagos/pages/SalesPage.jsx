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
import { SALE_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from "../paymentServices";
import { useSalesPage } from "../hooks/useSalesPage";
import { SalesStats, SaleDetailDialog } from "../components/SalesStats";
import { SalesFilters } from "../components/SalesFilters";
import { SalesTableFull } from "../components/SalesTableFull";
import { SaleCreateEditDialog } from "../components/SaleCreateEditDialog";
import { SaleDeleteDialog } from "../components/SaleDeleteDialog";

export function SalesPage() {
    const state = useSalesPage();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Gestión de Ventas"
                    subtitle="Controla todas las ventas y su estado de pago"
                    action={
                        <Button onClick={state.openCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Venta
                        </Button>
                    }
                />

                <SalesStats
                    total={state.stats.total}
                    paid={state.stats.paid}
                    revenue={state.stats.revenue}
                    commissions={state.stats.commissions}
                    filtered={state.stats.filtered}
                />

                <SearchToolbar
                    searchTerm={state.search.searchTerm}
                    onSearchChange={state.search.setSearchTerm}
                    searchPlaceholder="Buscar venta..."
                    statusFilter={state.filters.status}
                    onStatusFilterChange={(value) =>
                        state.setFilters({ ...state.filters, status: value })
                    }
                    statusOptions={SALE_STATUS_OPTIONS}
                    hasActiveFilters={state.hasActiveFilters}
                    onToggleFilters={state.dialogs.toggleFilters}
                    onExport={state.handleExportCSV}
                    extraContent={
                        <Select
                            value={state.filters.paymentMethod ?? "all"}
                            onValueChange={(value) =>
                                state.setFilters({ ...state.filters, paymentMethod: value })
                            }
                        >
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Método pago" />
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
                    <SalesFilters
                        filters={state.filters}
                        setFilters={state.setFilters}
                        onClear={state.clearFilters}
                    />
                )}

                <Card>
                    <CardContent className="pt-6">
                        <SalesTableFull
                            items={state.items}
                            onDetail={state.dialogs.openDetail}
                            onEdit={state.openEdit}
                            onDelete={state.dialogs.openDelete}
                            onMarkAsPaid={state.handleMarkAsPaid}
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
                            itemsLabel="ventas"
                        />
                    </CardContent>
                </Card>
            </div>

            <SaleCreateEditDialog
                open={state.dialogs.isCreateOpen}
                onOpenChange={state.dialogs.setIsCreateOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleCreate}
            />

            <SaleCreateEditDialog
                open={state.dialogs.isEditOpen}
                onOpenChange={state.dialogs.setIsEditOpen}
                formData={state.formData}
                setFormData={state.setFormData}
                onSubmit={state.handleEdit}
                isEdit
            />

            <SaleDetailDialog
                open={state.dialogs.isDetailOpen}
                onOpenChange={state.dialogs.setIsDetailOpen}
                sale={state.dialogs.selectedItem}
            />

            <SaleDeleteDialog
                open={state.dialogs.isDeleteOpen}
                onOpenChange={state.dialogs.setIsDeleteOpen}
                sale={state.dialogs.selectedItem}
                onConfirm={state.handleDelete}
            />
        </DashboardLayout>
    );
}
