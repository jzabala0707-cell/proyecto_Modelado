import { Shield, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ALL_PERMISSIONS, userServices } from "../userServices";
export function RolesList({ roles }) {
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roles.map((role) => (<Card key={role.id} className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary"/>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4"/>
                {role.usuarios_asignados ?? role.usersCount} usuarios
              </div>
            </div>
            <CardTitle className="mt-2">{role.nombre}</CardTitle>
            <CardDescription>{role.descripcion}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {userServices.getPermissionKeysByIds(role.permisosIds ?? role.permisos_ids ?? []).slice(0, 6).map((perm) => (<span key={perm} className="px-2 py-1 bg-muted text-xs rounded-full">
                  {perm}
                </span>))}
              {(role.permisosIds ?? role.permisos_ids ?? []).length > 6 && (<span className="px-2 py-1 bg-muted text-xs rounded-full">
                  +{(role.permisosIds ?? role.permisos_ids ?? []).length - 6} más
                </span>)}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Editar
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}
export function PermissionsGrid({ selected, onToggle }) {
    const selectedIds = selected || [];
    return (<div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
      {ALL_PERMISSIONS.map((perm) => {
            const isActive = selectedIds.includes(perm.id);
            return (<div key={perm.id} onClick={() => onToggle(perm.id)} className={`cursor-pointer rounded-lg border p-3 text-sm transition ${isActive
                    ? "bg-primary/10 border-primary"
                    : "bg-muted/40 hover:bg-muted"}`}>
            <div className="font-medium">{perm.key}</div>
            <div className="text-xs text-muted-foreground">{perm.label}</div>
          </div>);
        })}
    </div>);
}
