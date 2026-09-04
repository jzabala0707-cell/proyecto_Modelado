import { Eye, Pencil, Trash2, Power, Star, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { StatusBadge, estadoUsuarioMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { guideServices, IDIOMA_OPTIONS } from "../guideServices";

export function GuidesTableFull({
    items,
    onDetail,
    onEdit,
    onDelete,
    onToggleActivo,
    onToggleDisponibilidad,
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

    const obtenerIdiomas = (guia) => {
        return (guia.idiomas ?? [])
            .map((i) => {
                const nombre = IDIOMA_OPTIONS.find((o) => o.value === i.id_idioma)?.label ?? "";
                return nombre ? `${nombre} (${i.nivel ?? ""})` : "";
            })
            .filter(Boolean)
            .join(", ");
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <SortableHeader field="firstName">Nombre</SortableHeader>
                    <SortableHeader field="correo">Email</SortableHeader>
                    <SortableHeader field="especialidad">Especialidad</SortableHeader>
                    <SortableHeader field="toursCount">Tours</SortableHeader>
                    <SortableHeader field="rating">Rating</SortableHeader>
                    <SortableHeader field="estado">Estado</SortableHeader>
                    <SortableHeader field="disponibilidad">Disp.</SortableHeader>
                    <SortableHeader field="activo">Activo</SortableHeader>
                    <SortableHeader field="joinedAt">Ingreso</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron guías" colSpan={11} />
                ) : (
                    items.map((guide) => {
                        const stars = guideServices.stars(guide.rating);
                        const id = guide.id_guia ?? guide.id_usuario;
                        return (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {(guide.firstName ?? "") +
                                            " " +
                                            (guide.lastName ?? "")}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {obtenerIdiomas(guide) || "Sin idiomas"}
                                    </div>
                                </TableCell>
                                <TableCell>{guide.correo}</TableCell>
                                <TableCell className="max-w-[220px] truncate">
                                    {guide.especialidad || "—"}
                                </TableCell>
                                <TableCell>{guide.toursCount}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-warning fill-warning" />
                                        <span className="font-semibold">{guide.rating}</span>
                                        <span className="text-xs text-muted-foreground">
                                            ({stars.filled}/5)
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge
                                        status={guide.estado}
                                        map={estadoUsuarioMap}
                                    />
                                </TableCell>
                                <TableCell>
                                    {guide.disponibilidad ? (
                                        <div className="flex items-center gap-1 text-success text-xs font-medium">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Sí
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
                                            <XCircle className="h-4 w-4" />
                                            No
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {guide.activo ? (
                                        <div className="flex items-center gap-1 text-success text-xs font-medium">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Sí
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-destructive text-xs font-medium">
                                            <XCircle className="h-4 w-4" />
                                            No
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{guide.joinedAt}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDetail(guide)}
                                            style={{ color: "#ff9500" }}
                                            title="Ver detalle"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(guide)}
                                            style={{ color: "#0d47a1" }}
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onToggleDisponibilidad(guide)}
                                            style={{ color: "#1b5e20" }}
                                            title="Alternar disponibilidad"
                                        >
                                            <Power className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onToggleActivo(guide)}
                                            style={{ color: "#6a1b9a" }}
                                            title="Alternar activo/inactivo"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(guide)}
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
