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
import { mockTours } from "../tourServices";
import { mockGuides } from "@/features/admin/guias/guideServices";

const salidaStatusMap = {
    PROGRAMADA: { label: "Programada", variant: "secondary" },
    DISPONIBLE: { label: "Disponible", variant: "default" },
    COMPLETA: { label: "Completa", variant: "outline" },
    CANCELADA: { label: "Cancelada", variant: "destructive" },
    FINALIZADA: { label: "Finalizada", variant: "outline" },
};

function tourName(id_tour) {
    const t = mockTours.find((x) => String(x.id_tour ?? x.id) === String(id_tour));
    return t?.nombre ?? t?.name ?? "—";
}
function guideName(id_guia) {
    if (!id_guia) return "Sin asignar";
    const g = mockGuides.find((x) => String(x.id_guia ?? x.id) === String(id_guia));
    return g?.name ?? (g ? `${g.nombre ?? ""} ${g.apellido ?? ""}`.trim() : "—");
}

export function GroupsTableFull({
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
                    <SortableHeader field="id_salida">ID</SortableHeader>
                    <SortableHeader field="id_tour">Tour</SortableHeader>
                    <SortableHeader field="id_guia">Guía</SortableHeader>
                    <SortableHeader field="fecha_salida">Fecha</SortableHeader>
                    <SortableHeader field="hora_salida">Hora</SortableHeader>
                    <SortableHeader field="cupo_maximo">Cupos</SortableHeader>
                    <SortableHeader field="estado">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron salidas" colSpan={8} />
                ) : (
                    items.map((s) => {
                        const disp = s.cupos_disponibles ?? s.cupo_maximo;
                        const max = s.cupo_maximo ?? 0;
                        const pct = max > 0 ? Math.round(((max - disp) / max) * 100) : 0;
                        return (
                            <TableRow key={s.id_salida ?? s.id}>
                                <TableCell className="font-mono text-xs">
                                    #{s.id_salida ?? s.id}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {tourName(s.id_tour ?? s.tourId ?? s.tour)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {guideName(s.id_guia ?? s.guideId ?? s.guide)}
                                </TableCell>
                                <TableCell>{s.fecha_salida ?? s.date}</TableCell>
                                <TableCell>
                                    {s.hora_salida ?? s.startTime}
                                    {s.hora_finalizacion ? (
                                        <span className="text-xs text-muted-foreground">
                                            {" "}– {s.hora_finalizacion}
                                        </span>
                                    ) : null}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-sm">
                                            {disp}/{max}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Ocupación {pct}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge
                                        status={s.estado ?? s.status}
                                        map={salidaStatusMap}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {onDetail && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDetail(s)}
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
                                                onClick={() => onEdit(s)}
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
                                                onClick={() => onDelete(s)}
                                                style={{ color: "#c62828" }}
                                                title="Eliminar"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
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
