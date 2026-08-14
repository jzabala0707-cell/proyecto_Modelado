import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { NATIONALITY_OPTIONS } from "@/features/admin/reservas/bookingServices";
export function ClientCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Cliente" : "Crear Nuevo Cliente"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información del cliente" : "Ingresa los datos del nuevo cliente"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                        <Label>Nombre Completo</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="juan@email.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+57 300 123 4567"
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
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="vip">VIP</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Nacionalidad</Label>
                        <Select
                            value={formData.nationality}
                            onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar nacionalidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {NATIONALITY_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Cantidad de Reservas</Label>
                        <Input
                            type="number"
                            min={0}
                            value={formData.bookings}
                            onChange={(e) =>
                                setFormData({ ...formData, bookings: parseInt(e.target.value) || 0 })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Gasto Total ($)</Label>
                        <Input
                            type="number"
                            min={0}
                            value={formData.totalSpent}
                            onChange={(e) =>
                                setFormData({ ...formData, totalSpent: parseInt(e.target.value) || 0 })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha de Registro</Label>
                        <Input
                            type="date"
                            value={formData.registrationDate}
                            onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Última Reserva</Label>
                        <Input
                            type="date"
                            value={formData.lastBooking}
                            onChange={(e) => setFormData({ ...formData, lastBooking: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>{isEdit ? "Guardar Cambios" : "Crear Cliente"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
