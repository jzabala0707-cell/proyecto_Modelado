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
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
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

    const colorValue = form.watch("color") || "";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar Categoría de Tour" : "Crear Nueva Categoría de Tour"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información de la categoría"
                            : "Ingresa los datos de la nueva categoría"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Cultural"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        nombre: e.target.value,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="descripcion"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Descripción de la categoría..."
                                                rows={3}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        descripcion: e.target.value,
                                                    });
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
                                    <FormItem className="col-span-2">
                                        <FormLabel>Color (opcional)</FormLabel>
                                        <div className="flex items-center gap-3">
                                            <FormControl>
                                                <Input
                                                    type="color"
                                                    className="w-14 h-10 p-1 cursor-pointer"
                                                    value={colorValue || "#000000"}
                                                    onChange={(e) => {
                                                        const hex = e.target.value;
                                                        field.onChange(hex);
                                                        setFormData({
                                                            ...formData,
                                                            color: hex,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    placeholder="#FF8A3D"
                                                    value={colorValue}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        field.onChange(val);
                                                        setFormData({
                                                            ...formData,
                                                            color: val,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormDescription>
                                            Código hexadecimal del color (ej: #FF8A3D).
                                        </FormDescription>
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="activo"
                                render={({ field }) => (
                                    <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Activo</FormLabel>
                                            <FormDescription>
                                                La categoría estará disponible para los tours.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    setFormData({
                                                        ...formData,
                                                        activo: checked,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Guardar Cambios" : "Crear Categoría"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
