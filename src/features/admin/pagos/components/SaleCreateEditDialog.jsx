import { useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { SALE_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from "../paymentServices";

export function SaleCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const computedTotal = useMemo(() => {
        return Math.max(0, Number(formData.subtotal || 0) - Number(formData.discount || 0));
    }, [formData.subtotal, formData.discount]);

    const computedCommission = useMemo(() => {
        return formData.commission || Math.round(Number(formData.subtotal || 0) * 0.06);
    }, [formData.subtotal, formData.commission]);

    const statusOptions = SALE_STATUS_OPTIONS.filter((o) => o.value !== "all");
    const methodOptions = PAYMENT_METHOD_OPTIONS.filter((o) => o.value !== "all");

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
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Factura</Label>
                        <Input
                            value={formData.invoice}
                            onChange={(e) =>
                                setFormData({ ...formData, invoice: e.target.value })
                            }
                            placeholder="FAC-2026-0001"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Cliente</Label>
                        <Input
                            value={formData.client}
                            onChange={(e) =>
                                setFormData({ ...formData, client: e.target.value })
                            }
                            placeholder="Nombre del cliente"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Tour</Label>
                        <Input
                            value={formData.tour}
                            onChange={(e) =>
                                setFormData({ ...formData, tour: e.target.value })
                            }
                            placeholder="Nombre del tour"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtotal</Label>
                        <Input
                            type="number"
                            value={formData.subtotal}
                            onChange={(e) =>
                                setFormData({ ...formData, subtotal: Number(e.target.value) })
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Descuento ($)</Label>
                        <Input
                            type="number"
                            value={formData.discount}
                            onChange={(e) =>
                                setFormData({ ...formData, discount: Number(e.target.value) })
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Comisión</Label>
                        <Input
                            type="number"
                            value={formData.commission}
                            onChange={(e) =>
                                setFormData({ ...formData, commission: Number(e.target.value) })
                            }
                            placeholder={String(computedCommission)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Auto: ${computedCommission.toLocaleString()} (6%)
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label>Total (auto)</Label>
                        <Input disabled value={`$${computedTotal.toLocaleString()}`} />
                    </div>
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Método de Pago</Label>
                        <Select
                            value={formData.paymentMethod}
                            onValueChange={(value) =>
                                setFormData({ ...formData, paymentMethod: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {methodOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {formData.payments && formData.payments.length > 0 && (
                    <div className="border-t pt-4 space-y-2">
                        <Label>Abonos (solo lectura)</Label>
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

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Venta"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
