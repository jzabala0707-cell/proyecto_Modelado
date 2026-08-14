import { TrendingUp, Calendar, DollarSign, UserCheck } from "lucide-react";
import { toast } from "sonner";
export const MONTHLY_DATA = [
    { month: "Ene", ventas: 4000000, reservas: 42 },
    { month: "Feb", ventas: 3200000, reservas: 38 },
    { month: "Mar", ventas: 5100000, reservas: 56 },
    { month: "Abr", ventas: 4700000, reservas: 52 },
    { month: "May", ventas: 6300000, reservas: 68 },
    { month: "Jun", ventas: 5800000, reservas: 63 },
];
export const TOURS_PERFORMANCE = [
    { tour: "Comuna 13", reservas: 68, ingresos: 30600000 },
    { tour: "City Tour", reservas: 54, ingresos: 32400000 },
    { tour: "Food Tour", reservas: 41, ingresos: 22550000 },
    { tour: "Pablo Escobar", reservas: 29, ingresos: 23200000 },
    { tour: "Grafiti Tour", reservas: 35, ingresos: 12250000 },
];
export const GUIDES_PERFORMANCE = [
    { guia: "Carlos Muñoz", tours: 28, rating: 4.9 },
    { guia: "Andrés Patiño", tours: 22, rating: 4.7 },
    { guia: "Luisa Zuluaga", tours: 18, rating: 4.8 },
    { guia: "José Gutiérrez", tours: 25, rating: 4.9 },
    { guia: "Patricia López", tours: 15, rating: 4.5 },
];
export const REPORT_TYPES = [
    { value: "ventas", label: "Ventas" },
    { value: "tours", label: "Tours" },
    { value: "guias", label: "Guías" },
    { value: "clientes", label: "Clientes" },
];
export function exportReportsCSV(data, filename = "reporte", headers) {
    let csvContent = "";
    if (headers && headers.length > 0) {
        csvContent = headers.join(",") + "\n";
    }
    if (data && data.length > 0) {
        const rows = data.map((row) => {
            return Object.values(row).map((v) => {
                const str = String(v ?? "");
                return str.includes(",") ? `"${str}"` : str;
            }).join(",");
        });
        csvContent += rows.join("\n");
    }
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
export function exportPDF(reportType) {
    toast.success(`Generando PDF de ${reportType}...`);
}
export const reportServices = {
    computeSummary() {
        const totalRevenue = MONTHLY_DATA.reduce((s, m) => s + m.ventas, 0);
        const totalBookings = MONTHLY_DATA.reduce((s, m) => s + m.reservas, 0);
        const guides = GUIDES_PERFORMANCE.length;
        const avgRating = GUIDES_PERFORMANCE.reduce((s, g) => s + g.rating, 0) / GUIDES_PERFORMANCE.length;
        return {
            totalRevenue: `$${totalRevenue.toLocaleString()}`,
            totalBookings,
            guides,
            avgRating: avgRating.toFixed(1),
            stats: [
                { title: "Ingresos Totales", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary", trend: "up", change: "+18%" },
                { title: "Reservas", value: totalBookings, icon: Calendar, color: "text-success", trend: "up", change: "+12%" },
                { title: "Guías Activos", value: guides, icon: UserCheck, color: "text-secondary", trend: "up", change: "+5%" },
                { title: "Rating Promedio", value: avgRating.toFixed(1), icon: TrendingUp, color: "text-warning", trend: "up", change: "+0.2" },
            ],
        };
    },
    exportByType(reportType, dateStart, dateEnd) {
        let data = [];
        let filename = `reporte-${reportType}`;
        let headers = [];
        switch (reportType) {
            case "ventas":
                data = MONTHLY_DATA.map((m) => ({ ...m, ventasFormateado: `$${m.ventas.toLocaleString()}` }));
                headers = ["Mes", "Ventas", "Reservas", "Ventas Formateado"];
                filename = `ventas-${dateStart || "inicio"}-${dateEnd || "fin"}`;
                break;
            case "tours":
                data = TOURS_PERFORMANCE.map((t) => ({ ...t, ingresosFormateado: `$${t.ingresos.toLocaleString()}` }));
                headers = ["Tour", "Reservas", "Ingresos", "Ingresos Formateado"];
                filename = `rendimiento-tours-${dateStart || "inicio"}-${dateEnd || "fin"}`;
                break;
            case "guias":
                data = GUIDES_PERFORMANCE;
                headers = ["Guía", "Tours", "Rating"];
                filename = `rendimiento-guias-${dateStart || "inicio"}-${dateEnd || "fin"}`;
                break;
            case "clientes":
                data = MONTHLY_DATA.map((m) => ({ mes: m.month, clientesAtendidos: Math.round(m.reservas * 2.3) }));
                headers = ["Mes", "Clientes Atendidos"];
                filename = `clientes-${dateStart || "inicio"}-${dateEnd || "fin"}`;
                break;
            default:
                data = MONTHLY_DATA;
                headers = ["Mes", "Ventas", "Reservas"];
        }
        exportReportsCSV(data, filename, headers);
        toast.success(`Reporte de ${reportType} exportado a CSV`);
        return data;
    },
};
