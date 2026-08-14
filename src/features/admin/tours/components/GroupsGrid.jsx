import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Eye, Users, Calendar } from "lucide-react";
import { StatusBadge, groupStatusMap } from "@/features/admin/components/StatusBadge";
import { tourServices } from "../tourServices";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
function participantInitials(p) {
    return p.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
export function GroupsGrid({ groups, onDetail }) {
    if (groups.length === 0)
        return <div className="text-center py-12 text-muted-foreground">No se encontraron grupos</div>;
    return (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((g) => {
            const occ = tourServices.occupancyPercentage(g);
            return (<Card key={g.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{g.groupName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{g.tourName}</p>
                </div>
                <StatusBadge status={g.status} map={groupStatusMap}/>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground"/>{g.participants.length}/{g.maxCapacity} participantes</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground"/>{g.date} · {g.startTime}</div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Ocupación</span><span className="font-medium">{occ}%</span></div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${tourServices.occupancyColor(occ)}`} style={{ width: `${occ}%` }}/>
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Guía: </span>
                  <span className="font-medium">{g.guideName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => onDetail(g)} style={{ color: "#ff9500" }}>
                  <Eye className="h-4 w-4 mr-2"/>Ver detalle
                </Button>
              </div>
            </CardContent>
          </Card>);
        })}
    </div>);
}
export function GroupDetailDialog({ open, onOpenChange, group }) {
    if (!group)
        return null;
    const occ = tourServices.occupancyPercentage(group);
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{group.groupName}</DialogTitle>
          <DialogDescription>Detalle del grupo</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Tour</Label><Input disabled value={group.tourName}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={group.status} map={groupStatusMap}/></div></div>
          <div><Label className="text-xs text-muted-foreground">Fecha</Label><Input disabled value={group.date}/></div>
          <div><Label className="text-xs text-muted-foreground">Hora inicio</Label><Input disabled value={group.startTime}/></div>
          <div><Label className="text-xs text-muted-foreground">Guía asignado</Label><Input disabled value={group.guideName}/></div>
          <div><Label className="text-xs text-muted-foreground">Capacidad</Label><Input disabled value={`${group.participants.length}/${group.maxCapacity} (${occ}%)`}/></div>
          <div className="col-span-2"><Label className="text-xs text-muted-foreground">Punto de encuentro</Label><Input disabled value={group.meetingPoint ?? "N/A"}/></div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm">Participantes ({group.participants.length})</Label>
          </div>
          <div className="space-y-2">
            {group.participants.map((p) => (<div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{participantInitials(p)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.nationality}</div>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{p.phone}</div>
                  <div>{p.email}</div>
                </div>
              </div>))}
          </div>
        </div>

        {group.notes && (<div className="border-t pt-4 space-y-2">
            <Label>Notas</Label>
            <p className="text-sm text-muted-foreground bg-muted/40 rounded p-3">{group.notes}</p>
          </div>)}

        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
