import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { NATIONALITY_OPTIONS } from "@/features/admin/reservas/bookingServices";
import { clientSchema } from "../validations/clientValidation";
export function ClientCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false }) {
    const form = useForm({
        defaultValues: formData,
        resolver: zodResolver(clientSchema),
    });

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = (datosLimpios) => {
        const nationalityId = Number(datosLimpios.nationality);
        const payload = {
            ...datosLimpios,
            nationalityId: Number.isNaN(nationalityId) ? null : nationalityId,
            vip: datosLimpios.status === "vip",
        };
        setFormData?.(payload);
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Cliente" : "Crear Nuevo Cliente"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información del cliente" : "Ingresa los datos del nuevo cliente"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre Completo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Juan Pérez"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="juan@email.com"
                                            />
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
                                            <Input
                                                {...field}
                                                placeholder="+57 300 123 4567"
                                            />
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Activo</SelectItem>
                                                <SelectItem value="vip">VIP</SelectItem>
                                                <SelectItem value="inactive">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nacionalidad (FK nationality_id)</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            value={field.value != null ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar nacionalidad" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {NATIONALITY_OPTIONS.map((opt) => (
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
                                name="bookings"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad de Reservas (calculado — solo lectura)</FormLabel>
                                        <FormControl>
                                            <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex font-medium">
                                                {Number(field.value ?? 0)} reservas
                                            </Badge>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalSpent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gasto Total ($) (calculado — solo lectura)</FormLabel>
                                        <FormControl>
                                            <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex font-semibold">
                                                ${Number(field.value ?? 0).toLocaleString("es-CO")} COP
                                            </Badge>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="registrationDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Registro (default hoy)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastBooking"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Última Reserva (calculado — solo lectura)</FormLabel>
                                        <FormControl>
                                            <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex">
                                                {field.value || "—"}
                                            </Badge>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">{isEdit ? "Guardar Cambios" : "Crear Cliente"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
