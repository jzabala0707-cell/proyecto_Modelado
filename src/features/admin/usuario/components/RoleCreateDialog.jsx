import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Switch } from "@/shared/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/shared/components/ui/form";
import { PermissionsTable } from "./RolesList";
import { roleSchema } from "../validations/userValidation";

export function RoleCreateDialog({ open, onOpenChange, formData, setFormData, onTogglePermission, onSubmit, isEdit = false, }) {
    const form = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: formData,
        mode: "onSubmit",
    });

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = form.handleSubmit((data) => {
        const payload = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            activo: data.activo,
            permisos_ids: data.permisosIds,
        };
        onSubmit(payload);
    });

    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] flex flex-col p-0 gap-0">
        <div className="px-6 py-4 border-b">
          <DialogHeader className="text-left">
            <DialogTitle>{isEdit ? "Editar Rol" : "Crear Nuevo Rol"}</DialogTitle>
            <DialogDescription>
              {isEdit ? "Actualiza nombre, descripción y permisos" : "Define el nombre y los permisos del rol"}
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Rol</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ej: Supervisor" onChange={(e) => {
                            field.onChange(e);
                            setFormData({ ...formData, nombre: e.target.value });
                          }}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="activo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3 h-10 px-3 border rounded-md bg-muted/20">
                            <Switch
                              checked={field.value ?? true}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setFormData({ ...formData, activo: checked });
                              }}
                            />
                            <span className="text-sm">
                              {(field.value ?? true) ? "Rol Activo" : "Rol Inactivo"}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} placeholder="Descripción del rol" onChange={(e) => {
                          field.onChange(e);
                          setFormData({ ...formData, descripcion: e.target.value });
                        }}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permisosIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permisos ({(field.value || []).length} seleccionados)</FormLabel>
                      <FormControl>
                        <div className="border rounded-lg bg-muted/10 overflow-hidden">
                          <PermissionsTable
                            selected={field.value || []}
                            onToggle={(permId) => {
                              onTogglePermission(permId);
                              const currentIds = field.value || [];
                              const newIds = currentIds.includes(permId)
                                ? currentIds.filter((id) => id !== permId)
                                : [...currentIds, permId];
                              field.onChange(newIds);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-background">
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{isEdit ? "Guardar Cambios" : "Crear Rol"}</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>);
}
