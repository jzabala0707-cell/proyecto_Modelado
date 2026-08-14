export const BOOKING_STATUS_OPTIONS = [
    { value: "all", label: "Todos los estados" },
    { value: "confirmed", label: "Confirmadas" },
    { value: "pending", label: "Pendientes" },
    { value: "cancelled", label: "Canceladas" },
];
export const CLIENT_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "vip", label: "VIP" },
    { value: "active", label: "Activos" },
    { value: "inactive", label: "Inactivos" },
];
export const mockTours = [
    { id: 1, name: "Comuna 13 Tour", type: "Cultural", duration: "3 horas", capacity: 12, price: 45000, rating: 4.9, status: "active", description: "Recorrido histórico y artístico por la Comuna 13.", language: ["Español", "Inglés"] },
    { id: 2, name: "City Tour Clásico", type: "City Tour", duration: "4 horas", capacity: 15, price: 60000, rating: 4.8, status: "active", description: "Los lugares más emblemáticos de Medellín.", language: ["Español"] },
    { id: 3, name: "Pablo Escobar & Historia", type: "Histórico", duration: "5 horas", capacity: 10, price: 80000, rating: 4.6, status: "active", description: "Ruta histórica sobre los años 80 y 90." },
    { id: 4, name: "Food Tour San Joaquín", type: "Food Tour", duration: "3 horas", capacity: 8, price: 55000, rating: 4.7, status: "active", description: "Degustación de platos típicos.", language: ["Español", "Inglés"] },
    { id: 5, name: "Parque Arví Tour", type: "Naturaleza", duration: "6 horas", capacity: 12, price: 70000, rating: 4.5, status: "inactive", description: "Tour ecológico por el parque Arví.", language: ["Español"] },
    { id: 6, name: "Grafiti Tour Comuna 13", type: "Arte Urbano", duration: "2 horas", capacity: 10, price: 35000, rating: 4.8, status: "active", description: "Conoce los mejores murales de la ciudad.", language: ["Español", "Inglés"] },
];
export const TOUR_NAME_OPTIONS = mockTours.map((t) => ({ value: t.name, label: t.name }));
export const PAYMENT_METHODS = [
    { value: "Tarjeta", label: "Tarjeta de Crédito/Débito" },
    { value: "Efectivo", label: "Efectivo" },
    { value: "Transferencia", label: "Transferencia Bancaria" },
];
export const NATIONALITY_OPTIONS = [
    { value: "Colombia", label: "Colombia" },
    { value: "USA", label: "Estados Unidos (USA)" },
    { value: "México", label: "México" },
    { value: "Argentina", label: "Argentina" },
    { value: "Brasil", label: "Brasil" },
    { value: "Chile", label: "Chile" },
    { value: "España", label: "España" },
    { value: "Italia", label: "Italia" },
    { value: "Alemania", label: "Alemania" },
    { value: "Reino Unido", label: "Reino Unido" },
    { value: "Canadá", label: "Canadá" },
    { value: "Francia", label: "Francia" },
];
export const mockBookings = [
    { id: 1001, customer: "Juan Pérez", tour: "Comuna 13 Tour", date: "2026-06-05", time: "09:00", people: 4, total: 180000, status: "confirmed", phone: "+57 300 1234567", email: "juan@email.com", notes: "Preferencia por horario matutino.", paymentMethod: "Tarjeta", guide: "Carlos Muñoz" },
    { id: 1002, customer: "María Smith", tour: "City Tour Clásico", date: "2026-06-05", time: "14:00", people: 2, total: 120000, status: "pending", phone: "+57 300 1234568", email: "maria@email.com", notes: "Pago pendiente en hotel.", paymentMethod: "Efectivo", guide: "Andrés Patiño" },
    { id: 1003, customer: "Luca Rossi", tour: "Food Tour San Joaquín", date: "2026-06-04", time: "18:00", people: 6, total: 330000, status: "confirmed", phone: "+57 300 1234569", email: "luca@email.com", paymentMethod: "Tarjeta", guide: "Luisa Zuluaga" },
    { id: 1004, customer: "Carlos Gómez", tour: "Pablo Escobar & Historia", date: "2026-06-03", time: "10:00", people: 2, total: 160000, status: "cancelled", phone: "+57 300 1234571", email: "carlos@email.com", notes: "Cancelado por clima.", paymentMethod: "Transferencia" },
    { id: 1005, customer: "Emma Wilson", tour: "Comuna 13 Tour", date: "2026-06-02", time: "15:00", people: 3, total: 135000, status: "confirmed", phone: "+57 300 1234572", email: "emma@email.com", paymentMethod: "Tarjeta", guide: "Carlos Muñoz" },
    { id: 1006, customer: "Diego Ramírez", tour: "Grafiti Tour Comuna 13", date: "2026-06-01", time: "11:00", people: 10, total: 350000, status: "confirmed", phone: "+57 300 1234575", email: "diego@email.com", paymentMethod: "Efectivo", guide: "Carlos Muñoz" },
];
export const mockClients = [
    { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "+57 300 1234567", status: "vip", bookings: 12, totalSpent: 5400000, nationality: "Colombia", lastBooking: "2026-06-05", vip: true, registrationDate: "2024-01-15" },
    { id: 2, name: "María Smith", email: "maria@email.com", phone: "+57 300 1234568", status: "active", bookings: 4, totalSpent: 720000, nationality: "USA", lastBooking: "2026-06-05", registrationDate: "2025-08-20" },
    { id: 3, name: "Luca Rossi", email: "luca@email.com", phone: "+57 300 1234569", status: "active", bookings: 3, totalSpent: 540000, nationality: "Italia", lastBooking: "2026-06-04", registrationDate: "2025-11-10" },
    { id: 4, name: "Sofía López", email: "sofia@email.com", phone: "+57 300 1234570", status: "vip", bookings: 8, totalSpent: 3200000, nationality: "Argentina", lastBooking: "2026-06-03", vip: true, registrationDate: "2024-05-12" },
    { id: 5, name: "Carlos Gómez", email: "carlos@email.com", phone: "+57 300 1234571", status: "inactive", bookings: 1, totalSpent: 160000, nationality: "Colombia", lastBooking: "2025-12-20", registrationDate: "2025-10-01" },
    { id: 6, name: "Emma Wilson", email: "emma@email.com", phone: "+57 300 1234572", status: "active", bookings: 5, totalSpent: 1230000, nationality: "Reino Unido", lastBooking: "2026-06-02", registrationDate: "2025-09-15" },
];
export const emptyBookingForm = {
    customer: "",
    tour: "Comuna 13 Tour",
    date: "",
    time: "09:00",
    people: 2,
    total: 0,
    status: "pending",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "Tarjeta",
    guide: "",
};
export const emptyClientForm = {
    name: "",
    email: "",
    phone: "",
    status: "active",
    bookings: 0,
    totalSpent: 0,
    nationality: "",
    lastBooking: "",
    registrationDate: new Date().toISOString().split("T")[0],
};
export const bookingServices = {
    computeStats(bookings, filteredCount) {
        const total = bookings.length;
        const confirmed = bookings.filter((b) => b.status === "confirmed").length;
        const pending = bookings.filter((b) => b.status === "pending").length;
        const cancelled = bookings.filter((b) => b.status === "cancelled").length;
        const revenueNum = bookings
            .filter((b) => b.status !== "cancelled")
            .reduce((s, b) => s + b.total, 0);
        return {
            total,
            confirmed,
            pending,
            cancelled,
            revenue: `$${revenueNum.toLocaleString()}`,
            filtered: filteredCount,
        };
    },
    exportCSV(bookings, clients) {
        const headers = ["ID", "Cliente", "Tour", "Fecha", "Hora", "Personas", "Total", "Estado", "Teléfono", "Email", "MétodoPago", "Guía"];
        const csv = [
            headers.join(","),
            ...bookings.map((b) => [
                b.id,
                `"${b.customer ?? ""}"`,
                `"${b.tour ?? ""}"`,
                b.date ?? "",
                b.time ?? "",
                b.people ?? 0,
                b.total ?? 0,
                b.status ?? "",
                `"${b.phone ?? ""}"`,
                `"${b.email ?? ""}"`,
                b.paymentMethod ?? "",
                `"${b.guide ?? ""}"`,
            ].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `reservas-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    },
};
export const clientServices = {
    computeStats(clients, filteredCount) {
        const total = clients.length;
        const vip = clients.filter((c) => c.vip || c.status === "vip").length;
        const active = clients.filter((c) => c.status === "active" || c.status === "vip").length;
        const inactive = clients.filter((c) => c.status === "inactive").length;
        const totalRevenueNum = clients.reduce((s, c) => s + c.totalSpent, 0);
        return {
            total,
            vip,
            active,
            inactive,
            totalRevenue: `$${totalRevenueNum.toLocaleString()}`,
            filtered: filteredCount,
        };
    },
    initials(name) {
        return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    },
    exportCSV(clients) {
        const headers = ["ID", "Nombre", "Email", "Teléfono", "Estado", "Nacionalidad", "Reservas", "GastoTotal", "VIP", "FechaRegistro"];
        const csv = [
            headers.join(","),
            ...clients.map((c) => [
                c.id,
                `"${c.name ?? ""}"`,
                `"${c.email ?? ""}"`,
                `"${c.phone ?? ""}"`,
                c.status ?? "",
                c.nationality ?? "",
                c.bookings ?? 0,
                c.totalSpent ?? 0,
                c.vip ? "Sí" : "No",
                c.registrationDate ?? "",
            ].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `clientes-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    },
};
