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
        rol: "all",
        estado: "all",
        departamento: "all",
    });
    const search = useSearchFilter(crud.items, (u) => [u.nombre, u.apellido, u.correo, u.telefono], (u, f) => {
        const rolIds = u.rolIds ?? (u.rolId != null ? [Number(u.rolId)] : []);
        const matchesRol =
            f.rol === "all" ||
            rolIds.includes(Number(f.rol)) ||
            (u.roles || []).some((r) => String(r.id) === String(f.rol));
        const estado = u.estado ?? u.status;
        const matchesEstado = f.estado === "all" || estado === f.estado;
        const matchesDept = f.departamento === "all" || (u.departamento ?? u.department) === f.departamento;
        return matchesRol && matchesEstado && matchesDept;
    }, filters);
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters = filters.rol !== "all" || filters.estado !== "all" || filters.departamento !== "all" || search.searchTerm !== "";
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
        crud.handleToggleStatus(user.id, "estado");
    }, [crud]);
    const openCreate = useCallback(() => {
        setFormData(emptyUserForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback((user) => {
        const primerRol =
            user.rolId ??
            (Array.isArray(user.rolIds) && user.rolIds.length > 0 ? Number(user.rolIds[0]) : "") ??
            (Array.isArray(user.roles) && user.roles.length > 0 ? Number(user.roles[0].id) : "");
        setFormData({
            firstName: user.nombre ?? user.firstName ?? "",
            lastName: user.apellido ?? user.lastName ?? "",
            correo: user.correo ?? user.email ?? "",
            telefono: user.telefono ?? user.phone ?? "",
            rolId: primerRol,
            estado: user.estado ?? user.status ?? "ACTIVO",
            cargo: user.cargo ?? "",
            departamento: user.departamento ?? user.department ?? "",
            direccion: user.direccion ?? user.address ?? "",
        });
        dialogs.openEdit(user);
    }, [dialogs]);
    const clearFilters = useCallback(() => {
        setFilters({ rol: "all", estado: "all", departamento: "all" });
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
        activo: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (r) => [r.nombre, r.descripcion],
        (r, f) => {
            const activo = typeof r.activo === "boolean" ? r.activo : r.status === "active";
            const matchesActivo = f.activo === "all" ||
                (f.activo === "active" && activo === true) ||
                (f.activo === "inactive" && activo === false);
            return matchesActivo;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData, "nombre");
    const pagination = usePagination(sortable.sortedItems, 10);
    const togglePermission = useCallback((permId) => {
        setFormData((prev) => {
            const ids = prev.permisosIds || [];
            if (ids.includes(permId)) {
                return { ...prev, permisosIds: ids.filter((p) => p !== permId) };
            }
            return { ...prev, permisosIds: [...ids, permId] };
        });
    }, []);
    const hasActiveFilters = filters.activo !== "all" || search.searchTerm !== "";
    const handleCreate = useCallback(() => {
        crud.handleCreate({
            ...formData,
            usuarios_asignados: 0,
            creado_en: new Date().toISOString().split("T")[0],
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
        crud.handleToggleStatus(role.id, "activo");
    }, [crud]);
    const openCreate = useCallback(() => {
        setFormData(emptyRoleForm);
        dialogs.openCreate();
    }, [dialogs]);
    const openEdit = useCallback((role) => {
        setFormData({
            nombre: role.nombre ?? "",
            descripcion: role.descripcion ?? "",
            activo: typeof role.activo === "boolean" ? role.activo : (role.status === "active"),
            permisosIds: [...(role.permisosIds ?? role.permisos_ids ?? [])],
        });
        dialogs.openEdit(role);
    }, [dialogs]);
    const clearFilters = useCallback(() => {
        setFilters({ activo: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);
    const handleExportCSV = useCallback(() => {
        const headers = ["ID", "Nombre", "Descripción", "Permisos", "Usuarios Asignados", "Activo", "Fecha Creación"];
        const rows = search.filteredData.map((r) => [
            r.id,
            r.nombre,
            r.descripcion ?? "",
            (r.permisosIds ?? r.permisos_ids ?? []).length,
            r.usuarios_asignados ?? r.usersCount ?? 0,
            (r.activo === true) ? "Sí" : "No",
            r.creado_en ?? r.createdAt ?? "",
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
