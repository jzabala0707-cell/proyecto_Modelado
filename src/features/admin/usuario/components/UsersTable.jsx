import { Eye, Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/shared/components/ui/table";
import { StatusBadge, userStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { userServices } from "../userServices";
export function UsersTable({ items, onDetail, onEdit, onDelete, onToggleStatus, sortField, onSort, getSortIcon, totalItems, }) {
    const SortableHeader = ({ field, children, }) => (<TableHead onClick={() => onSort(field)} className="cursor-pointer select-none">
      <div className="flex items-center">
        {children}
        {getSortIcon(field)}
      </div>
    </TableHead>);
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <SortableHeader field="name">Nombre</SortableHeader>
          <SortableHeader field="email">Email</SortableHeader>
          <TableHead>Teléfono</TableHead>
          <SortableHeader field="role">Rol</SortableHeader>
          <SortableHeader field="status">Estado</SortableHeader>
          <SortableHeader field="createdAt">Creación</SortableHeader>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (<EmptyState message="No se encontraron usuarios" colSpan={8}/>) : (items.map((user) => (<TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {userServices.getInitials(user.name)}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} map={userStatusMap}/>
              </TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onDetail(user)} style={{ color: "#ff9500" }}>
                    <Eye className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(user)} style={{ color: "#0d47a1" }}>
                    <Pencil className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onToggleStatus(user)} style={{ color: "#1b5e20" }}>
                    <Power className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(user)} style={{ color: "#c62828" }} title="Eliminar">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>)))}
      </TableBody>
    </Table>);
}
