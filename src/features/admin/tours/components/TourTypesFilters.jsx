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
import { colorOptions } from "../tourServices";

export function TourTypesFilters({ filters, setFilters, onClear }) {
    const allColors = [{ value: "all", label: "Todos los colores" }, ...colorOptions];

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Color</Label>
                        <Select
                            value={filters.color}
                            onValueChange={(value) => setFilters({ ...filters, color: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar color" />
                            </SelectTrigger>
                            <SelectContent>
                                {allColors.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        <div className="flex items-center gap-2">
                                            {opt.value !== "all" && (
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full border"
                                                    style={{ backgroundColor: opt.value }}
                                                />
                                            )}
                                            {opt.label}
                                        </div>
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
