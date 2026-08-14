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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { StatusBadge, groupStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";

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
                    <SortableHeader field="tourName">Tour</SortableHeader>
                    <SortableHeader field="groupName">Grupo</SortableHeader>
                    <SortableHeader field="guideName">Guía</SortableHeader>
                    <SortableHeader field="date">Fecha</SortableHeader>
                    <SortableHeader field="startTime">Hora</SortableHeader>
                    <SortableHeader field="participants">Participantes</SortableHeader>
                    <SortableHeader field="status">Estado</SortableHeader>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron grupos" colSpan={8} />
                ) : (
                    items.map((group) => (
                        <TableRow key={group.id}>
                            <TableCell>
                                <div className="font-medium">{group.tourName}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{group.groupName}</div>
                            </TableCell>
                            <TableCell>{group.guideName}</TableCell>
                            <TableCell>{group.date}</TableCell>
                            <TableCell>{group.startTime}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {group.participants.length}/{group.maxCapacity}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        ({Math.round((group.participants.length / group.maxCapacity) * 100)}%)
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={group.status} map={groupStatusMap} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDetail(group)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(group)}
                                        style={{ color: "#0d47a1" }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    {(group.status === "pending" || group.status === "confirmed") && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onToggleStatus(group)}
                                            style={{ color: "#1b5e20" }}
                                            title={group.status === "pending" ? "Confirmar" : "Marcar pendiente"}
                                        >
                                            <Power className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => onDelete(group)}
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
                    ))
                )}
            </TableBody>
        </Table>
    );
}
