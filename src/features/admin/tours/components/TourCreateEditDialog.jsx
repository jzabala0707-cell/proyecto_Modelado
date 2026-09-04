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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
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
import { mockCategoriasTour } from "../tourServices";
import { tourSchema } from "../validations/tourValidation";
import { ESTADO_TOUR_OPTIONS, DIFICULTAD_OPTIONS } from "@/shared/constants/dbEnums";

const CATEGORIA_OPTIONS = Array.isArray(mockCategoriasTour)
    ? mockCategoriasTour.map((c) => ({
          value: String(c.id_categoria ?? c.id),
          label: c.nombre,
      }))
    : [];

export function TourCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const form = useForm({
        defaultValues: { ...formData },
        resolver: zodResolver(tourSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (open) {
            form.reset({ ...formData });
        }
    }, [open, formData, form]);

    const handleValidSubmit = (validData) => {
        const payload = {
            ...validData,
            id_categoria: validData.id_categoria
                ? Number(validData.id_categoria)
                : null,
        };
        setFormData(payload);
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[720px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Tour" : "Crear Nuevo Tour"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Actualiza la información del tour" : "Ingresa los datos del nuevo tour"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Nombre del Tour</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Comuna 13 Tour"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="id_categoria"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoría</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            value={field.value != null ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar categoría" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CATEGORIA_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duracion_horas"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duración (horas)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.5"
                                                min="0"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="Ej: 3.5"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="capacidad_maxima"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacidad Máxima</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="12"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="precio_base"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio Base (COP)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="45000"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="estado"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar estado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ESTADO_TOUR_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="punto_encuentro"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Punto de Encuentro</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Estación San Javier (Metro)"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destino"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destino</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Comuna 13, Medellín"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dificultad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dificultad</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar dificultad" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {DIFICULTAD_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="edad_minima"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edad Mínima</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="Ej: 8"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="edad_maxima"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edad Máxima</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="Ej: 80"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="latitud"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitud</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.000001"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="6.2442"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="longitud"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitud</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.000001"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                placeholder="-75.5812"
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                                placeholder="Descripción detallada del tour..."
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="incluye"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Incluye</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Guía, transporte, entradas, refrigerio..."
                                                rows={2}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="no_incluye"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>No Incluye</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Almuerzo, propinas, transporte a punto encuentro..."
                                                rows={2}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="recomendaciones"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Recomendaciones</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Zapatos cómodos, gorra, bloqueador solar, agua..."
                                                rows={2}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="politica_cancelacion"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Política de Cancelación</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Cancelación con 48h de antelación..."
                                                rows={2}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Guardar Cambios" : "Crear Tour"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
