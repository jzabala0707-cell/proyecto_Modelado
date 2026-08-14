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
import { PAYMENT_METHOD_OPTIONS } from "../paymentServices";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pendiente" },
    { value: "completed", label: "Completado" },
    { value: "partial", label: "Parcial" },
];

export function PaymentCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const methodOptions = PAYMENT_METHOD_OPTIONS.filter((o) => o.value !== "all");

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
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Fecha de Pago</Label>
                        <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Método</Label>
                        <Select
                            value={formData.method}
                            onValueChange={(value) =>
                                setFormData({ ...formData, method: value })
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
                    <div className="space-y-2">
                        <Label>Monto</Label>
                        <Input
                            type="number"
                            value={formData.amount}
                            onChange={(e) =>
                                setFormData({ ...formData, amount: Number(e.target.value) })
                            }
                            placeholder="0"
                        />
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
                                {STATUS_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Referencia</Label>
                        <Input
                            value={formData.reference}
                            onChange={(e) =>
                                setFormData({ ...formData, reference: e.target.value })
                            }
                            placeholder="TXN-0001, NEQUI-001, Pago en hotel, etc."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Abono"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
