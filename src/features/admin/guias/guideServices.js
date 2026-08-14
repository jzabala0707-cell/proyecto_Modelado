export const GUIDE_STATUS_OPTIONS = [
    { value: "all", label: "Todos los estados" },
    { value: "active", label: "Disponibles" },
    { value: "busy", label: "Ocupados" },
    { value: "inactive", label: "Inactivos" },
];
export const GUIDE_LANGUAGE_OPTIONS = [
    { value: "Español", label: "Español" },
    { value: "Inglés", label: "Inglés" },
    { value: "Francés", label: "Francés" },
    { value: "Portugués", label: "Portugués" },
];
export const GUIDE_SPECIALTY_OPTIONS = [
    { value: "Comuna 13", label: "Comuna 13" },
    { value: "Food Tour", label: "Food Tour" },
    { value: "City Tour", label: "City Tour" },
    { value: "Histórico", label: "Histórico" },
    { value: "Pablo Escobar", label: "Pablo Escobar" },
    { value: "Arte Urbano", label: "Arte Urbano" },
    { value: "Naturaleza", label: "Naturaleza" },
    { value: "Aventura", label: "Aventura" },
];
export const emptyGuideForm = {
    name: "",
    email: "",
    phone: "",
    status: "active",
    languages: [],
    specialties: [],
    address: "",
    bio: "",
    rating: 0,
    toursCount: 0,
    joinedAt: new Date().toISOString().split("T")[0],
};
export const mockGuides = [
    { id: 1, name: "Carlos Muñoz", email: "carlos.g@artetours.com", phone: "+57 300 111 2222", status: "active", toursCount: 156, rating: 4.9, joinedAt: "2023-03-15", languages: ["Español", "Inglés"], specialties: ["Comuna 13", "Histórico"], address: "Medellín, Colombia", bio: "Guía turístico con 5 años de experiencia." },
    { id: 2, name: "Luisa Fernanda Zuluaga", email: "luisa.z@artetours.com", phone: "+57 301 222 3333", status: "busy", toursCount: 138, rating: 4.8, joinedAt: "2023-04-20", languages: ["Español"], specialties: ["Food Tour"], address: "Medellín, Colombia", bio: "Apasionada por la comida local." },
    { id: 3, name: "Andrés Felipe Patiño", email: "andres.p@artetours.com", phone: "+57 302 333 4444", status: "active", toursCount: 92, rating: 4.7, joinedAt: "2023-05-10", languages: ["Español", "Inglés", "Francés"], specialties: ["City Tour"], address: "Medellín, Colombia", bio: "Historiador de profesión." },
    { id: 4, name: "Daniela Torres", email: "daniela.t@artetours.com", phone: "+57 303 444 5555", status: "inactive", toursCount: 45, rating: 4.6, joinedAt: "2023-06-01", languages: ["Español"], specialties: [], address: "Medellín, Colombia", bio: "En proceso de formación." },
    { id: 5, name: "José Gutiérrez", email: "jose.g@artetours.com", phone: "+57 304 555 6666", status: "active", toursCount: 201, rating: 4.9, joinedAt: "2023-01-12", languages: ["Español", "Inglés"], specialties: ["Pablo Escobar"], address: "Medellín, Colombia", bio: "El guía más experimentado del equipo." },
];
export const guideServices = {
    computeStats(guides, filteredCount) {
        return {
            total: guides.length,
            available: guides.filter((g) => g.status === "active").length,
            busy: guides.filter((g) => g.status === "busy").length,
            inactive: guides.filter((g) => g.status === "inactive").length,
            avgRating: guides.length > 0
                ? (guides.reduce((sum, g) => sum + g.rating, 0) / guides.length).toFixed(1)
                : "0.0",
            filtered: filteredCount,
        };
    },
    stars(rating) {
        return { filled: Math.round(rating), empty: 5 - Math.round(rating) };
    },
    exportCSV(guides) {
        const headers = ["ID", "Nombre", "Email", "Teléfono", "Estado", "Tours", "Rating", "Idiomas", "Especialidades", "FechaIngreso"];
        const csv = [
            headers.join(","),
            ...guides.map((g) => [
                g.id,
                g.name,
                g.email,
                g.phone,
                g.status,
                g.toursCount,
                g.rating,
                `"${(g.languages ?? []).join("; ")}"`,
                `"${(g.specialties ?? []).join("; ")}"`,
                g.joinedAt,
            ].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `guias-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    },
};
