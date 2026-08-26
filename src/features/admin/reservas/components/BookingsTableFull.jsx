import { Eye, Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";

import { StatusBadge, bookingStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
export function BookingsTableFull({
    items,
    onDetail,
    onEdit,
    onDelete,
    onToggleStatus,
    sortField,
    onSort,
    getSortIcon,
    totalItems,
}) {
    const SortableHeader = ({ field, children }) => (
        <TableHead onClick={() => onSort(field)} className="cursor-pointer select-none">
            <div className="flex items-center">
                {children}
                {getSortIcon(field)}
            </div>
        </TableHead>
    );
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <SortableHeader field="id">ID</SortableHeader>
                    <SortableHeader field="customer">Cliente</SortableHeader>
                    <TableHead>Tour</TableHead>
                    <SortableHeader field="date">Fecha / Hora</SortableHeader>
                    <TableHead>Personas</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron reservas" colSpan={8} />
                ) : (
                    items.map((b) => (
                        <TableRow key={b.id}>
                            <TableCell className="font-mono">#{b.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{b.customer}</div>
                                <div className="text-xs text-muted-foreground">{b.phone}</div>
                            </TableCell>
                            <TableCell>{b.tour}</TableCell>
                            <TableCell>
                                <div>{b.date}</div>
                                <div className="text-xs text-muted-foreground">{b.time}</div>
                            </TableCell>
                            <TableCell>{b.people}</TableCell>
                            <TableCell className="font-semibold">${b.total.toLocaleString()}</TableCell>
                            <TableCell>
                                <StatusBadge status={b.status} map={bookingStatusMap} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => onDetail(b)} style={{ color: "#ff9500" }}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onEdit(b)} style={{ color: "#0d47a1" }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onToggleStatus(b)} style={{ color: "#1b5e20" }}>
                                        <Power className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(b)}
                                        style={{ color: "#c62828" }}
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
