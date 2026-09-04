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

import { StatusBadge } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { mockCategoriasTour } from "../tourServices";
import { ESTADO_TOUR_OPTIONS } from "@/shared/constants/dbEnums";

const tourStatusMap = ESTADO_TOUR_OPTIONS.reduce((acc, opt) => {
    acc[opt.value] = { label: opt.label, variant: opt.value === "ACTIVO" ? "success" : opt.value === "INACTIVO" ? "destructive" : "secondary" };
    return acc;
}, {});

function getCategoriaNombre(id_categoria) {
    if (!id_categoria) return "—";
    const cat = mockCategoriasTour.find(
        (c) =>
            c.id_categoria === Number(id_categoria) ||
            c.id === Number(id_categoria)
    );
    return cat ? cat.nombre : "—";
}

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
                    <SortableHeader field="nombre">Nombre</SortableHeader>
                    <SortableHeader field="id_categoria">Categoría</SortableHeader>
                    <SortableHeader field="duracion_horas">Duración</SortableHeader>
                    <SortableHeader field="capacidad_maxima">Capacidad</SortableHeader>
                    <SortableHeader field="precio_base">Precio</SortableHeader>
                    <SortableHeader field="dificultad">Dificultad</SortableHeader>
                    <SortableHeader field="estado">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron tours" colSpan={9} />
                ) : (
                    items.map((tour) => {
                        const id = tour.id_tour ?? tour.id;
                        const nombre = tour.nombre ?? tour.name;
                        const id_categoria = tour.id_categoria;
                        const duracion = tour.duracion_horas ?? tour.duration;
                        const capacidad = tour.capacidad_maxima ?? tour.capacity;
                        const precio = tour.precio_base ?? tour.price;
                        const dificultad = tour.dificultad ?? "—";
                        const estado = tour.estado ?? tour.status;
                        const precioDisplay = Number(precio || 0);
                        return (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{nombre}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {tour.destino || ""}
                                    </div>
                                </TableCell>
                                <TableCell>{getCategoriaNombre(id_categoria)}</TableCell>
                                <TableCell>
                                    {duracion ? `${duracion} h` : "—"}
                                </TableCell>
                                <TableCell>{capacidad} pers.</TableCell>
                                <TableCell>${precioDisplay.toLocaleString()}</TableCell>
                                <TableCell>{dificultad}</TableCell>
                                <TableCell>
                                    <StatusBadge
                                        status={estado}
                                        map={tourStatusMap}
                                    />
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
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(tour)}
                                            style={{ color: "#c62828" }}
                                            title="Eliminar"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
