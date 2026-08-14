import { Eye, Pencil, Trash2, Power, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { StatusBadge, guideStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { guideServices } from "../guideServices";

export function GuidesTableFull({
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
                    <SortableHeader field="email">Email</SortableHeader>
                    <SortableHeader field="toursCount">Tours</SortableHeader>
                    <SortableHeader field="rating">Rating</SortableHeader>
                    <SortableHeader field="status">Estado</SortableHeader>
                    <SortableHeader field="joinedAt">Ingreso</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron guías" colSpan={8} />
                ) : (
                    items.map((guide) => {
                        const stars = guideServices.stars(guide.rating);
                        return (
                            <TableRow key={guide.id}>
                                <TableCell>{guide.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{guide.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {(guide.languages ?? []).join(", ") || "Sin idiomas"}
                                    </div>
                                </TableCell>
                                <TableCell>{guide.email}</TableCell>
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
                                    <StatusBadge status={guide.status} map={guideStatusMap} />
                                </TableCell>
                                <TableCell>{guide.joinedAt}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDetail(guide)}
                                            style={{ color: "#ff9500" }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(guide)}
                                            style={{ color: "#0d47a1" }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onToggleStatus(guide)}
                                            style={{ color: "#1b5e20" }}
                                        >
                                            <Power className="h-4 w-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(guide)}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
