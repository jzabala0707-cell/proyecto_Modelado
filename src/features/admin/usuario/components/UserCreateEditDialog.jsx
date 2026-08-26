import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/shared/components/ui/form";
import { USER_ROLE_OPTIONS, DEPARTMENT_OPTIONS } from "../userServices";
import { userCreateSchema, userEditSchema } from "../validations/userValidation";

export function UserCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false, }) {
    const schema = isEdit ? userEditSchema : userCreateSchema;
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: formData,
        mode: "onSubmit",
    });

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = form.handleSubmit((datos) => {
        const payload = {
            ...datos,
            roleId: typeof datos.role,
            departmentId: typeof datos.department === "number" ? datos.department : undefined,
        };
        onSubmit(payload);
    });

    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Actualiza la información del usuario" : "Ingresa los datos del nuevo usuario"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-0">
            <div className="grid grid-cols-2 gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Juan Pérez" onChange={(e) => {
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="juan@ejemplo.com" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, email: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+57 300 123 4567" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, phone: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setFormData({ ...formData, role: value });
                    }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLE_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
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
                    }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select onValueChange={(value) => {
                      const idNum = Number(value);
                      field.onChange(idNum);
                      setFormData({ ...formData, department: idNum });
                    }} value={field.value != null ? String(field.value) : undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar departamento"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEPARTMENT_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Medellín, Colombia" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, address: e.target.value });
                      }}/>
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
              <Button type="submit">{isEdit ? "Guardar Cambios" : "Crear Usuario"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>);
}
