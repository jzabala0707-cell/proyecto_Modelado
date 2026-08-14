import { useState, useMemo } from "react";
export function useSearchFilter(items, getSearchFields, fieldFilter, initialFilters, initialStatusKey) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState((initialFilters ?? { status: "all" }));
    const setStatusFilter = (value) => {
        const key = initialStatusKey ?? "status";
        setFilters({ ...filters, [key]: value });
    };
    const hasActiveFilters = useMemo(() => {
        return Object.entries(filters).some(([k, v]) => v !== "all" && v !== "") || searchTerm !== "";
    }, [filters, searchTerm]);
    const clearFilters = () => {
        setSearchTerm("");
        const reset = {};
        Object.keys(filters).forEach((k) => {
            reset[k] = "all";
        });
        setFilters(reset);
    };
    const filteredData = useMemo(() => {
        return items.filter((item) => {
            const lowerSearch = searchTerm.toLowerCase();
            const matchesSearch = lowerSearch === "" ||
                getSearchFields(item).some((field) => String(field).toLowerCase().includes(lowerSearch));
            const matchesFields = fieldFilter ? fieldFilter(item, filters) : true;
            return matchesSearch && matchesFields;
        });
    }, [items, searchTerm, filters, getSearchFields, fieldFilter]);
    return {
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        setStatusFilter,
        hasActiveFilters,
        clearFilters,
        filteredData,
    };
}
