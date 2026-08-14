import { Badge } from "@/shared/components/ui/badge";
export const bookingStatusMap = {
    confirmed: { label: "Confirmada", variant: "default" },
    pending: { label: "Pendiente", variant: "secondary" },
    cancelled: { label: "Cancelada", variant: "destructive" },
};
export const userStatusMap = {
    active: { label: "Activo", variant: "default" },
    inactive: { label: "Inactivo", variant: "secondary" },
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
    vip: { label: "VIP", variant: "default" },
    active: { label: "Activo", variant: "secondary" },
    inactive: { label: "Inactivo", variant: "outline" },
};
export function StatusBadge({ status, map }) {
    const config = map[status] ?? { label: status, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
}
