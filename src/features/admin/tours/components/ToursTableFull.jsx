import { Eye, Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { StatusBadge, userStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Star } from "lucide-react";

export function ToursTableFull({
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
                    <TableHead>ID</TableHead>
                    <SortableHeader field="name">Nombre</SortableHeader>
                    <SortableHeader field="type">Tipo</SortableHeader>
                    <SortableHeader field="duration">Duración</SortableHeader>
                    <SortableHeader field="capacity">Capacidad</SortableHeader>
                    <SortableHeader field="price">Precio</SortableHeader>
                    <SortableHeader field="rating">Rating</SortableHeader>
                    <SortableHeader field="status">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron tours" colSpan={9} />
                ) : (
                    items.map((tour) => (
                        <TableRow key={tour.id}>
                            <TableCell>{tour.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{tour.name}</div>
                                <div className="text-xs text-muted-foreground">{tour.type}</div>
                            </TableCell>
                            <TableCell>{tour.type}</TableCell>
                            <TableCell>{tour.duration}</TableCell>
                            <TableCell>{tour.capacity} pers.</TableCell>
                            <TableCell>${tour.price.toLocaleString()}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-warning fill-warning" />
                                    <span>{tour.rating}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={tour.status} map={userStatusMap} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDetail(tour)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(tour)}
                                        style={{ color: "#0d47a1" }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onToggleStatus(tour)}
                                        style={{ color: "#1b5e20" }}
                                    >
                                        <Power className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onDelete(tour)} style={{ color: "#c62828" }} title="Eliminar">
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
