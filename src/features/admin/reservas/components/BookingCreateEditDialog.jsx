import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { TOUR_NAME_OPTIONS, PAYMENT_METHODS } from "../bookingServices";
const BOOKING_STATUSES = [
    { value: "pending", label: "Pendiente" },
    { value: "confirmed", label: "Confirmada" },
    { value: "cancelled", label: "Cancelada" },
];
const TIME_OPTIONS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
    "17:30", "18:00", "18:30", "19:00",
];
export function BookingCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Reserva" : "Crear Nueva Reserva"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información de la reserva" : "Ingresa los datos de la nueva reserva"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                        <Label>Cliente</Label>
                        <Input
                            value={formData.customer}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                            placeholder="Nombre completo del cliente"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Tour</Label>
                        <Select
                            value={formData.tour}
                            onValueChange={(value) => setFormData({ ...formData, tour: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tour" />
                            </SelectTrigger>
                            <SelectContent>
                                {TOUR_NAME_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Hora</Label>
                        <Select
                            value={formData.time}
                            onValueChange={(value) => setFormData({ ...formData, time: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar hora" />
                            </SelectTrigger>
                            <SelectContent>
                                {TIME_OPTIONS.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Número de Personas</Label>
                        <Input
                            type="number"
                            min={1}
                            value={formData.people}
                            onChange={(e) =>
                                setFormData({ ...formData, people: parseInt(e.target.value) || 1 })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Total ($)</Label>
                        <Input
                            type="number"
                            min={0}
                            value={formData.total}
                            onChange={(e) =>
                                setFormData({ ...formData, total: parseInt(e.target.value) || 0 })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {BOOKING_STATUSES.map((opt) => (
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
                            onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PAYMENT_METHODS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+57 300 1234567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="cliente@email.com"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Guía Asignado</Label>
                        <Input
                            value={formData.guide}
                            onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                            placeholder="Nombre del guía (opcional)"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Notas</Label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Notas adicionales sobre la reserva"
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>{isEdit ? "Guardar Cambios" : "Crear Reserva"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
