import { Eye, Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";

import { StatusBadge, roleActivoMap, userStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Badge } from "@/shared/components/ui/badge";
import { userServices } from "../userServices";
export function RolesTableFull({ items, onDetail, onEdit, onDelete, onToggleStatus, sortField, onSort, getSortIcon, totalItems, }) {
    const SortableHeader = ({ field, children }) => (<TableHead onClick={() => onSort(field)} className="cursor-pointer select-none">
        <div className="flex items-center">
            {children}
            {getSortIcon(field)}
        </div>
    </TableHead>);
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <SortableHeader field="nombre">Nombre Rol</SortableHeader>
          <TableHead>Descripción</TableHead>
          <TableHead>Permisos</TableHead>
          <SortableHeader field="usuarios_asignados">Usuarios Asignados</SortableHeader>
          <SortableHeader field="activo">Estado</SortableHeader>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (<EmptyState message="No se encontraron roles" colSpan={7}/>) : (items.map((role) => {
            const activo = typeof role.activo === "boolean" ? role.activo : role.status === "active";
            const permKeys = userServices.getPermissionKeysByIds(role.permisosIds ?? role.permisos_ids ?? []);
            return (<TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>
                <div className="font-medium">{role.nombre}</div>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[240px] truncate">
                {role.descripcion}
              </TableCell>
              <TableCell>
                <Badge variant={permKeys.length >= 10 ? "default" : "secondary"}>
                  {permKeys.length} permisos
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{role.usuarios_asignados ?? role.usersCount ?? 0}</span>
                  <span className="text-xs text-muted-foreground">usuarios</span>
                </div>
              </TableCell>
              <TableCell>
                {typeof role.activo === "boolean" ? (
                  <StatusBadge status={role.activo} map={roleActivoMap}/>
                ) : (
                  <StatusBadge status={role.status} map={userStatusMap}/>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onDetail(role)} style={{ color: "#ff9500" }}>
                    <Eye className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(role)} style={{ color: "#0d47a1" }}>
                    <Pencil className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onToggleStatus(role)} style={{ color: "#1b5e20" }} title={activo ? "Desactivar" : "Activar"}>
                    <Power className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(role)} style={{ color: "#c62828" }} title="Eliminar">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>);
        }))}
      </TableBody>
    </Table>);
}
