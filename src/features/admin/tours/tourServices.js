export const colorOptions = [
    { value: "#2563eb", label: "Azul" },
    { value: "#06b6d4", label: "Cian" },
    { value: "#8b5cf6", label: "Violeta" },
    { value: "#22c55e", label: "Verde" },
    { value: "#f59e0b", label: "Amarillo" },
    { value: "#ef4444", label: "Rojo" },
    { value: "#f97316", label: "Naranja" },
    { value: "#ec4899", label: "Rosa" },
];
export const mockTours = [
    { id: 1, name: "Comuna 13 Tour", type: "Cultural", duration: "3 horas", capacity: 12, price: 45000, rating: 4.9, status: "active", description: "Recorrido histórico y artístico por la Comuna 13.", language: ["Español", "Inglés"] },
    { id: 2, name: "City Tour Clásico", type: "City Tour", duration: "4 horas", capacity: 15, price: 60000, rating: 4.8, status: "active", description: "Los lugares más emblemáticos de Medellín.", language: ["Español"] },
    { id: 3, name: "Pablo Escobar & Historia", type: "Histórico", duration: "5 horas", capacity: 10, price: 80000, rating: 4.6, status: "active", description: "Ruta histórica sobre los años 80 y 90." },
    { id: 4, name: "Food Tour San Joaquín", type: "Food Tour", duration: "3 horas", capacity: 8, price: 55000, rating: 4.7, status: "active", description: "Degustación de platos típicos.", language: ["Español", "Inglés"] },
    { id: 5, name: "Parque Arví Tour", type: "Naturaleza", duration: "6 horas", capacity: 12, price: 70000, rating: 4.5, status: "inactive", description: "Tour ecológico por el parque Arví.", language: ["Español"] },
    { id: 6, name: "Grafiti Tour Comuna 13", type: "Arte Urbano", duration: "2 horas", capacity: 10, price: 35000, rating: 4.8, status: "active", description: "Conoce los mejores murales de la ciudad.", language: ["Español", "Inglés"] },
];
export const mockTourTypes = [
    { id: 1, name: "Cultural", description: "Tours que combinan historia, cultura local y tradición.", color: "#2563eb", count: 8, activeTours: 6 },
    { id: 2, name: "City Tour", description: "Recorridos urbanos por los puntos emblemáticos de la ciudad.", color: "#06b6d4", count: 12, activeTours: 9 },
    { id: 3, name: "Histórico", description: "Rutas guiadas por hechos y personajes históricos.", color: "#8b5cf6", count: 5, activeTours: 5 },
    { id: 4, name: "Food Tour", description: "Experiencias gastronómicas con degustaciones incluidas.", color: "#22c55e", count: 6, activeTours: 4 },
    { id: 5, name: "Aventura", description: "Actividades al aire libre y experiencias emocionantes.", color: "#f97316", count: 4, activeTours: 3 },
    { id: 6, name: "Arte Urbano", description: "Grafiti y murales por los barrios más creativos.", color: "#ec4899", count: 3, activeTours: 3 },
];
export const mockGroups = [
    {
        id: 1,
        tourName: "Comuna 13 Tour",
        groupName: "Comuna 13 - Grupo 01",
        guideName: "Carlos Muñoz",
        date: "2026-06-05",
        startTime: "09:00",
        maxCapacity: 12,
        participants: [
            { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "+57 300 1234567", nationality: "Colombiano" },
            { id: 2, name: "María Smith", email: "maria@email.com", phone: "+57 300 1234568", nationality: "Estadounidense" },
            { id: 3, name: "Luca Rossi", email: "luca@email.com", phone: "+57 300 1234569", nationality: "Italiano" },
            { id: 4, name: "Sofía López", email: "sofia@email.com", phone: "+57 300 1234570", nationality: "Argentina" },
            { id: 5, name: "Carlos Gómez", email: "carlos@email.com", phone: "+57 300 1234571", nationality: "Colombiano" },
            { id: 6, name: "Emma Wilson", email: "emma@email.com", phone: "+57 300 1234572", nationality: "Británica" },
        ],
        status: "confirmed",
        meetingPoint: "Estación San Javier (Metro)",
        notes: "Traer zapatos cómodos y gorra. Incluye café y empanada al final.",
    },
    {
        id: 2,
        tourName: "City Tour Clásico",
        groupName: "City Tour - Grupo 01",
        guideName: "Andrés Patiño",
        date: "2026-06-05",
        startTime: "14:00",
        maxCapacity: 15,
        participants: [
            { id: 7, name: "Pedro Martínez", email: "pedro@email.com", phone: "+57 300 1234573", nationality: "Colombiano" },
            { id: 8, name: "Anna Müller", email: "anna@email.com", phone: "+57 300 1234574", nationality: "Alemana" },
        ],
        status: "pending",
        meetingPoint: "Plaza Botero",
        notes: "Transporte incluido en bus.",
    },
    {
        id: 3,
        tourName: "Food Tour San Joaquín",
        groupName: "Food Tour - Grupo 02",
        guideName: "Luisa Zuluaga",
        date: "2026-06-04",
        startTime: "18:00",
        maxCapacity: 8,
        participants: [
            { id: 9, name: "Diego Ramírez", email: "diego@email.com", phone: "+57 300 1234575", nationality: "Colombiano" },
            { id: 10, name: "Ana Torres", email: "ana@email.com", phone: "+57 300 1234576", nationality: "Mexicana" },
            { id: 11, name: "Lucas Silva", email: "lucas@email.com", phone: "+57 300 1234577", nationality: "Brasileño" },
            { id: 12, name: "Valeria Castro", email: "valeria@email.com", phone: "+57 300 1234578", nationality: "Chilena" },
            { id: 13, name: "Pablo Herrera", email: "pablo@email.com", phone: "+57 300 1234579", nationality: "Colombiano" },
            { id: 14, name: "Nina Patel", email: "nina@email.com", phone: "+57 300 1234580", nationality: "Canadiense" },
        ],
        status: "completed",
        meetingPoint: "Parque de los Pies Descalzos",
        notes: "Allergías reportadas en lista.",
    },
];
export const GROUP_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "confirmed", label: "Confirmado" },
    { value: "pending", label: "Pendiente" },
    { value: "completed", label: "Completado" },
    { value: "cancelled", label: "Cancelado" },
];

