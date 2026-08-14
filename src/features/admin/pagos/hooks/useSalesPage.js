import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockSales, emptySaleForm, emptyPaymentForm, paymentServices } from "../paymentServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";

export function useSalesPage() {
    const crud = useCrudState(mockSales, { name: "Venta" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptySaleForm);
    const [filters, setFilters] = useState({
        status: "all",
        paymentMethod: "all",
        dateFrom: "",
        dateTo: "",
    });

    const search = useSearchFilter(
        crud.items,
        (s) => [s.invoice, s.client, s.tour],
        (s, f) => {
            const matchesStatus = f.status === "all" || s.status === f.status;
            const matchesMethod = f.paymentMethod === "all" || s.paymentMethod === f.paymentMethod;
            const matchesDateFrom = !f.dateFrom || s.date >= f.dateFrom;
            const matchesDateTo = !f.dateTo || s.date <= f.dateTo;
            return matchesStatus && matchesMethod && matchesDateFrom && matchesDateTo;
        },
        filters
    );

    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);

    const hasActiveFilters =
        filters.status !== "all" ||
        filters.paymentMethod !== "all" ||
        filters.dateFrom !== "" ||
        filters.dateTo !== "" ||
        search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        const saleData = {
            ...formData,
            total: Math.max(0, formData.subtotal - formData.discount),
            commission: formData.commission || Math.round(formData.subtotal * 0.06),
        };
        crud.handleCreate(saleData);
        dialogs.closeCreate();
        setFormData(emptySaleForm);
    }, [crud, formData, dialogs]);

    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem) return;
        const saleData = {
            ...formData,
            total: Math.max(0, formData.subtotal - formData.discount),
            commission: formData.commission || Math.round(formData.subtotal * 0.06),
        };
        crud.handleEdit(dialogs.selectedItem.id, saleData);
        dialogs.closeEdit();
    }, [crud, dialogs, formData]);

    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleDelete(dialogs.selectedItem.id);
        dialogs.closeDelete();
    }, [crud, dialogs]);

    const handleMarkAsPaid = useCallback((sale) => {
        if (sale.status === "paid") {
            toast.info("La venta ya está marcada como pagada");
            return;
        }
        const paidAmount = sale.payments
            .filter((p) => p.status === "completed")
            .reduce((s, p) => s + p.amount, 0);
        const remaining = sale.total - paidAmount;
        const newPayments = sale.payments.map((p) =>
            p.status === "pending"
                ? {
                      ...p,
                      amount: p.amount > 0 ? p.amount : remaining,
                      status: "completed",
                      date: new Date().toISOString().split("T")[0],
                      reference: p.reference || "PAGO-AUTO",
                  }
                : p
        );
        const hasPending = newPayments.some((p) => p.status === "pending");
        crud.handleEdit(sale.id, {
            payments: newPayments,
            status: hasPending ? "partial" : "paid",
        });
        toast.success(`Venta ${sale.invoice} marcada como pagada`);
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptySaleForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((sale) => {
        setFormData({
            invoice: sale.invoice,
            client: sale.client,
            tour: sale.tour,
            date: sale.date,
            subtotal: sale.subtotal,
            discount: sale.discount,
            commission: sale.commission,
            total: sale.total,
            status: sale.status,
            paymentMethod: sale.paymentMethod,
            payments: sale.payments,
        });
        dialogs.openEdit(sale);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "all", paymentMethod: "all", dateFrom: "", dateTo: "" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        paymentServices.exportSalesCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = paymentServices.computeSalesStats(crud.items, search.filteredData.length);

    return {
        sales: crud.items,
        items: pagination.paginatedItems,
        search,
        sortable,
        pagination,
        dialogs,
        formData,
        setFormData,
        filters,
        setFilters,
        hasActiveFilters,
        stats,
        handleCreate,
        handleEdit,
        handleDelete,
        handleMarkAsPaid,
        openCreate,
        openEdit,
        clearFilters,
        handleExportCSV,
    };
}

export function usePaymentsPage() {
    const initialPayments = paymentServices.buildPaymentsView(mockSales);
    const crud = useCrudState(initialPayments, { name: "Abono" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyPaymentForm);
    const [filters, setFilters] = useState({
        status: "all",
        method: "all",
    });

    const search = useSearchFilter(
        crud.items,
        (p) => [p.invoice, p.client, p.tour, p.reference ?? ""],
        (p, f) => {
            const matchesStatus = f.status === "all" || p.status === f.status;
            const matchesMethod = f.method === "all" || p.method === f.method;
            return matchesStatus && matchesMethod;
        },
        filters
    );

    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);

    const hasActiveFilters =
        filters.status !== "all" || filters.method !== "all" || search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyPaymentForm);
    }, [crud, formData, dialogs]);

    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleEdit(dialogs.selectedItem.id, formData);
        dialogs.closeEdit();
    }, [crud, dialogs, formData]);

    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleDelete(dialogs.selectedItem.id);
        dialogs.closeDelete();
    }, [crud, dialogs]);

    const handleToggleStatus = useCallback((payment) => {
        const newStatus = payment.status === "completed" ? "pending" : "completed";
        crud.handleEdit(payment.id, { status: newStatus });
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptyPaymentForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((payment) => {
        setFormData({
            saleId: payment.saleId,
            date: payment.date,
            amount: payment.amount,
            method: payment.method,
            status: payment.status,
            reference: payment.reference ?? "",
        });
        dialogs.openEdit(payment);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "all", method: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        paymentServices.exportPaymentsCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = paymentServices.computePaymentsStats(crud.items, search.filteredData.length);

    return {
        payments: crud.items,
        items: pagination.paginatedItems,
        search,
        sortable,
        pagination,
        dialogs,
        formData,
        setFormData,
        filters,
        setFilters,
        hasActiveFilters,
        stats,
        handleCreate,
        handleEdit,
        handleDelete,
        handleToggleStatus,
        openCreate,
        openEdit,
        clearFilters,
        handleExportCSV,
    };
}
