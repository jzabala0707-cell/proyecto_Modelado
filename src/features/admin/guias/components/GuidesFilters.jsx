import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { GUIDE_LANGUAGE_OPTIONS, GUIDE_SPECIALTY_OPTIONS } from "../guideServices";

export function GuidesFilters({ filters, setFilters, onClear }) {
    const allLanguages = [{ value: "all", label: "Todos los idiomas" }, ...GUIDE_LANGUAGE_OPTIONS];
    const allSpecialties = [{ value: "all", label: "Todas las especialidades" }, ...GUIDE_SPECIALTY_OPTIONS];

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            value={filters.status}
                            onValueChange={(value) => setFilters({ ...filters, status: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="active">Disponible</SelectItem>
                                <SelectItem value="busy">Ocupado</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Idioma</Label>
                        <Select
                            value={filters.language}
                            onValueChange={(value) => setFilters({ ...filters, language: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                {allLanguages.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Especialidad</Label>
                        <Select
                            value={filters.specialty}
                            onValueChange={(value) => setFilters({ ...filters, specialty: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar especialidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {allSpecialties.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
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
