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
import { Textarea } from "@/shared/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { GROUP_STATUS_OPTIONS, GUIDE_NAME_OPTIONS, TOUR_TYPE_OPTIONS, mockTours } from "../tourServices";

const TOUR_NAME_OPTIONS = mockTours.map((t) => ({
    value: t.name,
    label: t.name,
}));

export function GroupCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Grupo" : "Crear Nuevo Grupo"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del grupo"
                            : "Ingresa los datos del nuevo grupo"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Tour</Label>
                        <Select
                            value={formData.tourName}
                            onValueChange={(value) => setFormData({ ...formData, tourName: value })}
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
                        <Label>Nombre del Grupo</Label>
                        <Input
                            value={formData.groupName}
                            onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                            placeholder="Comuna 13 - Grupo 01"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Guía</Label>
                        <Select
                            value={formData.guideName}
                            onValueChange={(value) => setFormData({ ...formData, guideName: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar guía" />
                            </SelectTrigger>
                            <SelectContent>
                                {GUIDE_NAME_OPTIONS.map((opt) => (
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
                        <Label>Hora Inicio</Label>
                        <Input
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Capacidad Máxima</Label>
                        <Input
                            type="number"
                            value={formData.maxCapacity}
                            onChange={(e) =>
                                setFormData({ ...formData, maxCapacity: Number(e.target.value) })
                            }
                            min={1}
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
                                {GROUP_STATUS_OPTIONS.filter((o) => o.value !== "all").map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Punto de Encuentro</Label>
                        <Input
                            value={formData.meetingPoint}
                            onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                            placeholder="Estación San Javier (Metro)"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Notas</Label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Notas adicionales sobre el grupo..."
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Grupo"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
