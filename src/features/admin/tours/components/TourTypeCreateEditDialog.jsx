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
import { colorOptions } from "../tourServices";

export function TourTypeCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Tipo de Tour" : "Crear Nuevo Tipo de Tour"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del tipo de tour"
                            : "Ingresa los datos del nuevo tipo de tour"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                        <Label>Nombre</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Cultural"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Descripción</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Descripción del tipo de tour..."
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Color</Label>
                        <Select
                            value={formData.color}
                            onValueChange={(value) => setFormData({ ...formData, color: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar color" />
                            </SelectTrigger>
                            <SelectContent>
                                {colorOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="inline-block h-3 w-3 rounded-full border"
                                                style={{ backgroundColor: opt.value }}
                                            />
                                            {opt.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Color seleccionado</Label>
                        <div
                            className="h-10 rounded-md border flex items-center justify-center text-xs text-white font-medium"
                            style={{ backgroundColor: formData.color }}
                        >
                            {formData.color}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        {isEdit ? "Guardar Cambios" : "Crear Tipo"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
