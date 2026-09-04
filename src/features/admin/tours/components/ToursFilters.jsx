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
import { TOUR_STATUS_OPTIONS, mockCategoriasTour } from "../tourServices";

const CATEGORIA_FILTER_OPTIONS = [
    { value: "all", label: "Todas las categorías" },
    ...(Array.isArray(mockCategoriasTour)
        ? mockCategoriasTour.map((c) => ({
              value: String(c.id_categoria ?? c.id),
              label: c.nombre,
          }))
        : []),
];

export function ToursFilters({ filters, setFilters, onClear }) {
    const allCategorias = CATEGORIA_FILTER_OPTIONS;
    const allStatuses = TOUR_STATUS_OPTIONS;

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <Label>Categoría</Label>
                        <Select
                            value={filters.id_categoria}
                            onValueChange={(value) =>
                                setFilters({ ...filters, id_categoria: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {allCategorias.map((opt) => (
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
