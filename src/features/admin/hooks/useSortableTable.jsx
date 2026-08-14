import { useState, useMemo } from "react";
import { ArrowUp, ArrowUpDown, ArrowDown } from "lucide-react";
export function useSortableTable(items, defaultField) {
    const [sortField, setSortField] = useState(defaultField ?? null);
    const [sortOrder, setSortOrder] = useState(defaultField ? "asc" : null);
    const handleSort = (field) => {
        if (sortField === field) {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            }
            else if (sortOrder === "desc") {
                setSortField(null);
                setSortOrder(null);
            }
        }
        else {
            setSortField(field);
            setSortOrder("asc");
        }
    };
    const getSortIcon = (field) => {
        if (sortField !== field)
            return <ArrowUpDown className="h-4 w-4 ml-2 text-muted-foreground"/>;
        if (sortOrder === "asc")
            return <ArrowUp className="h-4 w-4 ml-2 text-primary"/>;
        return <ArrowDown className="h-4 w-4 ml-2 text-primary"/>;
    };
    const resetSort = () => {
        setSortField(null);
        setSortOrder(null);
    };
    const sortedItems = useMemo(() => {
        if (!sortField || !sortOrder)
            return items;
        return [...items].sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];
            if (aVal == null && bVal == null)
                return 0;
            if (aVal == null)
                return 1;
            if (bVal == null)
                return -1;
            if (aVal < bVal)
                return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal)
                return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [items, sortField, sortOrder]);
    return {
        sortField,
        sortOrder,
        handleSort,
        getSortIcon,
        resetSort,
        sortedItems,
    };
}
