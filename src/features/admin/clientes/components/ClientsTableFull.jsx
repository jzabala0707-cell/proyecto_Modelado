import { Eye, Pencil, Trash2, Power, Crown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { StatusBadge, clientStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { clientServices } from "@/features/admin/reservas/bookingServices";
export function ClientsTableFull({
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
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>VIP</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Gasto Total</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <EmptyState message="No se encontraron clientes" colSpan={9} />
                ) : (
                    items.map((c) => (
                        <TableRow key={c.id}>
                            <TableCell>{c.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {clientServices.initials(c.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{c.name}</div>
                                        <div className="text-xs text-muted-foreground">{c.nationality}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{c.email}</TableCell>
                            <TableCell>{c.phone}</TableCell>
                            <TableCell>
                                {(c.vip || c.status === "vip") ? (
                                    <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
                                        <Crown className="h-3 w-3 mr-1" /> VIP
                                    </Badge>
                                ) : (
                                    <span className="text-muted-foreground text-xs">—</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={c.status} map={clientStatusMap} />
                            </TableCell>
                            <TableCell>{c.bookings}</TableCell>
                            <TableCell className="font-semibold">${c.totalSpent.toLocaleString()}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => onDetail(c)} style={{ color: "#ff9500" }}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onEdit(c)} style={{ color: "#0d47a1" }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onToggleStatus(c)} style={{ color: "#1b5e20" }}>
                                        <Power className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onDelete(c)} className="text-destructive">
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
