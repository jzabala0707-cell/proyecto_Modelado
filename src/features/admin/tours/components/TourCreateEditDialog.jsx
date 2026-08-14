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
import { TOUR_TYPE_OPTIONS } from "../tourServices";

export function TourCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const handleLanguagesChange = (e) => {
        const value = e.target.value;
        const languages = value
            .split(",")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);
        setFormData({ ...formData, language: languages });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Tour" : "Crear Nuevo Tour"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información del tour" : "Ingresa los datos del nuevo tour"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                        <Label>Nombre del Tour</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Comuna 13 Tour"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {TOUR_TYPE_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Duración</Label>
                        <Input
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="3 horas"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Capacidad</Label>
                        <Input
                            type="number"
                            value={formData.capacity}
                            onChange={(e) =>
                                setFormData({ ...formData, capacity: Number(e.target.value) })
                            }
                            placeholder="12"
                            min={1}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Precio (COP)</Label>
                        <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: Number(e.target.value) })
                            }
                            placeholder="45000"
                            min={0}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.rating}
                            onChange={(e) =>
                                setFormData({ ...formData, rating: Number(e.target.value) })
                            }
                            placeholder="4.5"
                            min={0}
                            max={5}
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
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Descripción</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Descripción detallada del tour..."
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Idiomas (separados por coma)</Label>
                        <Textarea
                            value={(formData.language ?? []).join(", ")}
                            onChange={handleLanguagesChange}
                            placeholder="Español, Inglés, Francés"
                            rows={2}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Tour"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
