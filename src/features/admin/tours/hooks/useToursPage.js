import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
    mockTours,
    mockTourTypes,
    mockGroups,
    emptyTourForm,
    emptyTourTypeForm,
    emptyGroupForm,
    tourServices,
} from "../tourServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";

export function useToursPage() {
    const crud = useCrudState(mockTours, { name: "Tour" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyTourForm);
    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
        language: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (t) => [t.name, t.type, t.duration, t.description],
        (t, f) => {
            const matchesStatus = f.status === "all" || t.status === f.status;
            const matchesType = f.type === "all" || t.type === f.type;
            const matchesLanguage = f.language === "all" || (t.language && t.language.includes(f.language));
            return matchesStatus && matchesType && matchesLanguage;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters = filters.status !== "all" || filters.type !== "all" || filters.language !== "all" || search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyTourForm);
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

    const handleToggleStatus = useCallback((tour) => {
        crud.handleToggleStatus(tour.id, "status");
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptyTourForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((tour) => {
        setFormData({
            name: tour.name,
            type: tour.type,
            duration: tour.duration,
            capacity: tour.capacity,
            price: tour.price,
            rating: tour.rating,
            status: tour.status,
            description: tour.description ?? "",
            language: tour.language ?? ["Español"],
        });
        dialogs.openEdit(tour);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "all", type: "all", language: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        tourServices.exportToursCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = tourServices.computeTourStats(crud.items, search.filteredData.length);

    return {
        tours: crud.items,
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

export function useGroupsPage() {
    const crud = useCrudState(mockGroups, { name: "Grupo" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyGroupForm);
    const [filters, setFilters] = useState({
        status: "all",
        guide: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (g) => [g.tourName, g.groupName, g.guideName],
        (g, f) => {
            const matchesStatus = f.status === "all" || g.status === f.status;
            const matchesGuide = f.guide === "all" || g.guideName === f.guide;
            return matchesStatus && matchesGuide;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters = filters.status !== "all" || filters.guide !== "all" || search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyGroupForm);
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

    const handleToggleStatus = useCallback((group) => {
        if (group.status === "pending") {
            crud.handleEdit(group.id, { status: "confirmed" });
            toast.success("Grupo confirmado exitosamente");
        } else if (group.status === "confirmed") {
            crud.handleEdit(group.id, { status: "pending" });
            toast.info("Grupo marcado como pendiente");
        }
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptyGroupForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((group) => {
        setFormData({
            tourName: group.tourName,
            groupName: group.groupName,
            guideName: group.guideName,
            date: group.date,
            startTime: group.startTime,
            maxCapacity: group.maxCapacity,
            participants: group.participants ?? [],
            status: group.status,
            meetingPoint: group.meetingPoint ?? "",
            notes: group.notes ?? "",
        });
        dialogs.openEdit(group);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "all", guide: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        tourServices.exportGroupsCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = tourServices.computeGroupStats(crud.items, search.filteredData.length);

    return {
        groups: crud.items,
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

export function useTourTypesPage() {
    const crud = useCrudState(mockTourTypes, { name: "Tipo Tour" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyTourTypeForm);
    const [filters, setFilters] = useState({
        color: "all",
    });
    const search = useSearchFilter(
        crud.items,
        (t) => [t.name, t.description],
        (t, f) => {
            const matchesColor = f.color === "all" || t.color === f.color;
            return matchesColor;
        },
        filters
    );
    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);
    const hasActiveFilters = filters.color !== "all" || search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyTourTypeForm);
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

    const openCreate = useCallback(() => {
        setFormData(emptyTourTypeForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((type) => {
        setFormData({
            name: type.name,
            description: type.description ?? "",
            color: type.color,
            count: type.count,
            activeTours: type.activeTours,
        });
        dialogs.openEdit(type);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ color: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        tourServices.exportTourTypesCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = tourServices.computeTypeStats(crud.items, search.filteredData.length);

    return {
        tourTypes: crud.items,
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
        openCreate,
        openEdit,
        clearFilters,
        handleExportCSV,
    };
}
