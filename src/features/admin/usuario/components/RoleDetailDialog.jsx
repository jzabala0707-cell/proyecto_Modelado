import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { StatusBadge, roleActivoMap, userStatusMap } from "@/features/admin/components/StatusBadge";
import { Shield, Users, Calendar, BadgeCheck } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { userServices } from "../userServices";
export function RoleDetailDialog({ open, onOpenChange, role }) {
    if (!role) return null;
    const activo = typeof role.activo === "boolean" ? role.activo : role.status === "active";
    const permKeys = userServices.getPermissionKeysByIds(role.permisosIds ?? role.permisos_ids ?? []);
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Detalle del Rol</DialogTitle>
          <DialogDescription>Información completa y permisos asignados</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4 border-b">
          <div className="p-3 rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary"/>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{role.nombre}</h2>
            <p className="text-muted-foreground text-sm">{role.descripcion}</p>
            <div className="mt-2">
              {typeof role.activo === "boolean" ? (
                <StatusBadge status={role.activo} map={roleActivoMap}/>
              ) : (
                <StatusBadge status={role.status} map={userStatusMap}/>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <BadgeCheck className="h-4 w-4"/>
                <Label className="text-xs text-muted-foreground">Permisos</Label>
              </div>
              <div className="text-2xl font-bold">{permKeys.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Users className="h-4 w-4"/>
                <Label className="text-xs text-muted-foreground">Usuarios Asignados</Label>
              </div>
              <div className="text-2xl font-bold">{role.usuarios_asignados ?? role.usersCount ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Calendar className="h-4 w-4"/>
                <Label className="text-xs text-muted-foreground">Fecha Creación</Label>
              </div>
              <div className="text-lg font-semibold">{role.creado_en ?? role.createdAt ?? ""}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 py-2">
          <div>
            <Label className="text-xs text-muted-foreground">Nombre del Rol</Label>
            <Input disabled value={role.nombre} className="mt-1"/>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Descripción</Label>
            <Input disabled value={role.descripcion ?? ""} className="mt-1"/>
          </div>
        </div>

        <div className="space-y-2 py-2">
          <Label className="text-xs text-muted-foreground">
            Permisos ({permKeys.length} de 26)
          </Label>
          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto p-3 border rounded-lg bg-muted/30">
            {permKeys.map((perm) => (<Badge key={perm} variant="outline" className="bg-background">
                {perm}
              </Badge>))}
            {permKeys.length === 0 && (<span className="text-sm text-muted-foreground">Sin permisos asignados</span>)}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
