import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Palette, Eye } from "lucide-react";
import { StatusBadge } from "@/features/admin/components/StatusBadge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";

const activoMap = {
    true: { label: "Activa", variant: "default" },
    false: { label: "Inactiva", variant: "secondary" },
};

export function TourTypesGrid({ types, onDetail }) {
    if (types.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No se encontraron categorías
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((c) => (
                <Card
                    key={c.id_categoria ?? c.id}
                    className="overflow-hidden hover:shadow-md transition"
                >
                    <div
                        className="h-2 w-full"
                        style={{ backgroundColor: c.color ?? "#e5e7eb" }}
                    />
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div
                                className="p-2 rounded-full"
                                style={{
                                    backgroundColor: `${c.color ?? "#e5e7eb"}20`,
                                    color: c.color ?? "#6b7280",
                                }}
                            >
                                <Palette className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <CardTitle>{c.nombre ?? c.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <StatusBadge
                                        status={
                                            c.activo !== undefined
                                                ? String(c.activo)
                                                : c.active !== undefined
                                                  ? String(c.active)
                                                  : "true"
                                        }
                                        map={activoMap}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {c.descripcion ?? c.description ?? "Sin descripción."}
                        </p>
                    </CardContent>
                    <CardFooter className="gap-2 border-t pt-4">
                        {onDetail && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDetail(c)}
                                style={{ color: "#ff9500" }}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Detalle
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export function TourTypeDetailDialog({ open, onOpenChange, type }) {
    const c = type;
    if (!c) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalle Categoría de Tour</DialogTitle>
                    <DialogDescription>Información de la categoría</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                        <Label className="text-xs text-muted-foreground">Nombre</Label>
                        <Input disabled value={c.nombre ?? c.name ?? ""} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Color</Label>
                        <div
                            className="h-10 rounded-md border"
                            style={{ backgroundColor: c.color ?? "#e5e7eb" }}
                        />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Estado</Label>
                        <div className="pt-2">
                            <StatusBadge
                                status={
                                    c.activo !== undefined
                                        ? String(c.activo)
                                        : c.active !== undefined
                                          ? String(c.active)
                                          : "true"
                                }
                                map={activoMap}
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">ID</Label>
                        <Input disabled value={String(c.id_categoria ?? c.id ?? "")} />
                    </div>
                    <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground">Descripción</Label>
                        <Input disabled value={c.descripcion ?? c.description ?? ""} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
