import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/shared/components/ui/form";
import { PermissionsGrid } from "./RolesList";
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

    const handleSubmit = form.handleSubmit((datos) => {
        onSubmit(datos);
    });

    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Rol" : "Crear Nuevo Rol"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Actualiza nombre, descripción y permisos" : "Define el nombre y los permisos del rol"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-0">
            <div className="grid grid-cols-1 gap-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Rol</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Supervisor" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, name: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Descripción del rol" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, description: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setFormData({ ...formData, status: value });
                    }} value={field.value ?? "active"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permisos ({formData.permissions.length} seleccionados)</FormLabel>
                    <FormControl>
                      <PermissionsGrid 
                        selected={field.value} 
                        onToggle={(perm) => {
                          onTogglePermission(perm);
                          const newPermissions = field.value.includes(perm)
                            ? field.value.filter(p => p !== perm)
                            : [...field.value, perm];
                          field.onChange(newPermissions);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear Rol</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>);
}
