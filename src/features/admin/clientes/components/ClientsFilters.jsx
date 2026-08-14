import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { CLIENT_STATUS_OPTIONS, NATIONALITY_OPTIONS } from "@/features/admin/reservas/bookingServices";
export function ClientsFilters({ filters, setFilters, onClear }) {
    const allStatuses = CLIENT_STATUS_OPTIONS;
    const allNationalities = [{ value: "all", label: "Todas las nacionalidades" }, ...NATIONALITY_OPTIONS];
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
                                {allStatuses.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Nacionalidad</Label>
                        <Select
                            value={filters.nationality}
                            onValueChange={(value) => setFilters({ ...filters, nationality: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar nacionalidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {allNationalities.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>VIP</Label>
                        <Select
                            value={filters.vip}
                            onValueChange={(value) => setFilters({ ...filters, vip: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filtro VIP" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="yes">Sí, VIP</SelectItem>
                                <SelectItem value="no">No VIP</SelectItem>
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
