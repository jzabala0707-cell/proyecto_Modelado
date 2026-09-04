import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { StatusBadge, userStatusMap } from "@/features/admin/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { userServices } from "../userServices";
export function UserDetailDialog({ open, onOpenChange, user, }) {
    if (!user)
        return null;
    const fullName = userServices.getFullName(user);
    const initials = userServices.getInitials(user.nombre ?? user.firstName, user.apellido ?? user.lastName);
    const rolesLabel = userServices.getRolesLabel(user);
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle del Usuario</DialogTitle>
          <DialogDescription>Información completa del usuario</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4 border-b">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{fullName}</h2>
            <div className="flex flex-wrap gap-1 mt-1">
              {(user.roles || []).map((r) => (
                <Badge key={r.id} variant="secondary" className="text-xs">{r.nombre}</Badge>
              ))}
              {(!user.roles || user.roles.length === 0) && rolesLabel && (
                <Badge variant="secondary" className="text-xs">{rolesLabel}</Badge>
              )}
            </div>
            <div className="mt-2">
              <StatusBadge status={user.estado ?? user.status} map={userStatusMap}/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Nombre</Label>
            <Input disabled value={user.nombre ?? user.firstName ?? ""}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Apellido</Label>
            <Input disabled value={user.apellido ?? user.lastName ?? ""}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input disabled value={user.correo ?? user.email ?? ""}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Teléfono</Label>
            <Input disabled value={user.telefono ?? user.phone ?? ""}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Cargo</Label>
            <Input disabled value={user.cargo ?? "N/A"}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Departamento</Label>
            <Input disabled value={user.departamento ?? user.department ?? "N/A"}/>
          </div>
          <div className="space-y-1 col-span-2">
            <Label className="text-xs text-muted-foreground">Dirección</Label>
            <Input disabled value={user.direccion ?? user.address ?? "N/A"}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Fecha Creación</Label>
            <Input disabled value={user.creado_en ?? user.createdAt ?? ""}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Último Login</Label>
            <Input disabled value={user.ultimo_login ?? user.lastLogin ?? "N/A"}/>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
