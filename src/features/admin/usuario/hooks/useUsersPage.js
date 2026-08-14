import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockUsers, mockRoles, emptyUserForm, emptyRoleForm, userServices, } from "../userServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";
export function useUsersPage() {
    const crud = useCrudState(mockUsers, { name: "Usuario" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyUserForm);
    const [filters, setFilters] = useState({
        role: "all",
        status: "all",
        department: "all",
    });
    const search = useSearchFilter(crud.items, (u) => [u.name, u.email, u.phone], (u, f) => {
        const matchesRole = f.role === "all" || u.role === f.role;
        const matchesStatus = f.status === "all" || u.status === f.status;
        const matchesDept = f.department === "all" || u.department === f.department;
        return matchesRole && matchesStatus && matchesDept;
    }, filters);
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters = filters.role !== "all" || filters.status !== "all" || filters.department !== "all" || search.searchTerm !== "";
    const handleCreate = useCallback(() => {
        const created = crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyUserForm);
        return created;
    }, [crud, formData, dialogs]);
    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem)
            return;
        crud.handleEdit(dialogs.selectedItem.id, formData);
        dialogs.closeEdit();
    }, [crud, dialogs, formData]);
    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem)
            return;
        crud.handleDelete(dialogs.selectedItem.id);
        dialogs.closeDelete();
    }, [crud, dialogs]);
    const handleToggleStatus = useCallback((user) => {
        crud.handleToggleStatus(user.id, "status");
    }, [crud]);
    const openCreate = useCallback(() => {
        setFormData(emptyUserForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback((user) => {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            department: user.department ?? "",
            address: user.address ?? "",
        });
        dialogs.openEdit(user);
    }, [dialogs]);
    const clearFilters = useCallback(() => {
        setFilters({ role: "all", status: "all", department: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);
    const handleExportCSV = useCallback(() => {
        userServices.exportCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);
    const stats = userServices.computeStats(crud.items, search.filteredData.length);
    return {
        users: crud.items,
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
export function useRolesPage() {
    const crud = useCrudState(mockRoles, { name: "Rol" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyRoleForm);
    const [filters, setFilters] = useState({
        status: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (r) => [r.name, r.description],
        (r, f) => {
            const matchesStatus = f.status === "all" || r.status === f.status;
            return matchesStatus;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData, "name");
    const pagination = usePagination(sortable.sortedItems, 10);
    const togglePermission = useCallback((permission) => {
        setFormData((prev) => {
            if (prev.permissions.includes(permission)) {
                return { ...prev, permissions: prev.permissions.filter((p) => p !== permission) };
            }
            return { ...prev, permissions: [...prev.permissions, permission] };
        });
    }, []);
    const hasActiveFilters = filters.status !== "all" || search.searchTerm !== "";
    const handleCreate = useCallback(() => {
        crud.handleCreate({
            ...formData,
            usersCount: 0,
            status: "active",
        });
        dialogs.closeCreate();
        setFormData(emptyRoleForm);
    }, [crud, formData, dialogs]);
    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleEdit(dialogs.selectedItem.id, formData);
        dialogs.closeEdit();
        setFormData(emptyRoleForm);
    }, [crud, dialogs, formData]);
    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem) return;
        crud.handleDelete(dialogs.selectedItem.id);
        dialogs.closeDelete();
    }, [crud, dialogs]);
    const handleToggleStatus = useCallback((role) => {
        crud.handleToggleStatus(role.id, "status");
    }, [crud]);
    const openCreate = useCallback(() => {
        setFormData(emptyRoleForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback((role) => {
        setFormData({
            name: role.name,
            description: role.description,
            permissions: [...role.permissions],
        });
        dialogs.openEdit(role);
    }, [dialogs]);
    const clearFilters = useCallback(() => {
        setFilters({ status: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);
    const handleExportCSV = useCallback(() => {
        const headers = ["ID", "Nombre", "Descripción", "Permisos", "Usuarios Asignados", "Estado", "Fecha Creación"];
        const rows = search.filteredData.map((r) => [
            r.id,
            r.name,
            r.description,
            r.permissions.length,
            r.usersCount,
            r.status,
            r.createdAt,
        ]);
        const csv = [
            headers.join(","),
            ...rows.map((row) =>
                row.map((v) => {
                    const str = String(v ?? "");
                    return str.includes(",") ? `"${str}"` : str;
                }).join(",")
            ),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `roles-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Roles exportados a CSV");
    }, [search]);
    const stats = userServices.roleStats(crud.items);
    return {
        roles: crud.items,
        items: pagination.paginatedItems,
        search,
        sortable,
        pagination,
        dialogs,
        formData,
        setFormData,
        togglePermission,
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
