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
import { Badge } from "@/shared/components/ui/badge";
import { TOUR_TYPE_OPTIONS, LANGUAGE_OPTIONS } from "../tourServices";
import { tourSchema } from "../validations/tourValidation";
import { X } from "lucide-react";

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
        const tourTypeId = Number(validData.type);
        const languageIds = Array.isArray(validData.language)
            ? validData.language.filter((v) => !Number.isNaN(Number(v))).map(Number)
            : [];
        const payload = {
            ...validData,
            tourTypeId: Number.isNaN(tourTypeId) ? null : tourTypeId,
            languageIds,
            rating: validData.rating ?? 0,
        };
        setFormData(payload);
        onSubmit(payload);
    };

    const toggleChip = (field, options, optionId) => {
        const currentIds = Array.isArray(field.value) ? field.value.map(String) : [];
        const idStr = String(optionId);
        const nextIds = currentIds.includes(idStr)
            ? currentIds.filter((id) => id !== idStr)
            : [...currentIds, idStr];
        const nextValues = nextIds.map((id) => {
            const opt = options.find((o) => String(o.value) === id);
            return opt ? String(opt.value) : id;
        });
        field.onChange(nextValues);
    };

    const removeChip = (field, id) => {
        const currentIds = Array.isArray(field.value) ? field.value.map(String) : [];
        const nextIds = currentIds.filter((v) => String(v) !== String(id));
        field.onChange(nextIds);
    };

    const renderLanguageChips = (field) => {
        const currentIds = Array.isArray(field.value) ? field.value.map(String) : [];
        const labelsSelected = LANGUAGE_OPTIONS.filter((o) => currentIds.includes(String(o.value)));
        const unselected = LANGUAGE_OPTIONS.filter((o) => !currentIds.includes(String(o.value)));
        return (
            <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 min-h-[36px] border rounded-md px-3 py-2 bg-background focus-within:ring-1 focus-within:ring-ring">
                    {labelsSelected.length === 0
                        ? (<span className="text-muted-foreground text-sm self-center">Selecciona idiomas...</span>)
                        : labelsSelected.map((opt) => (
                            <Badge key={opt.value} variant="secondary" className="flex items-center gap-1 pr-1">
                                {opt.label}
                                <button
                                    type="button"
                                    onClick={() => removeChip(field, opt.value)}
                                    className="rounded-sm opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring px-1"
                                    aria-label={`Quitar ${opt.label}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                </div>
                {unselected.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {unselected.map((opt) => (
                            <button
                                type="button"
                                key={opt.value}
                                onClick={() => toggleChip(field, LANGUAGE_OPTIONS, opt.value)}
                                className="text-xs rounded-md border border-dashed px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-solid transition"
                            >
                                + {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
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
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TOUR_TYPE_OPTIONS.map((opt) => (
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
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duración</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="3 horas"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacidad</FormLabel>
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
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio (COP)</FormLabel>
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
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rating (calculado - solo lectura)</FormLabel>
                                        <FormControl>
                                            <Badge variant="outline" className="h-9 px-3 justify-center text-sm font-medium gap-2 inline-flex w-full">
                                                ⭐ <span>{field.value ? Number(field.value).toFixed(1) : "0.0"}</span>
                                                <span className="text-muted-foreground text-xs ml-auto">Promedio reviews</span>
                                            </Badge>
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
                                                <SelectItem value="active">Activo</SelectItem>
                                                <SelectItem value="inactive">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
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
                                name="language"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Idiomas (tabla puente tour_languages)</FormLabel>
                                        <FormControl>
                                            {renderLanguageChips(field)}
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
