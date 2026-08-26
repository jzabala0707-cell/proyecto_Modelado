import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { TOUR_NAME_OPTIONS, PAYMENT_METHODS, mockClients } from "../bookingServices";
import { mockGuides } from "@/features/admin/guias/guideServices";
import { mockTours } from "@/features/admin/tours/tourServices";
import { bookingSchema } from "../validations/bookingValidation";
const CLIENT_OPTIONS = Array.isArray(mockClients)
    ? mockClients.map((c) => ({ value: c.id, label: c.name }))
    : [];
const GUIDE_OPTIONS = Array.isArray(mockGuides)
    ? mockGuides.map((g) => ({ value: g.id, label: g.name }))
    : [];
const TOUR_ID_OPTIONS = Array.isArray(mockTours)
    ? mockTours.map((t) => ({ value: t.id, label: t.name, price: Number(t.price ?? 0) }))
    : TOUR_NAME_OPTIONS.map((t) => ({ ...t, price: 0 }));
const TIME_OPTIONS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
    "17:30", "18:00", "18:30", "19:00",
];
export function BookingCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false }) {
    const form = useForm({
        defaultValues: formData,
        resolver: zodResolver(bookingSchema),
    });
    const tourId = form.watch("tour");
    const people = form.watch("people");
    const totalAuto = useMemo(() => {
        const tour = TOUR_ID_OPTIONS.find((t) => String(t.value) === String(tourId));
        const tourPrice = tour ? Number(tour.price ?? 0) : 0;
        const pax = Number.isNaN(Number(people)) ? 0 : Number(people);
        return pax * tourPrice;
    }, [tourId, people]);

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = (datosLimpios) => {
        const clientId = Number(datosLimpios.customer);
        const tourIdNum = Number(datosLimpios.tour);
        const guideId = datosLimpios.guide ? Number(datosLimpios.guide) : null;
        const paymentMethodId = Number(datosLimpios.paymentMethod);
        const payload = {
            ...datosLimpios,
            clientId: Number.isNaN(clientId) ? null : clientId,
            tourId: Number.isNaN(tourIdNum) ? null : tourIdNum,
            guideId,
            paymentMethodId: Number.isNaN(paymentMethodId) ? null : paymentMethodId,
            total: totalAuto > 0 ? totalAuto : Number(datosLimpios.total ?? 0),
        };
        setFormData?.(payload);
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Reserva" : "Crear Nueva Reserva"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información de la reserva" : "Ingresa los datos de la nueva reserva"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="customer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cliente (FK client_id)</FormLabel>
                                            <Select
                                                onValueChange={(v) => field.onChange(Number(v))}
                                                value={field.value != null ? String(field.value) : undefined}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar cliente" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {CLIENT_OPTIONS.map((opt) => (
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
                            </div>
                            <FormField
                                control={form.control}
                                name="tour"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour (FK tour_id)</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            value={field.value != null ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar tour" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TOUR_ID_OPTIONS.map((opt) => (
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
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha</FormLabel>
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
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar hora" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TIME_OPTIONS.map((t) => (
                                                    <SelectItem key={t} value={t}>
                                                        {t}
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
                                name="people"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Personas</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="total"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total ($) — AUTO-CALCULADO (precio tour × personas)</FormLabel>
                                        <FormControl>
                                            <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex font-semibold text-lg">
                                                ${Number(totalAuto || field.value || 0).toLocaleString("es-CO")} COP
                                            </Badge>
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
                                                {BOOKING_STATUSES.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
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
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Método de Pago</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {PAYMENT_METHODS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="+57 300 1234567"
                                            />
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
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="cliente@email.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="guide"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Guía Asignado (FK guide_id, opcional)</FormLabel>
                                            <Select
                                                onValueChange={(v) => field.onChange(Number(v))}
                                                value={field.value != null ? String(field.value) : undefined}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar guía (opcional)" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {GUIDE_OPTIONS.map((opt) => (
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
                            </div>
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notas</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Notas adicionales sobre la reserva"
                                                    rows={3}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">{isEdit ? "Guardar Cambios" : "Crear Reserva"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
