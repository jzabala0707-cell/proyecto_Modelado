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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { SALE_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from "../paymentServices";
import { mockClients } from "@/features/admin/reservas/bookingServices";
import { mockTours } from "@/features/admin/tours/tourServices";
import { saleSchema } from "../validations/salesValidation";

const CLIENT_OPTIONS = Array.isArray(mockClients)
    ? mockClients.map((c) => ({ value: String(c.id), label: c.name }))
    : [];
const TOUR_ID_OPTIONS = Array.isArray(mockTours)
    ? mockTours.map((t) => ({ value: String(t.id), label: t.name }))
    : [];
const PAYMENT_METHOD_ID_MAP = {
    "Tarjeta": 1,
    "Efectivo": 2,
    "Transferencia": 3,
};

export function SaleCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const form = useForm({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            client: formData.clientId ? String(formData.clientId) : (formData.client ?? ""),
            tour: formData.tourId ? String(formData.tourId) : (formData.tour ?? ""),
            date: formData.date,
            subtotal: formData.subtotal,
            discount: formData.discount,
            status: formData.status,
            paymentMethod: formData.paymentMethod,
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (open) {
            form.reset({
                client: formData.clientId ? String(formData.clientId) : (formData.client ?? ""),
                tour: formData.tourId ? String(formData.tourId) : (formData.tour ?? ""),
                date: formData.date ?? "",
                subtotal: formData.subtotal ?? 0,
                discount: formData.discount ?? 0,
                status: formData.status ?? "",
                paymentMethod: formData.paymentMethod ?? "",
            });
        }
    }, [open, formData, form]);

    const formValues = form.watch();

    const computedTotal = useMemo(() => {
        return Math.max(0, Number(formValues.subtotal || 0) - Number(formValues.discount || 0));
    }, [formValues.subtotal, formValues.discount]);

    const computedCommission = useMemo(() => {
        return Math.round(Number(formValues.subtotal || 0) * 0.06);
    }, [formValues.subtotal]);

    const statusOptions = SALE_STATUS_OPTIONS.filter((o) => o.value !== "all");
    const methodOptions = PAYMENT_METHOD_OPTIONS.filter((o) => o.value !== "all");

    const handleInternalSubmit = (validatedData) => {
        const clientId = Number(validatedData.client);
        const tourIdNum = Number(validatedData.tour);
        const paymentMethodId = PAYMENT_METHOD_ID_MAP[validatedData.paymentMethod] ?? null;
        const payload = {
            ...validatedData,
            invoice: isEdit && formData.invoice ? formData.invoice : "FAC-2026-XXXX",
            clientId: Number.isNaN(clientId) ? null : clientId,
            tourId: Number.isNaN(tourIdNum) ? null : tourIdNum,
            paymentMethodId,
            commission: computedCommission,
            total: computedTotal,
        };
        setFormData({ ...formData, ...payload });
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Venta" : "Crear Nueva Venta"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información de la venta"
                            : "Ingresa los datos de la nueva venta"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <FormLabel>Factura</FormLabel>
                                <Badge variant="outline" className="text-sm py-2 px-3 font-mono w-full justify-start">
                                    {isEdit && formData.invoice ? formData.invoice : "Se asigna al guardar (FAC-AAAA-XXXX)"}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                    Correlativo generado automáticamente por el sistema
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un cliente" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CLIENT_OPTIONS.map((opt) => (
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
                                name="tour"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un tour" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TOUR_ID_OPTIONS.map((opt) => (
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
                                name="subtotal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtotal</FormLabel>
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
                                name="discount"
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
                                <FormLabel>Comisión (6%)</FormLabel>
                                <Badge variant="outline" className="text-sm py-2 px-3 font-mono w-full justify-start">
                                    ${computedCommission.toLocaleString()}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                    Cálculo automático: 6% del subtotal
                                </p>
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Total (auto)</FormLabel>
                                <Badge variant="outline" className="text-sm py-2 px-3 font-mono w-full justify-start bg-primary/10 text-primary font-semibold">
                                    ${computedTotal.toLocaleString()}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                    Subtotal - descuento
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
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
                                                {statusOptions.map((opt) => (
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
                                                {methodOptions.map((opt) => (
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
                        </div>

                        {formData.payments && formData.payments.length > 0 && (
                            <div className="border-t pt-4 space-y-2">
                                <FormLabel>Abonos (solo lectura)</FormLabel>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {formData.payments.map((p, idx) => (
                                        <div
                                            key={p.id ?? idx}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm"
                                        >
                                            <div>
                                                <div className="font-medium">
                                                    {p.date} · {p.method}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {p.reference || "Sin referencia"}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-muted-foreground">
                                                    {p.status}
                                                </div>
                                                <div className="font-semibold">
                                                    ${(p.amount ?? 0).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
