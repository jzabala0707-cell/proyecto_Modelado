import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { X } from "lucide-react";
import { BOOKING_STATUS_OPTIONS, SALIDA_OPTIONS } from "../bookingServices";
export function BookingsFilters({ filters, setFilters, onClear }) {
    const allStatuses = BOOKING_STATUS_OPTIONS;
    const uniqueTours = Array.from(
        new Map(
            (SALIDA_OPTIONS ?? []).map((s) => [s.tourNombre, { value: s.tourNombre, label: s.tourNombre }])
        ).values()
    );
    const allTours = [{ value: "all", label: "Todos los tours" }, ...uniqueTours];
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
                        <Label>Tour</Label>
                        <Select
                            value={filters.tour}
                            onValueChange={(value) => setFilters({ ...filters, tour: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tour" />
                            </SelectTrigger>
                            <SelectContent>
                                {allTours.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha desde</Label>
                        <Input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha hasta</Label>
                        <Input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                        />
                    </div>
                    <div className="flex items-end gap-2 md:col-span-4 justify-end">
                        <Button variant="outline" onClick={onClear}>
                            <X className="h-4 w-4 mr-2" /> Limpiar Filtros
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
