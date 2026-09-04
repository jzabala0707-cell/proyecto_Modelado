import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Users, Calendar, MapPin, Clock, Eye } from "lucide-react";
import { StatusBadge } from "@/features/admin/components/StatusBadge";
import { mockTours, tourServices } from "../tourServices";
import { mockGuides } from "@/features/admin/guias/guideServices";
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
import { Textarea } from "@/shared/components/ui/textarea";

const salidaStatusMap = {
    PROGRAMADA: { label: "Programada", variant: "secondary" },
    DISPONIBLE: { label: "Disponible", variant: "default" },
    COMPLETA: { label: "Completa", variant: "outline" },
    CANCELADA: { label: "Cancelada", variant: "destructive" },
    FINALIZADA: { label: "Finalizada", variant: "outline" },
};

function tourName(id_tour) {
    const t = mockTours.find((x) => String(x.id_tour ?? x.id) === String(id_tour));
    return t?.nombre ?? t?.name ?? "—";
}
function tourMeetingPoint(id_tour) {
    const t = mockTours.find((x) => String(x.id_tour ?? x.id) === String(id_tour));
    return t?.punto_encuentro ?? t.meetingPoint ?? "N/A";
}
function guideName(id_guia) {
    if (!id_guia) return "Sin asignar";
    const g = mockGuides.find((x) => String(x.id_guia ?? x.id) === String(id_guia));
    return g?.name ?? (g ? `${g.nombre ?? ""} ${g.apellido ?? ""}`.trim() : "—");
}

export function GroupsGrid({ groups, onDetail }) {
    const items = groups;
    if (items.length === 0)
        return (
            <div className="text-center py-12 text-muted-foreground">
                No se encontraron salidas
            </div>
        );
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((s) => {
                const disp = s.cupos_disponibles ?? s.cupo_maximo;
                const max = s.cupo_maximo ?? 0;
                const pct = max > 0 ? Math.round(((max - disp) / max) * 100) : 0;
                return (
                    <Card key={s.id_salida ?? s.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">
                                        {tourName(s.id_tour ?? s.tourId ?? s.tour)}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Salida #{s.id_salida ?? s.id} ·{" "}
                                        {guideName(s.id_guia ?? s.guideId ?? s.guide)}
                                    </p>
                                </div>
                                <StatusBadge
                                    status={s.estado ?? s.status}
                                    map={salidaStatusMap}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {s.fecha_salida ?? s.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {s.hora_salida ?? s.startTime}
                                    {s.hora_finalizacion ? ` – ${s.hora_finalizacion}` : ""}
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="truncate">
                                        {tourMeetingPoint(s.id_tour ?? s.tourId ?? s.tour)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    {disp}/{max} cupos
                                </div>
                                <div className="text-sm text-muted-foreground text-right">
                                    Ocupación {pct}%
                                </div>
                            </div>
                            <div>
                                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={`h-full ${tourServices.occupancyColor(pct)}`}
                                        style={{ width: `${Math.min(100, pct)}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t pt-3">
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Guía: </span>
                                    <span className="font-medium">
                                        {guideName(s.id_guia ?? s.guideId ?? s.guide)}
                                    </span>
                                </div>
                                {onDetail && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDetail(s)}
                                        style={{ color: "#ff9500" }}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ver detalle
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

export function GroupDetailDialog({ open, onOpenChange, group }) {
    const s = group;
    if (!s) return null;
    const disp = s.cupos_disponibles ?? s.cupo_maximo;
    const max = s.cupo_maximo ?? 0;
    const pct = max > 0 ? Math.round(((max - disp) / max) * 100) : 0;
    const id_tour = s.id_tour ?? s.tourId ?? s.tour;
    const id_guia = s.id_guia ?? s.guideId ?? s.guide;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Salida #{s.id_salida ?? s.id} — {tourName(id_tour)}
                    </DialogTitle>
                    <DialogDescription>Detalle de la salida de tour</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                        <Label className="text-xs text-muted-foreground">Tour</Label>
                        <Input disabled value={tourName(id_tour)} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Estado</Label>
                        <div className="pt-2">
                            <StatusBadge
                                status={s.estado ?? s.status}
                                map={salidaStatusMap}
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Fecha</Label>
                        <Input disabled value={s.fecha_salida ?? s.date ?? ""} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Hora salida</Label>
                        <Input disabled value={s.hora_salida ?? s.startTime ?? ""} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">
                            Hora finalización
                        </Label>
                        <Input disabled value={s.hora_finalizacion ?? ""} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Guía asignado</Label>
                        <Input disabled value={guideName(id_guia)} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Cupos</Label>
                        <Input disabled value={`${disp}/${max} (${pct}%)`} />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Cupos disponibles</Label>
                        <Input disabled value={String(disp)} />
                    </div>
                    <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground">
                            Punto de encuentro (desde Tour)
                        </Label>
                        <Input disabled value={tourMeetingPoint(id_tour)} />
                    </div>
                </div>

                {s.observaciones ?? s.notes ? (
                    <div className="border-t pt-4 space-y-2">
                        <Label>Observaciones</Label>
                        <Textarea
                            disabled
                            value={s.observaciones ?? s.notes ?? ""}
                            className="resize-none"
                            rows={4}
                        />
                    </div>
                ) : null}

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
