import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { StatusBadge, userStatusMap } from "@/features/admin/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { userServices } from "../userServices";
export function UserDetailDialog({ open, onOpenChange, user, }) {
    if (!user)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle del Usuario</DialogTitle>
          <DialogDescription>Información completa del usuario</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4 border-b">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{userServices.getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
            <StatusBadge status={user.status} map={userStatusMap}/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input disabled value={user.email}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Teléfono</Label>
            <Input disabled value={user.phone}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Fecha Creación</Label>
            <Input disabled value={user.createdAt}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Último Login</Label>
            <Input disabled value={user.lastLogin ?? "N/A"}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Departamento</Label>
            <Input disabled value={user.department ?? "N/A"}/>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Dirección</Label>
            <Input disabled value={user.address ?? "N/A"}/>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
