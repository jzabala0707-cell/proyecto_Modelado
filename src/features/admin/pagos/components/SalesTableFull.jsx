import { Eye, Pencil, Power, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { StatusBadge, paymentStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";

export function SalesTableFull({
    items,
    onDetail,
    onEdit,
    onDelete,
    onMarkAsPaid,
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
                    <SortableHeader field="invoice">Factura</SortableHeader>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tour</TableHead>
                    <SortableHeader field="date">Fecha</SortableHeader>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Total</TableHead>
                    <SortableHeader field="status">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron ventas" colSpan={9} />
                ) : (
                    items.map((s) => (
                        <TableRow key={s.id}>
                            <TableCell className="font-mono text-primary">{s.invoice}</TableCell>
                            <TableCell>{s.client}</TableCell>
                            <TableCell>{s.tour}</TableCell>
                            <TableCell>{s.date}</TableCell>
                            <TableCell>${s.subtotal.toLocaleString()}</TableCell>
                            <TableCell>${s.discount.toLocaleString()}</TableCell>
                            <TableCell className="font-semibold">${s.total.toLocaleString()}</TableCell>
                            <TableCell>
                                <StatusBadge status={s.status} map={paymentStatusMap} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDetail(s)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(s)}
                                        style={{ color: "#0d47a1" }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onMarkAsPaid(s)}
                                        style={{ color: "#1b5e20" }}
                                        disabled={s.status === "paid"}
                                        title={s.status === "paid" ? "Ya está pagada" : "Marcar como pagada"}
                                    >
                                        <Power className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onDelete(s)} style={{ color: "#c62828" }} title="Eliminar">
                                        <Trash2 className="h-4 w-4"/>
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
