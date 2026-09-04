import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/shared/components/ui/form";
import { ESTADO_USUARIO_OPTIONS } from "@/shared/constants/dbEnums";
import { USER_ROLE_OPTIONS } from "../userServices";
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

    const handleSubmit = form.handleSubmit((data) => {
        const payload = {
            nombre: data.firstName,
            apellido: data.lastName,
            correo: data.correo,
            telefono: data.telefono,
            estado: data.estado,
            cargo: data.cargo,
            departamento: data.departamento,
            direccion: data.direccion,
            rol_ids: data.rolId != null ? [Number(data.rolId)] : [],
            rolId: data.rolId,
            password: data.password,
        };
        onSubmit(payload);
    });

    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Juan" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, firstName: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pérez" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, lastName: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="juan@ejemplo.com" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, correo: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+57 300 123 4567" onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, telefono: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setFormData({ ...formData, estado: value });
                    }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ESTADO_USUARIO_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
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
                name="rolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setFormData({ ...formData, rolId: value });
                      }}
                      value={field.value != null ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo (opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Gerente de Operaciones" value={field.value ?? ""} onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, cargo: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento (opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Operaciones" value={field.value ?? ""} onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, departamento: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Dirección (opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Medellín, Colombia" value={field.value ?? ""} onChange={(e) => {
                        field.onChange(e);
                        setFormData({ ...formData, direccion: e.target.value });
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isEdit && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} placeholder="Mínimo 8 caracteres con mayúscula, minúscula y número" onChange={(e) => {
                          field.onChange(e);
                          setFormData({ ...formData, password: e.target.value });
                        }}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Contraseña (dejar vacío para mantener)</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} value={field.value ?? ""} placeholder="Mínimo 8 caracteres con mayúscula, minúscula y número" onChange={(e) => {
                          field.onChange(e);
                          setFormData({ ...formData, password: e.target.value });
                        }}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