export const emptyTourForm = {
    name: "",
    type: "Cultural",
    duration: "",
    capacity: 12,
    price: 0,
    rating: 4.5,
    status: "active",
    description: "",
    language: ["Español"],
};

export const emptyTourTypeForm = {
    name: "",
    description: "",
    color: "#2563eb",
    count: 0,
    activeTours: 0,
};

export const emptyGroupForm = {
    tourName: "",
    groupName: "",
    guideName: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    maxCapacity: 12,
    participants: [],
    status: "pending",
    meetingPoint: "",
    notes: "",
};

export const TOUR_TYPE_OPTIONS = mockTourTypes.map((t) => ({
    value: t.name,
    label: t.name,
}));

export const TOUR_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Activos" },
    { value: "inactive", label: "Inactivos" },
];

export const GUIDE_NAME_OPTIONS = [
    { value: "Carlos Muñoz", label: "Carlos Muñoz" },
    { value: "Luisa Zuluaga", label: "Luisa Zuluaga" },
    { value: "Andrés Patiño", label: "Andrés Patiño" },
    { value: "Daniela Torres", label: "Daniela Torres" },
    { value: "José Gutiérrez", label: "José Gutiérrez" },
];

export const LANGUAGE_OPTIONS = [
    { value: "all", label: "Todos los idiomas" },
    { value: "Español", label: "Español" },
    { value: "Inglés", label: "Inglés" },
    { value: "Francés", label: "Francés" },
    { value: "Portugués", label: "Portugués" },
];

export const tourServices = {
    computeTourStats(tours, filteredCount) {
        return {
            total: tours.length,
            active: tours.filter((t) => t.status === "active").length,
            avgPrice: tours.length > 0
                ? `$${Math.round(tours.reduce((s, t) => s + t.price, 0) / tours.length).toLocaleString()}`
                : "$0",
            avgRating: tours.length > 0
                ? (tours.reduce((s, t) => s + t.rating, 0) / tours.length).toFixed(1)
                : "0.0",
            filtered: filteredCount,
        };
    },
    computeTypeStats(types, filteredCount) {
        return {
            total: types.length,
            totalTours: types.reduce((s, t) => s + t.count, 0),
            activeTours: types.reduce((s, t) => s + t.activeTours, 0),
            filtered: filteredCount,
        };
    },
    computeGroupStats(groups, filteredCount) {
        const pax = groups.reduce((s, g) => s + g.participants.length, 0);
        return {
            total: groups.length,
            totalParticipants: pax,
            confirmed: groups.filter((g) => g.status === "confirmed").length,
            filtered: filteredCount,
        };
    },
    occupancyPercentage(group) {
        return Math.round((group.participants.length / group.maxCapacity) * 100);
    },
    occupancyColor(pct) {
        if (pct >= 80)
            return "bg-success";
        if (pct >= 50)
            return "bg-warning";
        return "bg-primary";
    },
    exportToursCSV(tours) {
        const headers = ["Nombre", "Tipo", "Duración", "Capacidad", "Precio", "Rating", "Estado", "Descripción"];
        const csv = [
            headers.join(","),
            ...tours.map((t) => [t.name, t.type, t.duration, t.capacity, t.price, t.rating, t.status, `"${(t.description ?? "").replace(/"/g, '""')}"`].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tours-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    },
    exportGroupsCSV(groups) {
        const headers = ["Tour", "Grupo", "Guía", "Fecha", "Hora", "Participantes", "Capacidad Máxima", "Estado", "Punto de Encuentro"];
        const csv = [
            headers.join(","),
            ...groups.map((g) => [g.tourName, g.groupName, g.guideName, g.date, g.startTime, g.participants.length, g.maxCapacity, g.status, `"${(g.meetingPoint ?? "").replace(/"/g, '""')}"`].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `grupos-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    },
    exportTourTypesCSV(types) {
        const headers = ["Tipo", "Descripción", "Color", "Tours Totales", "Tours Activos"];
        const csv = [
            headers.join(","),
            ...types.map((t) => [t.name, `"${(t.description ?? "").replace(/"/g, '""')}"`, t.color, t.count, t.activeTours].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tipos-tour-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    },
};
