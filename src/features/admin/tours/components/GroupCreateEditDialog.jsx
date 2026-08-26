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
import { GROUP_STATUS_OPTIONS, GUIDE_NAME_OPTIONS, mockTours } from "../tourServices";
import { mockGuides } from "@/features/admin/guias/guideServices";
import { groupSchema } from "../validations/tourValidation";

const TOUR_NAME_OPTIONS = mockTours.map((t) => ({
    value: t.id,
    label: t.name,
}));

const GUIDE_ID_OPTIONS = Array.isArray(mockGuides)
    ? mockGuides.map((g) => ({ value: g.id, label: g.name }))
    : GUIDE_NAME_OPTIONS.map((g) => g);

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
        resolver: zodResolver(groupSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (open) {
            form.reset({ ...formData });
        }
    }, [open, formData, form]);

    const handleValidSubmit = (validData) => {
        const tourId = Number(validData.tourName);
        const guideId = Number(validData.guideName);
        const payload = {
            ...validData,
            tourId: Number.isNaN(tourId) ? validData.tourName : tourId,
            guideId: Number.isNaN(guideId) ? validData.guideName : guideId,
        };
        setFormData(payload);
        onSubmit(payload);
    };

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="tourName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour (FK tour_id)</FormLabel>
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
                                                {TOUR_NAME_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={String(opt.value)}>
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
                                name="groupName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Grupo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Comuna 13 - Grupo 01"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="guideName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Guía (FK guide_id)</FormLabel>
                                        <Select
                                            onValueChange={(v) => field.onChange(Number(v))}
                                            value={field.value != null ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar guía" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {GUIDE_ID_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={String(opt.value)}>
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
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha</FormLabel>
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
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora Inicio</FormLabel>
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
                                name="maxCapacity"
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
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {GROUP_STATUS_OPTIONS.filter((o) => o.value !== "all").map((opt) => (
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
                                name="meetingPoint"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
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
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Notas</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Notas adicionales sobre el grupo..."
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
                                {isEdit ? "Guardar Cambios" : "Crear Grupo"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
