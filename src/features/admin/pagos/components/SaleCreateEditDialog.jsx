import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";
import { ESTADO_VENTA_OPTIONS } from "@/shared/constants/dbEnums.js";
import {
    mockReservasParaVentas,
    mockVentas,
    mockAbonos,
    metodosPagoCatalogo,
    ventaServices,
    abonoServices,
} from "../paymentServices";
import { ventaSchema } from "../validations/salesValidation";

const RESERVA_OPTIONS = mockReservasParaVentas.map((r) => ({
    value: String(r.id_reserva),
    label: `#${r.codigo_reserva} · ${r.cliente_nombre} · ${r.tour_nombre} · ${r.fecha_salida ?? "Sin fecha"}`,
}));

const ESTADO_VENTA_SIN_TODOS = ESTADO_VENTA_OPTIONS;

export function SaleCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const form = useForm({
        resolver: zodResolver(ventaSchema),
        defaultValues: {
            id_reserva: formData.id_reserva ?? null,
            fecha_venta: formData.fecha_venta,
            subtotal: formData.subtotal,
            impuestos: formData.impuestos,
            descuento: formData.descuento,
            total: formData.total,
            estado: formData.estado,
            observaciones: formData.observaciones,
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (open) {
            form.reset({
                id_reserva: formData.id_reserva ?? null,
                fecha_venta: formData.fecha_venta ?? new Date().toISOString().split("T")[0],
                subtotal: formData.subtotal ?? 0,
                impuestos: formData.impuestos ?? 0,
                descuento: formData.descuento ?? 0,
                total: formData.total ?? 0,
                estado: formData.estado ?? "PENDIENTE",
                observaciones: formData.observaciones ?? "",
            });
        }
    }, [open, formData, form]);

    const idReservaSeleccionada = form.watch("id_reserva");
    const subtotalValor = form.watch("subtotal");
    const impuestosValor = form.watch("impuestos");
    const descuentoValor = form.watch("descuento");

    const reservaSeleccionada = useMemo(() => {
        if (!idReservaSeleccionada) return null;
        const idNum = Number(idReservaSeleccionada);
        return mockReservasParaVentas.find((r) => r.id_reserva === idNum) ?? null;
    }, [idReservaSeleccionada]);

    useEffect(() => {
        if (!isEdit && reservaSeleccionada) {
            const subtotalR = Number(reservaSeleccionada.subtotal ?? 0);
            const descuentoR = Number(reservaSeleccionada.descuento ?? 0);
            const impuestosR = ventaServices.computeImpuestos(subtotalR);
            const totalR = ventaServices.computeTotal({
                subtotal: subtotalR,
                impuestos: impuestosR,
                descuento: descuentoR,
            });
            form.setValue("subtotal", subtotalR, { shouldDirty: true });
            form.setValue("impuestos", impuestosR, { shouldDirty: true });
            form.setValue("descuento", descuentoR, { shouldDirty: true });
            form.setValue("total", totalR, { shouldDirty: true });
            if (!form.getValues("fecha_venta")) {
                form.setValue("fecha_venta", new Date().toISOString().split("T")[0], { shouldDirty: true });
            }
        }
    }, [reservaSeleccionada, isEdit, form]);

    const computedTotal = useMemo(() => {
        return ventaServices.computeTotal({
            subtotal: subtotalValor,
            impuestos: impuestosValor,
            descuento: descuentoValor,
        });
    }, [subtotalValor, impuestosValor, descuentoValor]);

    useEffect(() => {
        form.setValue("total", computedTotal, { shouldDirty: true });
    }, [computedTotal, form]);

    const abonosDeEstaVenta = useMemo(() => {
        if (!isEdit || !formData.id_venta) return [];
        return mockAbonos
            .filter((a) => a.id_venta === formData.id_venta)
            .map((a) => ({
                ...a,
                metodo_pago: metodosPagoCatalogo.find((m) => m.id_metodo_pago === a.id_metodo_pago)?.nombre ?? "",
            }));
    }, [isEdit, formData.id_venta]);

    const sumaAbonos = useMemo(() => {
        if (!formData.id_venta) return 0;
        return abonoServices.getSumaAbonos(formData.id_venta);
    }, [formData.id_venta]);

    const handleInternalSubmit = (validatedData) => {
        const payload = {
            ...validatedData,
            id_reserva: Number(validatedData.id_reserva),
            subtotal: Number(validatedData.subtotal ?? 0),
            impuestos: Number(validatedData.impuestos ?? 0),
            descuento: Number(validatedData.descuento ?? 0),
            total: Number(validatedData.total ?? 0),
        };
        if (isEdit && formData.numero_venta) {
            payload.numero_venta = formData.numero_venta;
            payload.id_venta = formData.id_venta;
        }
        setFormData({ ...formData, ...payload });
        try {
            onSubmit(payload);
        } catch (err) {
            toast.error(err?.message ?? "Error al guardar la venta.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[680px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Venta" : "Crear Nueva Venta"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información de la venta"
                            : "Ingresa los datos de la nueva venta. Seleccione una reserva para precargar valores."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-0">
                        <div className="py-4 space-y-4">
                            {(isEdit && (formData.numero_venta || formData.codigo_reserva)) && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <FormLabel>Número de Venta</FormLabel>
                                        <Badge variant="outline" className="text-sm py-2 px-3 font-mono w-full justify-start">
                                            {formData.numero_venta ?? "Se asigna al guardar"}
                                        </Badge>
                                    </div>
                                    {formData.codigo_reserva && (
                                        <div className="space-y-2">
                                            <FormLabel>Reserva</FormLabel>
                                            <Badge variant="secondary" className="text-sm py-2 px-3 font-mono w-full justify-start">
                                                #{formData.codigo_reserva}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="id_reserva"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reserva Asociada *</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            defaultValue={field.value ? String(field.value) : undefined}
                                            value={field.value ? String(field.value) : undefined}
                                            disabled={isEdit}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="#codigo_reserva · Cliente · Tour · Fecha" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {RESERVA_OPTIONS.map((opt) => {
                                                    const reservadaYa = mockVentas.some(
                                                        (v) => v.id_reserva === Number(opt.value) &&
                                                            (!isEdit || v.id_venta !== formData.id_venta)
                                                    );
                                                    return (
                                                        <SelectItem
                                                            key={opt.value}
                                                            value={opt.value}
                                                            disabled={reservadaYa}
                                                        >
                                                            {opt.label}
                                                            {reservadaYa && " (ya tiene venta)"}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        {isEdit && reservaSeleccionada && (
                                            <p className="text-xs text-muted-foreground">
                                                {reservaSeleccionada.cliente_nombre} · {reservaSeleccionada.tour_nombre}
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fecha_venta"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Venta *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subtotal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subtotal ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="impuestos"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Impuestos ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="descuento"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descuento ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <FormLabel>Total (calculado)</FormLabel>
                                    <Badge variant="outline" className="text-sm py-2 px-3 font-mono w-full justify-start bg-primary/10 text-primary font-semibold">
                                        ${computedTotal.toLocaleString()}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">
                                        subtotal + impuestos - descuento
                                    </p>
                                    {isEdit && formData.total != null && (
                                        <p className="text-xs text-muted-foreground">
                                            Suma abonos: ${sumaAbonos.toLocaleString()} · Saldo: ${Math.max(0, computedTotal - sumaAbonos).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="estado"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado de Venta *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ESTADO_VENTA_SIN_TODOS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                            PENDIENTE / PARCIAL / PAGADA se actualizan automáticamente según abonos.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="observaciones"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observaciones</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="Notas internas sobre la venta..."
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {abonosDeEstaVenta.length > 0 && (
                                <div className="border-t pt-4 space-y-2">
                                    <FormLabel>Abonos Asociados (solo lectura)</FormLabel>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {abonosDeEstaVenta.map((a) => (
                                            <div
                                                key={a.id_abono}
                                                className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm"
                                            >
                                                <div>
                                                    <div className="font-medium">
                                                        {a.fecha_abono} · {a.metodo_pago}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {a.referencia || "Sin referencia"}
                                                    </div>
                                                </div>
                                                <div className="text-right font-semibold">
                                                    ${(a.monto ?? 0).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="pt-4">
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Guardar Cambios" : "Crear Venta"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
