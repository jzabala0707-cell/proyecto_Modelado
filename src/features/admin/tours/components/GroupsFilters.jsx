import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { SALIDA_STATUS_OPTIONS, mockTours } from "../tourServices";
import { mockGuides } from "@/features/admin/guias/guideServices";

const STATUS_FILTER_OPTIONS = SALIDA_STATUS_OPTIONS;

const GUIA_FILTER_OPTIONS = [
    { value: "all", label: "Todos los guías" },
    ...(Array.isArray(mockGuides)
        ? mockGuides.map((g) => ({
              value: String(g.id_guia ?? g.id),
              label: g.nombre ?? g.name,
          }))
        : []),
];

const TOUR_FILTER_OPTIONS = [
    { value: "all", label: "Todos los tours" },
    ...(Array.isArray(mockTours)
        ? mockTours.map((t) => ({
              value: String(t.id_tour ?? t.id),
              label: t.nombre ?? t.name,
          }))
        : []),
];

export function GroupsFilters({ filters, setFilters, onClear }) {
    const allStatuses = STATUS_FILTER_OPTIONS;
    const allGuides = GUIA_FILTER_OPTIONS;
    const allTours = TOUR_FILTER_OPTIONS;

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            value={filters.estado}
                            onValueChange={(value) =>
                                setFilters({ ...filters, estado: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {allStatuses.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tour</Label>
                        <Select
                            value={filters.id_tour}
                            onValueChange={(value) =>
                                setFilters({ ...filters, id_tour: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tour" />
                            </SelectTrigger>
                            <SelectContent>
                                {allTours.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Guía</Label>
                        <Select
                            value={filters.id_guia}
                            onValueChange={(value) =>
                                setFilters({ ...filters, id_guia: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar guía" />
                            </SelectTrigger>
                            <SelectContent>
                                {allGuides.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end gap-2">
                        <Button variant="outline" onClick={onClear} className="w-full">
                            <X className="h-4 w-4 mr-2" /> Limpiar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
