import { useEffect } from "react";
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
import { Badge } from "@/shared/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { colorOptions } from "../tourServices";
import { tourTypeSchema } from "../validations/tourValidation";
export function TourTypeCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const form = useForm({
        resolver: zodResolver(tourTypeSchema),
        defaultValues: formData,
        mode: "onSubmit",
    });

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = form.handleSubmit((datos) => {
        onSubmit(datos);
    });

    const count = Number(formData.count ?? 0);
    const active = Number(formData.activeTours ?? 0);

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
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Cultural"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, name: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Descripción del tipo de tour..."
                                                rows={3}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, description: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setFormData({ ...formData, color: value });
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar color" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormLabel>Total Tours (calculado, solo lectura)</FormLabel>
                                    <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex">
                                        {count} Tours
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <FormLabel>Tours Activos (calculado, solo lectura)</FormLabel>
                                    <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm inline-flex">
                                        {active} Activos
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Color seleccionado</FormLabel>
                                <div
                                    className="h-10 rounded-md border flex items-center justify-center text-xs text-white font-medium"
                                    style={{ backgroundColor: formData.color }}
                                >
                                    {formData.color}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Guardar Cambios" : "Crear Tipo"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
