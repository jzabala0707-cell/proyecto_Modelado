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

export function PaymentsTableFull({
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
                    <TableHead>Factura</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tour</TableHead>
                    <SortableHeader field="date">Fecha Pago</SortableHeader>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <SortableHeader field="status">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron abonos" colSpan={8} />
                ) : (
                    items.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell className="font-mono text-primary">{p.invoice}</TableCell>
                            <TableCell>{p.client}</TableCell>
                            <TableCell>{p.tour}</TableCell>
                            <TableCell>{p.date}</TableCell>
                            <TableCell>{p.method}</TableCell>
                            <TableCell className="font-semibold">
                                ${(p.amount ?? 0).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={p.status} map={paymentStatusMap} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDetail(p)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(p)}
                                        style={{ color: "#0d47a1" }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onToggleStatus(p)}
                                        style={{ color: "#1b5e20" }}
                                        title={
                                            p.status === "completed"
                                                ? "Marcar como pendiente"
                                                : "Marcar como completado"
                                        }
                                    >
                                        <Power className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onDelete(p)} style={{ color: "#c62828" }} title="Eliminar">
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
