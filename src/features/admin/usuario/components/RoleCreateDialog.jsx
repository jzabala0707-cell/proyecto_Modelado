import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { PermissionsGrid } from "./RolesList";
export function RoleCreateDialog({ open, onOpenChange, formData, setFormData, onTogglePermission, onSubmit, }) {
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
          <DialogDescription>
            Define el nombre y los permisos del rol
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-2">
          <div className="space-y-2">
            <Label>Nombre del Rol</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej: Supervisor"/>
          </div>
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Descripción del rol"/>
          </div>
          <div className="space-y-2">
            <Label>Permisos ({formData.permissions.length} seleccionados)</Label>
            <PermissionsGrid selected={formData.permissions} onToggle={onTogglePermission}/>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit}>Crear Rol</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
