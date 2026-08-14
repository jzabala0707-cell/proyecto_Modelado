import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockGuides, emptyGuideForm, guideServices } from "../guideServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";

export function useGuidesPage() {
    const crud = useCrudState(mockGuides, { name: "Guía" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyGuideForm);
    const [filters, setFilters] = useState({
        status: "all",
        language: "all",
        specialty: "all",
    });

    const search = useSearchFilter(
        crud.items,
        (g) => [g.name, g.email, g.phone, ...(g.specialties ?? []), ...(g.languages ?? [])],
        (g, f) => {
            const matchesStatus = f.status === "all" || g.status === f.status;
            const matchesLanguage = f.language === "all" || (g.languages ?? []).includes(f.language);
            const matchesSpecialty = f.specialty === "all" || (g.specialties ?? []).includes(f.specialty);
            return matchesStatus && matchesLanguage && matchesSpecialty;
        },
        filters
    );

    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);

    const hasActiveFilters =
        filters.status !== "all" ||
        filters.language !== "all" ||
        filters.specialty !== "all" ||
        search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        crud.handleCreate(formData);
        dialogs.closeCreate();
        setFormData(emptyGuideForm);
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

    const handleToggleStatus = useCallback((guide) => {
        crud.handleToggleStatus(guide.id, "status");
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptyGuideForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((guide) => {
        setFormData({
            name: guide.name,
            email: guide.email,
            phone: guide.phone,
            status: guide.status,
            languages: guide.languages ?? [],
            specialties: guide.specialties ?? [],
            address: guide.address ?? "",
            bio: guide.bio ?? "",
            rating: guide.rating ?? 0,
            toursCount: guide.toursCount ?? 0,
            joinedAt: guide.joinedAt ?? new Date().toISOString().split("T")[0],
        });
        dialogs.openEdit(guide);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "all", language: "all", specialty: "all" });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        guideServices.exportCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = guideServices.computeStats(crud.items, search.filteredData.length);

    const handlers = {
        handleCreate,
        handleEdit,
        handleDelete,
        handleToggleStatus,
        openCreate,
        openEdit,
        clearFilters,
        handleExportCSV,
    };

    return {
        guides: crud.items,
        items: pagination.paginatedItems,
        search,
        sortable,
        pagination,
        dialogs,
        filters,
        setFilters,
        hasActiveFilters,
        formData,
        setFormData,
        stats,
        ...handlers,
    };
}
