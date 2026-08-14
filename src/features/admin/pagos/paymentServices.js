export const SALE_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "paid", label: "Pagadas" },
    { value: "pending", label: "Pendientes" },
    { value: "partial", label: "Abono parcial" },
];
export const PAYMENT_METHOD_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "Tarjeta", label: "Tarjeta" },
    { value: "Efectivo", label: "Efectivo" },
    { value: "Transferencia", label: "Transferencia" },
];
export const emptySaleForm = {
    invoice: "FAC-2026-XXXX",
    client: "",
    tour: "",
    date: new Date().toISOString().split("T")[0],
    subtotal: 0,
    discount: 0,
    commission: 0,
    total: 0,
    status: "pending",
    paymentMethod: "Tarjeta",
    payments: [
        {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            amount: 0,
            method: "Tarjeta",
            status: "pending",
            reference: "",
        },
    ],
};
export const emptyPaymentForm = {
    saleId: null,
    date: "",
    amount: 0,
    method: "Tarjeta",
    status: "pending",
    reference: "",
};
export const mockSales = [
    {
        id: 501,
        invoice: "FAC-2026-0501",
        client: "Juan Pérez",
        tour: "Comuna 13 Tour",
        date: "2026-06-05",
        subtotal: 180000,
        discount: 0,
        commission: 10800,
        total: 180000,
        status: "paid",
        paymentMethod: "Tarjeta",
        payments: [
            { id: 1, date: "2026-06-05", amount: 180000, method: "Tarjeta", status: "completed", reference: "TXN-0001" },
        ],
    },
    {
        id: 502,
        invoice: "FAC-2026-0502",
        client: "María Smith",
        tour: "City Tour Clásico",
        date: "2026-06-05",
        subtotal: 120000,
        discount: 12000,
        commission: 7200,
        total: 108000,
        status: "pending",
        paymentMethod: "Efectivo",
        payments: [
            { id: 2, date: "2026-06-05", amount: 0, method: "Efectivo", status: "pending", reference: "Pago en hotel" },
        ],
    },
    {
        id: 503,
        invoice: "FAC-2026-0503",
        client: "Luca Rossi",
        tour: "Food Tour San Joaquín",
        date: "2026-06-04",
        subtotal: 330000,
        discount: 0,
        commission: 19800,
        total: 330000,
        status: "paid",
        paymentMethod: "Tarjeta",
        payments: [
            { id: 3, date: "2026-06-03", amount: 165000, method: "Tarjeta", status: "completed", reference: "TXN-0002" },
            { id: 4, date: "2026-06-04", amount: 165000, method: "Tarjeta", status: "completed", reference: "TXN-0003" },
        ],
    },
    {
        id: 504,
        invoice: "FAC-2026-0504",
        client: "Sofía López",
        tour: "Pablo Escobar Tour",
        date: "2026-06-03",
        subtotal: 320000,
        discount: 10000,
        commission: 18600,
        total: 310000,
        status: "partial",
        paymentMethod: "Transferencia",
        payments: [
            { id: 5, date: "2026-06-01", amount: 100000, method: "Transferencia", status: "completed", reference: "NEQUI-001" },
            { id: 6, date: "2026-06-03", amount: 0, method: "Transferencia", status: "pending" },
        ],
    },
];
export const paymentServices = {
    exportSalesCSV(sales) {
        const headers = ["Factura", "Cliente", "Tour", "Fecha", "Subtotal", "Descuento", "Comisión", "Total", "Estado", "MétodoPago"];
        const rows = sales.map((s) => [
            s.invoice,
            s.client,
            s.tour,
            s.date,
            s.subtotal,
            s.discount,
            s.commission,
            s.total,
            s.status,
            s.paymentMethod,
        ]);
        const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ventas-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    },
    exportPaymentsCSV(payments) {
        const headers = ["Factura", "Cliente", "Tour", "FechaPago", "Método", "Monto", "Estado", "Referencia"];
        const rows = payments.map((p) => [
            p.invoice,
            p.client,
            p.tour,
            p.date,
            p.method,
            p.amount,
            p.status,
            p.reference ?? "",
        ]);
        const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `abonos-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    },
    computeSalesStats(sales, filteredCount) {
        const revenue = sales.reduce((s, v) => s + v.total, 0);
        const commissions = sales.reduce((s, v) => s + v.commission, 0);
        return {
            total: sales.length,
            paid: sales.filter((s) => s.status === "paid").length,
            pending: sales.filter((s) => s.status === "pending").length,
            partial: sales.filter((s) => s.status === "partial").length,
            revenue: `$${revenue.toLocaleString()}`,
            commissions: `$${commissions.toLocaleString()}`,
            filtered: filteredCount ?? 0,
        };
    },
    buildPaymentsView(sales) {
        const result = [];
        sales.forEach((s) => {
            s.payments.forEach((p) => result.push({
                id: p.id,
                invoice: s.invoice,
                client: s.client,
                tour: s.tour,
                saleId: s.id,
                date: p.date,
                amount: p.amount,
                method: p.method,
                status: p.status,
                reference: p.reference,
                saleTotal: s.total,
                payments: s.payments,
            }));
        });
        return result;
    },
    computePaymentsStats(payments, filteredCount) {
        const collected = payments
            .filter((p) => p.status === "completed")
            .reduce((s, p) => s + p.amount, 0);
        const pending = payments
            .filter((p) => p.status === "pending" || p.status === "partial")
            .reduce((s, p) => s + p.amount, 0);
        return {
            total: payments.length,
            completed: payments.filter((p) => p.status === "completed").length,
            collected: `$${collected.toLocaleString()}`,
            pending: `$${pending.toLocaleString()}`,
            filtered: filteredCount ?? 0,
        };
    },
};
