import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { StatusBadge } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";

const activoMap = {
    true: { label: "Activa", variant: "default" },
    false: { label: "Inactiva", variant: "secondary" },
};

export function TourTypesTableFull({
    items,
    onDetail,
    onEdit,
    onDelete,
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
                    <SortableHeader field="id_categoria">ID</SortableHeader>
                    <SortableHeader field="nombre">Categoría</SortableHeader>
                    <SortableHeader field="color">Color</SortableHeader>
                    <SortableHeader field="activo">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState
                        message="No se encontraron categorías de tour"
                        colSpan={5}
                    />
                ) : (
                    items.map((c) => (
                        <TableRow key={c.id_categoria ?? c.id}>
                            <TableCell className="font-mono text-xs">
                                #{c.id_categoria ?? c.id}
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">
                                    {c.nombre ?? c.name}
                                </div>
                                <div className="text-xs text-muted-foreground line-clamp-1">
                                    {c.descripcion ?? c.description ?? ""}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="inline-block h-3 w-3 rounded-full border"
                                        style={{
                                            backgroundColor:
                                                c.color ?? "transparent",
                                        }}
                                    />
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {c.color ?? "—"}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge
                                    status={
                                        c.activo !== undefined
                                            ? String(c.activo)
                                            : c.active !== undefined
                                              ? String(c.active)
                                              : "true"
                                    }
                                    map={activoMap}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {onDetail && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDetail(c)}
                                            style={{ color: "#ff9500" }}
                                            title="Ver detalle"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(c)}
                                            style={{ color: "#0d47a1" }}
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(c)}
                                            style={{ color: "#c62828" }}
                                            title="Eliminar"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
