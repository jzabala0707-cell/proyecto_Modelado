import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockClients, emptyClientForm, clientServices } from "@/features/admin/reservas/bookingServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";
export function useClientsPage() {
    const crud = useCrudState(mockClients, { name: "Cliente" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyClientForm);
    const [filters, setFilters] = useState({
        status: "all",
        nationality: "all",
        vip: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (c) => [c.name, c.email, c.phone, c.nationality ?? ""],
        (c, f) => {
            const matchesStatus = f.status === "all" || c.status === f.status;
            const matchesNationality = f.nationality === "all" || c.nationality === f.nationality;
            let matchesVip = true;
            if (f.vip === "yes") matchesVip = !!c.vip || c.status === "vip";
            else if (f.vip === "no") matchesVip = !c.vip && c.status !== "vip";
            return matchesStatus && matchesNationality && matchesVip;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters =
        filters.status !== "all" ||
        filters.nationality !== "all" ||
        filters.vip !== "all" ||
        search.searchTerm !== "";
    const handleCreate = useCallback(() => {
        const isVip = formData.status === "vip";
        const created = crud.handleCreate({ ...formData, vip: isVip });
        dialogs.closeCreate();
        setFormData(emptyClientForm);
        return created;
    }, [crud, formData, dialogs]);
    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem) return;
        const isVip = formData.status === "vip";
        crud.handleEdit(dialogs.selectedItem.id, { ...formData, vip: isVip });
        dialogs.closeEdit();
    }, [crud, dialogs, formData]);
    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleDelete(dialogs.selectedItem.id);
        dialogs.closeDelete();
    }, [crud, dialogs]);
    const handleToggleStatus = useCallback(
        (client) => {
            const current = client.status;
            let newStatus = "active";
            if (current === "vip") {
                newStatus = "inactive";
            } else if (current === "active") {
                newStatus = "inactive";
            } else {
                newStatus = "active";
            }
            const keepsVip = client.vip && newStatus !== "inactive";
            crud.handleEdit(client.id, {
                ...client,
                status: newStatus,
                vip: newStatus === "inactive" ? false : keepsVip,
            });
            toast.success(`Cliente marcado como ${newStatus}`);
        },
        [crud]
    );
    const openCreate = useCallback(() => {
        setFormData(emptyClientForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback(
        (client) => {
            setFormData({
                name: client.name ?? "",
                email: client.email ?? "",
                phone: client.phone ?? "",
                status: client.status ?? "active",
                bookings: client.bookings ?? 0,
                totalSpent: client.totalSpent ?? 0,
                nationality: client.nationality ?? "",
                lastBooking: client.lastBooking ?? "",
                registrationDate: client.registrationDate ?? new Date().toISOString().split("T")[0],
            });
            dialogs.openEdit(client);
        },
        [dialogs]
    );
    const clearFilters = useCallback(() => {
        setFilters({ status: "all", nationality: "all", vip: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);
    const handleExportCSV = useCallback(() => {
        clientServices.exportCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);
    const stats = clientServices.computeStats(crud.items, search.filteredData.length);
    return {
        clients: crud.items,
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
