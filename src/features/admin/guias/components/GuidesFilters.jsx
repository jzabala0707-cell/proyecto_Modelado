import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { IDIOMA_OPTIONS } from "../guideServices";
import { ESTADO_USUARIO_OPTIONS } from "@/shared/constants/dbEnums";

export function GuidesFilters({ filters, setFilters, onClear }) {
    const allIdiomas = [{ value: "all", label: "Todos los idiomas" }, ...IDIOMA_OPTIONS];

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label>Estado Usuario</Label>
                        <Select
                            value={filters.estado_usuario}
                            onValueChange={(value) => setFilters({ ...filters, estado_usuario: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                {ESTADO_USUARIO_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Disponibilidad</Label>
                        <Select
                            value={filters.disponibilidad}
                            onValueChange={(value) => setFilters({ ...filters, disponibilidad: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar disponibilidad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="disponible">Disponible</SelectItem>
                                <SelectItem value="no_disponible">No Disponible</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Activo en Sistema</Label>
                        <Select
                            value={filters.activo}
                            onValueChange={(value) => setFilters({ ...filters, activo: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Idioma</Label>
                        <Select
                            value={filters.id_idioma}
                            onValueChange={(value) => setFilters({ ...filters, id_idioma: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                {allIdiomas.map((opt) => (
                                    <SelectItem key={opt.value} value={String(opt.value)}>
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
