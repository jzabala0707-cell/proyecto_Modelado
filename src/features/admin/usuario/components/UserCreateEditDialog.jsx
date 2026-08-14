import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { USER_ROLE_OPTIONS } from "../userServices";
export function UserCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false, }) {
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Actualiza la información del usuario" : "Ingresa los datos del nuevo usuario"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Nombre Completo</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Juan Pérez"/>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="juan@ejemplo.com"/>
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+57 300 123 4567"/>
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol"/>
              </SelectTrigger>
              <SelectContent>
                {USER_ROLE_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Departamento</Label>
            <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="Administración"/>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Dirección</Label>
            <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Medellín, Colombia"/>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit}>{isEdit ? "Guardar Cambios" : "Crear Usuario"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
