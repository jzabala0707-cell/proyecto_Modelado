import { Badge } from "@/shared/components/ui/badge";
export const bookingStatusMap = {
    CONFIRMADA: { label: "Confirmada", variant: "default" },
    PENDIENTE: { label: "Pendiente", variant: "secondary" },
    CANCELADA: { label: "Cancelada", variant: "destructive" },
    COMPLETADA: { label: "Completada", variant: "success" },
    confirmed: { label: "Confirmada", variant: "default" },
    pending: { label: "Pendiente", variant: "secondary" },
    cancelled: { label: "Cancelada", variant: "destructive" },
};
export const userStatusMap = {
    ACTIVO: { label: "Activo", variant: "default" },
    INACTIVO: { label: "Inactivo", variant: "secondary" },
    BLOQUEADO: { label: "Bloqueado", variant: "destructive" },
    active: { label: "Activo", variant: "default" },
    inactive: { label: "Inactivo", variant: "secondary" },
};
export const estadoUsuarioMap = userStatusMap;
export const roleActivoMap = {
    true: { label: "Activo", variant: "default" },
    false: { label: "Inactivo", variant: "secondary" },
};
export const guideStatusMap = {
    active: { label: "Disponible", variant: "default" },
    busy: { label: "Ocupado", variant: "secondary" },
    inactive: { label: "Inactivo", variant: "outline" },
};
export const paymentStatusMap = {
    paid: { label: "Pagado", variant: "default" },
    completed: { label: "Completado", variant: "default" },
    pending: { label: "Pendiente", variant: "secondary" },
    partial: { label: "Parcial", variant: "outline" },
};
export const groupStatusMap = {
    confirmed: { label: "Confirmado", variant: "default" },
    pending: { label: "Pendiente", variant: "secondary" },
    completed: { label: "Completado", variant: "outline" },
    cancelled: { label: "Cancelado", variant: "destructive" },
};
export const clientStatusMap = {
    ACTIVO: { label: "Activo", variant: "default" },
    INACTIVO: { label: "Inactivo", variant: "outline" },
    BLOQUEADO: { label: "Bloqueado", variant: "destructive" },
    vip: { label: "VIP", variant: "default" },
    active: { label: "Activo", variant: "secondary" },
    inactive: { label: "Inactivo", variant: "outline" },
};
export function StatusBadge({ status, map }) {
    const key = typeof status === "boolean" ? String(status) : status;
    const config = map[key] ?? { label: status, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
}
