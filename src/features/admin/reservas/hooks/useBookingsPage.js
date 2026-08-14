import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockBookings, mockClients, emptyBookingForm, bookingServices } from "../bookingServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";
export function useBookingsPage() {
    const crud = useCrudState(mockBookings, { name: "Reserva" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyBookingForm);
    const [filters, setFilters] = useState({
        status: "all",
        paymentMethod: "all",
        guide: "all",
        dateFrom: "",
        dateTo: "",
    });
    const search = useSearchFilter(
        crud.items,
        (b) => [b.customer, b.tour, b.id.toString(), b.email ?? "", b.phone ?? ""],
        (b, f) => {
            const matchesStatus = f.status === "all" || b.status === f.status;
            const matchesPayment = f.paymentMethod === "all" || b.paymentMethod === f.paymentMethod;
            const matchesGuide = f.guide === "all" || (b.guide ?? "") === f.guide;
            const matchesDateFrom = !f.dateFrom || b.date >= f.dateFrom;
            const matchesDateTo = !f.dateTo || b.date <= f.dateTo;
            return matchesStatus && matchesPayment && matchesGuide && matchesDateFrom && matchesDateTo;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters =
        filters.status !== "all" ||
        filters.paymentMethod !== "all" ||
        filters.guide !== "all" ||
        filters.dateFrom !== "" ||
        filters.dateTo !== "" ||
        search.searchTerm !== "";
    const handleCreate = useCallback(() => {
        const created = crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyBookingForm);
        return created;
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
    const handleToggleStatus = useCallback(
        (booking) => {
            const current = booking.status;
            let newStatus = "confirmed";
            if (current === "pending") {
                newStatus = "confirmed";
            } else if (current === "confirmed") {
                newStatus = "cancelled";
            } else {
                newStatus = "pending";
            }
            crud.handleEdit(booking.id, { ...booking, status: newStatus });
            toast.success(`Reserva marcada como ${newStatus}`);
        },
        [crud]
    );
    const openCreate = useCallback(() => {
        setFormData(emptyBookingForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback(
        (booking) => {
            setFormData({
                customer: booking.customer ?? "",
                tour: booking.tour ?? "Comuna 13 Tour",
                date: booking.date ?? "",
                time: booking.time ?? "09:00",
                people: booking.people ?? 2,
                total: booking.total ?? 0,
                status: booking.status ?? "pending",
                phone: booking.phone ?? "",
                email: booking.email ?? "",
                notes: booking.notes ?? "",
                paymentMethod: booking.paymentMethod ?? "Tarjeta",
                guide: booking.guide ?? "",
            });
            dialogs.openEdit(booking);
        },
        [dialogs]
    );
    const clearFilters = useCallback(() => {
        setFilters({ status: "all", paymentMethod: "all", guide: "all", dateFrom: "", dateTo: "" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);
    const handleExportCSV = useCallback(() => {
        bookingServices.exportCSV(search.filteredData, mockClients);
        toast.success("Datos exportados a CSV");
    }, [search]);
    const stats = bookingServices.computeStats(crud.items, search.filteredData.length);
    return {
        bookings: crud.items,
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
