import { useState, useMemo } from "react";
export function usePagination(items, itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / itemsPerPage)), [items.length, itemsPerPage]);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);
    const goToPage = (page) => {
        const safePage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(safePage);
    };
    return {
        currentPage,
        setCurrentPage,
        goToPage,
        itemsPerPage,
        totalPages,
        paginatedItems,
        totalItems: items.length,
    };
}
