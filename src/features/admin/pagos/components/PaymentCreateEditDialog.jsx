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
import { PAYMENT_METHOD_OPTIONS, mockSales } from "../paymentServices";
import { paymentSchema } from "../validations/salesValidation";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pendiente" },
    { value: "completed", label: "Completado" },
    { value: "partial", label: "Parcial" },
];
const PAYMENT_METHOD_ID_MAP = {
    "Tarjeta": 1,
    "Efectivo": 2,
    "Transferencia": 3,
};
const SALE_INVOICE_OPTIONS = Array.isArray(mockSales)
    ? mockSales.map((s) => ({
        value: String(s.id),
        label: `${s.invoice} · ${s.client} - $${(s.total ?? 0).toLocaleString()}`,
    }))
    : [];

export function PaymentCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const hasContextoSaleId = !!formData.saleId;

    const form = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            saleId: formData.saleId ? String(formData.saleId) : "",
            date: formData.date,
            method: formData.method,
            amount: formData.amount,
            status: formData.status,
            reference: formData.reference,
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (open) {
            form.reset({
                saleId: formData.saleId ? String(formData.saleId) : "",
                date: formData.date ?? "",
                method: formData.method ?? "",
                amount: formData.amount ?? 0,
                status: formData.status ?? "",
                reference: formData.reference ?? "",
            });
        }
    }, [open, formData, form]);

    const methodOptions = PAYMENT_METHOD_OPTIONS.filter((o) => o.value !== "all");
    const saleIdSeleccionado = form.watch("saleId");
    const amountIngresado = form.watch("amount");

    const { saldoPendiente, facturaSeleccionada } = useMemo(() => {
        if (!saleIdSeleccionado) return { saldoPendiente: null, facturaSeleccionada: null };
        const idNum = Number(saleIdSeleccionado);
        const sale = Array.isArray(mockSales)
            ? mockSales.find((s) => s.id === idNum)
            : null;
        if (!sale) return { saldoPendiente: null, facturaSeleccionada: null };
        const pagado = (sale.payments ?? [])
            .filter((p) => p.status === "completed")
            .reduce((s, p) => s + Number(p.amount ?? 0), 0);
        const saldo = Math.max(0, Number(sale.total ?? 0) - pagado);
        return { saldoPendiente: saldo, facturaSeleccionada: sale };
    }, [saleIdSeleccionado]);

    const handleInternalSubmit = (validatedData) => {
        const saleIdNum = Number(validatedData.saleId);
        const paymentMethodId = PAYMENT_METHOD_ID_MAP[validatedData.method] ?? null;
        const amount = Number(validatedData.amount ?? 0);

        if (saldoPendiente !== null && amount > saldoPendiente) {
            toast.error(`El monto $${amount.toLocaleString()} supera el saldo pendiente de $${saldoPendiente.toLocaleString()}.`);
            form.setError("amount", {
                type: "manual",
                message: `Supera el saldo pendiente ($${saldoPendiente.toLocaleString()})`,
            });
            return;
        }

        const payload = {
            ...validatedData,
            saleId: Number.isNaN(saleIdNum) ? null : saleIdNum,
            paymentMethodId,
            amount,
        };
        setFormData({ ...formData, ...payload });
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Abono" : "Crear Nuevo Abono"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del abono"
                            : "Ingresa los datos del nuevo abono"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="saleId"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Factura</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                            disabled={hasContextoSaleId}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione la factura" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {SALE_INVOICE_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {hasContextoSaleId && facturaSeleccionada && (
                                            <p className="text-xs text-muted-foreground">
                                                Factura asociada desde la vista de ventas: {facturaSeleccionada.invoice}
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {saldoPendiente !== null && (
                                <div className="col-span-2 space-y-2">
                                    <FormLabel>Saldo pendiente de la factura</FormLabel>
                                    <Badge
                                        variant="outline"
                                        className={`text-sm py-2 px-3 font-mono w-full justify-start ${saldoPendiente > 0
                                            ? "bg-warning/10 text-warning font-semibold"
                                            : "bg-success/10 text-success font-semibold"}`}
                                    >
                                        ${saldoPendiente.toLocaleString()}
                                    </Badge>
                                    {saldoPendiente === 0 && (
                                        <p className="text-xs text-success">
                                            Factura se encuentra pagada en su totalidad.
                                        </p>
                                    )}
                                </div>
                            )}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Pago</FormLabel>
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
                                name="method"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Método</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monto</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="0"
                                            />
                                        </FormControl>
                                        {saldoPendiente !== null && amountIngresado > saldoPendiente && (
                                            <p className="text-xs text-destructive">
                                                ⚠ Supera saldo pendiente
                                            </p>
                                        )}
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
                                                {STATUS_OPTIONS.map((opt) => (
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
                                name="reference"
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
