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

import { EmptyState } from "@/features/admin/components/EmptyState";

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
                    <SortableHeader field="name">Tipo</SortableHeader>
                    <SortableHeader field="color">Color</SortableHeader>
                    <SortableHeader field="count">Tours Totales</SortableHeader>
                    <SortableHeader field="activeTours">Tours Activos</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron tipos de tour" colSpan={5} />
                ) : (
                    items.map((type) => (
                        <TableRow key={type.id}>
                            <TableCell>
                                <div className="font-medium">{type.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">
                                    {type.description}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="inline-block h-3 w-3 rounded-full border"
                                        style={{ backgroundColor: type.color }}
                                    />
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {type.color}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>{type.count}</TableCell>
                            <TableCell>{type.activeTours}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDetail(type)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(type)}
                                        style={{ color: "#0d47a1" }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(type)}
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
