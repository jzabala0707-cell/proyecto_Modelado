export const USER_ROLE_OPTIONS = [
    { value: "Admin", label: "Administrador" },
    { value: "Guía", label: "Guía" },
    { value: "Recepcionista", label: "Recepcionista" },
];
export const USER_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Activos" },
    { value: "inactive", label: "Inactivos" },
];
export const DEPARTMENT_OPTIONS = [
    { value: "Administración", label: "Administración" },
    { value: "Operaciones", label: "Operaciones" },
    { value: "Ventas", label: "Ventas" },
];
export const ALL_PERMISSIONS = [
    "users.view", "users.create", "users.edit", "users.delete",
    "roles.view", "roles.create", "roles.edit", "roles.delete",
    "tours.view", "tours.create", "tours.edit", "tours.delete",
    "bookings.view", "bookings.create", "bookings.edit", "bookings.delete",
    "clients.view", "clients.create", "clients.edit", "clients.delete",
    "sales.view", "sales.create", "sales.edit", "sales.delete",
    "reports.view", "reports.export",
];
export const mockUsers = [
    { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com", phone: "+57 300 123 4567", role: "Admin", status: "active", createdAt: "2024-01-15", lastLogin: "2026-06-03 09:30", department: "Administración", address: "Medellín, Colombia" },
    { id: 2, name: "María González", email: "maria@ejemplo.com", phone: "+57 301 234 5678", role: "Guía", status: "active", createdAt: "2024-02-20", lastLogin: "2026-06-02 14:20", department: "Operaciones", address: "Medellín, Colombia" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos@ejemplo.com", phone: "+57 302 345 6789", role: "Recepcionista", status: "inactive", createdAt: "2024-03-10", lastLogin: "2026-05-28 10:15", department: "Ventas", address: "Medellín, Colombia" },
    { id: 4, name: "Ana Martínez", email: "ana@ejemplo.com", phone: "+57 303 456 7890", role: "Guía", status: "active", createdAt: "2024-04-05", lastLogin: "2026-06-03 08:45", department: "Operaciones", address: "Medellín, Colombia" },
    { id: 5, name: "Luis Sánchez", email: "luis@ejemplo.com", phone: "+57 304 567 8901", role: "Admin", status: "active", createdAt: "2024-05-12", lastLogin: "2026-06-03 11:00", department: "Administración", address: "Medellín, Colombia" },
    { id: 6, name: "Patricia López", email: "patricia@ejemplo.com", phone: "+57 305 678 9012", role: "Recepcionista", status: "active", createdAt: "2024-06-18", lastLogin: "2026-06-02 16:30", department: "Ventas", address: "Medellín, Colombia" },
    { id: 7, name: "Roberto Díaz", email: "roberto@ejemplo.com", phone: "+57 306 789 0123", role: "Guía", status: "active", createdAt: "2024-07-22", lastLogin: "2026-06-01 12:00", department: "Operaciones", address: "Medellín, Colombia" },
    { id: 8, name: "Sandra Torres", email: "sandra@ejemplo.com", phone: "+57 307 890 1234", role: "Recepcionista", status: "inactive", createdAt: "2024-08-30", lastLogin: "2026-05-20 09:00", department: "Ventas", address: "Medellín, Colombia" },
];
export const mockRoles = [
    {
        id: 1,
        name: "Administrador",
        description: "Acceso total al sistema",
        permissions: ALL_PERMISSIONS,
        usersCount: 2,
        status: "active",
        createdAt: "2024-01-10",
    },
    {
        id: 2,
        name: "Guía",
        description: "Gestión de tours y grupos asignados",
        permissions: ["tours.view", "bookings.view", "clients.view"],
        usersCount: 5,
        status: "active",
        createdAt: "2024-02-15",
    },
    {
        id: 3,
        name: "Recepcionista",
        description: "Gestión de reservas y clientes",
        permissions: ["bookings.view", "bookings.create", "bookings.edit", "clients.view", "clients.create"],
        usersCount: 3,
        status: "active",
        createdAt: "2024-03-20",
    },
];
export const emptyUserForm = {
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    department: "",
    address: "",
};
export const emptyRoleForm = {
    name: "",
    description: "",
    permissions: [],
};
export const userServices = {
    getInitials(name) {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase();
    },
    computeStats(users, filteredCount) {
        return {
            total: users.length,
            active: users.filter((u) => u.status === "active").length,
            inactive: users.filter((u) => u.status === "inactive").length,
            filtered: filteredCount,
        };
    },
    roleStats(roles) {
        return {
            total: roles.length,
            active: roles.filter((r) => r.status === "active").length,
            assignedUsers: roles.reduce((sum, r) => sum + r.usersCount, 0),
        };
    },
    exportCSV(users) {
        const headers = ["ID", "Nombre", "Email", "Teléfono", "Rol", "Estado", "Departamento", "Fecha Creación"];
        const csv = [
            headers.join(","),
            ...users.map((user) => [user.id, user.name, user.email, user.phone, user.role, user.status, user.department, user.createdAt].join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `usuarios-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    },
};
