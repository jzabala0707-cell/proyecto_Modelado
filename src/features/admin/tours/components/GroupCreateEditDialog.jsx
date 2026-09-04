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
import { Badge } from "@/shared/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { mockTours } from "../tourServices";
import { mockGuides } from "@/features/admin/guias/guideServices";
import { salidaSchema } from "../validations/tourValidation";
import { ESTADO_SALIDA_OPTIONS } from "@/shared/constants/dbEnums";

const TOUR_OPTIONS = Array.isArray(mockTours)
    ? mockTours.map((t) => ({
          value: String(t.id_tour ?? t.id),
          label: t.nombre ?? t.name,
      }))
    : [];

const GUIA_OPTIONS = Array.isArray(mockGuides)
    ? mockGuides.map((g) => ({
          value: String(g.id_guia ?? g.id),
          label: g.nombre ?? g.name,
      }))
    : [];

export function GroupCreateEditDialog({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
}) {
    const form = useForm({
        defaultValues: { ...formData },
        resolver: zodResolver(salidaSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (open) {
            form.reset({ ...formData });
        }
    }, [open, formData, form]);

    const cupoMaximo = form.watch("cupo_maximo");
    const cuposDisponibles = cupoMaximo ? Number(cupoMaximo) : 0;

    const handleValidSubmit = (validData) => {
        const id_tour = validData.id_tour ? Number(validData.id_tour) : null;
        const id_guia = validData.id_guia ? Number(validData.id_guia) : null;
        const payload = {
            ...validData,
            id_tour,
            id_guia,
            cupo_maximo: validData.cupo_maximo
                ? Number(validData.cupo_maximo)
                : null,
            cupos_disponibles: validData.cupo_maximo
                ? Number(validData.cupo_maximo)
                : null,
        };
        setFormData(payload);
        onSubmit(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Salida" : "Crear Nueva Salida"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información de la salida del tour"
                            : "Ingresa los datos de la nueva salida"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="id_tour"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Tour</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            value={field.value != null ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar tour" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TOUR_OPTIONS.map((opt) => (
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
                                name="id_guia"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Guía (opcional)</FormLabel>
                                        <Select
                                            onValueChange={(v) =>
                                                field.onChange(v ? Number(v) : null)
                                            }
                                            value={
                                                field.value != null
                                                    ? String(field.value)
                                                    : undefined
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar guía (opcional)" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {GUIA_OPTIONS.map((opt) => (
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
                                name="fecha_salida"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Salida</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cupo_maximo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cupo Máximo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? ""
                                                            : Number(e.target.value)
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
                                name="hora_salida"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de Salida</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hora_finalizacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de Finalización (opcional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value)}
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
                                                {ESTADO_SALIDA_OPTIONS.map((opt) => (
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
                            <div className="space-y-2">
                                <FormLabel>Cupos Disponibles (inicial)</FormLabel>
                                <Badge variant="outline" className="h-9 px-3 w-full justify-center text-sm font-medium inline-flex">
                                    {cuposDisponibles} cupos
                                </Badge>
                            </div>
                            <FormField
                                control={form.control}
                                name="observaciones"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Observaciones</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Observaciones adicionales sobre la salida..."
                                                rows={3}
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
                                {isEdit ? "Guardar Cambios" : "Crear Salida"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
