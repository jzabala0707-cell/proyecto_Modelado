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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/shared/components/ui/form";
import { Badge } from "@/shared/components/ui/badge";
import { guideSchema } from "../validations/guideValidation";
import { GUIDE_LANGUAGE_OPTIONS, GUIDE_SPECIALTY_OPTIONS } from "../guideServices";
import { X } from "lucide-react";

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
    const form = useForm({
        resolver: zodResolver(guideSchema),
        defaultValues: formData,
        mode: "onSubmit",
    });

    useEffect(() => {
        if (open) {
            form.reset(formData);
        }
    }, [open, formData, form]);

    const handleSubmit = form.handleSubmit((datos) => {
        const languageIds = Array.isArray(datos.languages)
            ? datos.languages.filter((v) => !Number.isNaN(Number(v))).map(Number)
            : [];
        const specialtyIds = Array.isArray(datos.specialties)
            ? datos.specialties.filter((v) => !Number.isNaN(Number(v))).map(Number)
            : [];
        const payload = {
            ...datos,
            languageIds,
            specialtyIds,
        };
        onSubmit(payload);
    });

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

    const renderChipBag = (field, options, placeholder) => {
        const currentIds = Array.isArray(field.value) ? field.value.map(String) : [];
        const labelsSelected = options.filter((o) => currentIds.includes(String(o.value)));
        const unselected = options.filter((o) => !currentIds.includes(String(o.value)));
        return (
            <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 min-h-[36px] border rounded-md px-3 py-2 bg-background focus-within:ring-1 focus-within:ring-ring">
                    {labelsSelected.length === 0
                        ? (<span className="text-muted-foreground text-sm self-center">{placeholder}</span>)
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
                                onClick={() => toggleChip(field, options, opt.value)}
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
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Guía" : "Crear Nuevo Guía"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Actualiza la información del guía"
                            : "Ingresa los datos del nuevo guía"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-0">
                        <div className="grid grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre Completo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Juan Pérez"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, name: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="juan@artetours.com"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, email: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="+57 300 123 4567"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, phone: e.target.value });
                                                }}
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
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setFormData({ ...formData, status: value });
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Disponible</SelectItem>
                                                <SelectItem value="busy">Ocupado</SelectItem>
                                                <SelectItem value="inactive">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="languages"
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Idiomas (tabla puente guide_languages)</FormLabel>
                                        <FormControl>
                                            {renderChipBag(field, GUIDE_LANGUAGE_OPTIONS, "Selecciona idiomas...")}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specialties"
                                render={({ field }) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Especialidades (tabla puente guide_specialties)</FormLabel>
                                        <FormControl>
                                            {renderChipBag(field, GUIDE_SPECIALTY_OPTIONS, "Selecciona especialidades...")}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Medellín, Colombia"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, address: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Biografía</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Breve descripción del guía, experiencia, etc."
                                                rows={3}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({ ...formData, bio: e.target.value });
                                                }}
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
                                {isEdit ? "Guardar Cambios" : "Crear Guía"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
