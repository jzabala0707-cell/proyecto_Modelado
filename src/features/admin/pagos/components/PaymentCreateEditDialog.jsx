import { useEffect, useMemo } from "react";
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
import {
    mockVentas,
    metodosPagoCatalogo,
    abonoServices,
    mockReservasParaVentas,
} from "../paymentServices";
import { abonoSchema } from "../validations/salesValidation";

const METODO_PAGO_SELECT = metodosPagoCatalogo.map((m) => ({
    value: String(m.id_metodo_pago),
    label: m.nombre,
}));

const VENTA_SELECT = mockVentas.map((v) => {
    const reserva = mockReservasParaVentas.find((r) => r.id_reserva === v.id_reserva) ?? null;
    return {
        value: String(v.id_venta),
        label: `${v.numero_venta} · ${reserva?.cliente_nombre ?? "S/N"} · $${(v.total ?? 0).toLocaleString()}`,
        total: v.total ?? 0,
    };
});

export function PaymentCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const hasContextoSaleId = !!formData.id_venta;

    const form = useForm({
        resolver: zodResolver(abonoSchema),
        defaultValues: {
            id_venta: formData.id_venta ?? null,
            fecha_abono: formData.fecha_abono,
            id_metodo_pago: formData.id_metodo_pago,
            monto: formData.monto,
            referencia: formData.referencia,
            comprobante_url: formData.comprobante_url,
            observaciones: formData.observaciones,
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (open) {
            form.reset({
                id_venta: formData.id_venta ?? null,
                fecha_abono: formData.fecha_abono ?? new Date().toISOString().split("T")[0],
                id_metodo_pago: formData.id_metodo_pago ?? null,
                monto: formData.monto ?? 0,
                referencia: formData.referencia ?? "",
                comprobante_url: formData.comprobante_url ?? "",
                observaciones: formData.observaciones ?? "",
            });
        }
    }, [open, formData, form]);

    const idVentaSeleccionada = form.watch("id_venta");
    const montoIngresado = form.watch("monto");

    const { saldoPendiente, ventaSeleccionada, sumaAbonos } = useMemo(() => {
        if (!idVentaSeleccionada) return { saldoPendiente: null, ventaSeleccionada: null, sumaAbonos: 0 };
        const idNum = Number(idVentaSeleccionada);
        const venta = mockVentas.find((v) => v.id_venta === idNum) ?? null;
        if (!venta) return { saldoPendiente: null, ventaSeleccionada: null, sumaAbonos: 0 };
        const suma = abonoServices.getSumaAbonos(idNum);
        const montoActual = isEdit && formData.monto ? Number(formData.monto) : 0;
        const sumaSinActual = isEdit ? suma - montoActual : suma;
        const saldo = Math.max(0, Number(venta.total ?? 0) - sumaSinActual);
        return { saldoPendiente: saldo, ventaSeleccionada: venta, sumaAbonos: suma };
    }, [idVentaSeleccionada, isEdit, formData.monto]);

    const handleInternalSubmit = (validatedData) => {
        const monto = Number(validatedData.monto ?? 0);

        if (saldoPendiente !== null && monto > saldoPendiente) {
            toast.error(`El monto $${monto.toLocaleString()} supera el saldo pendiente de $${saldoPendiente.toLocaleString()}.`);
            form.setError("monto", {
                type: "manual",
                message: `Supera el saldo pendiente ($${saldoPendiente.toLocaleString()})`,
            });
            return;
        }

        const payload = {
            ...validatedData,
            id_venta: Number(validatedData.id_venta),
            id_metodo_pago: Number(validatedData.id_metodo_pago),
            monto,
        };
        if (isEdit && formData.id_abono) {
            payload.id_abono = formData.id_abono;
        }
        setFormData({ ...formData, ...payload });
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Abono" : "Crear Nuevo Abono"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del abono"
                            : "Ingresa los datos del nuevo abono. Los métodos de pago provienen del catálogo."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="id_venta"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Venta Asociada *</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            defaultValue={field.value ? String(field.value) : undefined}
                                            value={field.value ? String(field.value) : undefined}
                                            disabled={hasContextoSaleId}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione la venta" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {VENTA_SELECT.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {hasContextoSaleId && ventaSeleccionada && (
                                            <p className="text-xs text-muted-foreground">
                                                Venta asociada desde la vista: {ventaSeleccionada.numero_venta}
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {saldoPendiente !== null && (
                                <div className="col-span-2 space-y-2">
                                    <FormLabel>Saldo pendiente de la venta</FormLabel>
                                    <Badge
                                        variant="outline"
                                        className={`text-sm py-2 px-3 font-mono w-full justify-start ${saldoPendiente > 0
                                            ? "bg-warning/10 text-warning font-semibold"
                                            : "bg-success/10 text-success font-semibold"}`}
                                    >
                                        ${saldoPendiente.toLocaleString()}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">
                                        Total venta: ${(ventaSeleccionada?.total ?? 0).toLocaleString()}
                                        {" · "}Abonado (otros): ${(sumaAbonos - (isEdit ? Number(formData.monto ?? 0) : 0)).toLocaleString()}
                                    </p>
                                    {saldoPendiente === 0 && (
                                        <p className="text-xs text-success">
                                            Venta se encuentra pagada en su totalidad.
                                        </p>
                                    )}
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="fecha_abono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Abono *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="id_metodo_pago"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Método de Pago *</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            defaultValue={field.value ? String(field.value) : undefined}
                                            value={field.value ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione método" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {METODO_PAGO_SELECT.map((opt) => (
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
                                name="monto"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Monto ($) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="0"
                                            />
                                        </FormControl>
                                        {saldoPendiente !== null && montoIngresado > saldoPendiente && (
                                            <p className="text-xs text-destructive">
                                                ⚠ Supera saldo pendiente ($${saldoPendiente.toLocaleString()})
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referencia"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Referencia</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="TXN-0001, NEQUI-001, Pago en hotel, etc."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="comprobante_url"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Comprobante (URL)</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="https://..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="observaciones"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Observaciones</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="Notas sobre el abono..."
                                                rows={3}
                                            />
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
                            <Button type="submit">
                                {isEdit ? "Guardar Cambios" : "Crear Abono"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
