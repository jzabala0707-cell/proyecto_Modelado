import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { reportServices, MONTHLY_DATA, TOURS_PERFORMANCE, GUIDES_PERFORMANCE, REPORT_TYPES } from "../reportServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";
export function useReportsPage() {
    const [reportType, setReportType] = useState("ventas");
    const [dateStart, setDateStart] = useState("2026-01-01");
    const [dateEnd, setDateEnd] = useState("2026-06-30");
    const summary = useMemo(() => reportServices.computeSummary(), []);
    const allTableData = useMemo(() => {
        const monthly = MONTHLY_DATA.map((m, i) => ({ ...m, id: `month-${i}` }));
        const tours = TOURS_PERFORMANCE.map((t, i) => ({ ...t, id: `tour-${i}` }));
        const guides = GUIDES_PERFORMANCE.map((g, i) => ({ ...g, id: `guide-${i}` }));
        return { monthly, tours, guides };
    }, []);
    const monthlySearch = useSearchFilter(
        allTableData.monthly,
        (item) => [item.month, item.ventas, item.reservas],
        undefined,
        { status: "all" }
    );
    const toursSearch = useSearchFilter(
        allTableData.tours,
        (item) => [item.tour, item.reservas, item.ingresos],
        undefined,
        { status: "all" }
    );
    const guidesSearch = useSearchFilter(
        allTableData.guides,
        (item) => [item.guia, item.tours, item.rating],
        undefined,
        { status: "all" }
    );
    const monthlySortable = useSortableTable(monthlySearch.filteredData, "month");
    const toursSortable = useSortableTable(toursSearch.filteredData, "reservas");
    const guidesSortable = useSortableTable(guidesSearch.filteredData, "tours");
    const handleGenerate = useCallback(() => {
        toast.success(`Reporte de ${reportType} generado (${dateStart} a ${dateEnd})`);
    }, [reportType, dateStart, dateEnd]);
    const handleExport = useCallback(() => {
        toast.success("Exportación iniciada...");
    }, []);
    const handleExportCSV = useCallback(() => {
        reportServices.exportByType(reportType, dateStart, dateEnd);
    }, [reportType, dateStart, dateEnd]);
    const handleExportAllTables = useCallback(() => {
        const combined = [
            ...allTableData.monthly.map((m) => ({ tipo: "Mensual", clave: m.month, valor1: m.ventas, valor2: m.reservas })),
            ...allTableData.tours.map((t) => ({ tipo: "Tour", clave: t.tour, valor1: t.reservas, valor2: t.ingresos })),
            ...allTableData.guides.map((g) => ({ tipo: "Guía", clave: g.guia, valor1: g.tours, valor2: g.rating })),
        ];
        reportServices.exportByType(reportType, dateStart, dateEnd);
    }, [allTableData, reportType, dateStart, dateEnd]);
    const hasActiveFilters = useMemo(() => {
        return (
            monthlySearch.hasActiveFilters ||
            toursSearch.hasActiveFilters ||
            guidesSearch.hasActiveFilters ||
            reportType !== "ventas" ||
            dateStart !== "2026-01-01" ||
            dateEnd !== "2026-06-30"
        );
    }, [monthlySearch, toursSearch, guidesSearch, reportType, dateStart, dateEnd]);
    const clearFilters = useCallback(() => {
        monthlySearch.clearFilters();
        toursSearch.clearFilters();
        guidesSearch.clearFilters();
        setReportType("ventas");
        setDateStart("2026-01-01");
        setDateEnd("2026-06-30");
        monthlySortable.resetSort();
        toursSortable.resetSort();
        guidesSortable.resetSort();
        toast.info("Filtros de reportes limpiados");
    }, [monthlySearch, toursSearch, guidesSearch, monthlySortable, toursSortable, guidesSortable]);
    const tableData = useMemo(() => ({
        monthly: monthlySortable.sortedItems,
        tours: toursSortable.sortedItems,
        guides: guidesSortable.sortedItems,
    }), [monthlySortable, toursSortable, guidesSortable]);
    return {
        reportType,
        setReportType,
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,
        summary,
        handleGenerate,
        handleExport,
        handleExportCSV,
        handleExportAllTables,
        hasActiveFilters,
        clearFilters,
        reportTypes: REPORT_TYPES,
        monthlySearch,
        toursSearch,
        guidesSearch,
        monthlySortable,
        toursSortable,
        guidesSortable,
        tableData,
    };
}
