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
import { Textarea } from "@/shared/components/ui/textarea";

function parseCsvToArray(value) {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return String(value)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export function GuideCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const languagesText = Array.isArray(formData.languages)
        ? formData.languages.join(", ")
        : formData.languages ?? "";
    const specialtiesText = Array.isArray(formData.specialties)
        ? formData.specialties.join(", ")
        : formData.specialties ?? "";

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Guía" : "Crear Nuevo Guía"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del guía"
                            : "Ingresa los datos del nuevo guía"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label>Nombre Completo</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="juan@artetours.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+57 300 123 4567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => updateField("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Disponible</SelectItem>
                                <SelectItem value="busy">Ocupado</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label>Idiomas (separados por coma)</Label>
                        <Input
                            value={languagesText}
                            onChange={(e) =>
                                updateField("languages", parseCsvToArray(e.target.value))
                            }
                            placeholder="Español, Inglés, Francés"
                        />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label>Especialidades (separadas por coma)</Label>
                        <Input
                            value={specialtiesText}
                            onChange={(e) =>
                                updateField("specialties", parseCsvToArray(e.target.value))
                            }
                            placeholder="Comuna 13, Food Tour, City Tour"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Dirección</Label>
                        <Input
                            value={formData.address}
                            onChange={(e) => updateField("address", e.target.value)}
                            placeholder="Medellín, Colombia"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Biografía</Label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => updateField("bio", e.target.value)}
                            placeholder="Breve descripción del guía, experiencia, etc."
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Guía"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
