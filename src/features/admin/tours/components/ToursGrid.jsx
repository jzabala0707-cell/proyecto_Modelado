import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Calendar, Users, DollarSign, Star, Eye } from "lucide-react";
import { StatusBadge, userStatusMap } from "@/features/admin/components/StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function ToursGrid({ tours, onDetail }) {
    if (tours.length === 0) {
        return (<div className="text-center py-12 text-muted-foreground">
        No se encontraron tours
      </div>);
    }
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (<Card key={tour.id} className="overflow-hidden">
          <div className="h-40 w-full bg-cover bg-center" style={{
                backgroundImage: `url(https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`Medellín Colombia ${tour.name} tour view, scenic landscape, daylight, photography`)}&image_size=landscape_16_9)`,
            }}/>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{tour.type}</Badge>
              <StatusBadge status={tour.status} map={userStatusMap}/>
            </div>
            <CardTitle className="mt-2">{tour.name}</CardTitle>
            <CardDescription className="line-clamp-2">{tour.description ?? "Tour sin descripción."}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground"/><span>{tour.duration}</span></div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground"/><span>{tour.capacity} pers.</span></div>
              <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground"/><span>${tour.price.toLocaleString()}</span></div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-warning fill-warning"/><span>{tour.rating}</span></div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full" onClick={() => onDetail(tour)} style={{ color: "#ff9500" }}>
              <Eye className="h-4 w-4 mr-2"/>Ver detalle
            </Button>
          </CardFooter>
        </Card>))}
    </div>);
}
export function TourDetailDialog({ open, onOpenChange, tour }) {
    if (!tour)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Detalle del Tour</DialogTitle>
          <DialogDescription>Información completa del tour</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Nombre</Label><Input disabled value={tour.name}/></div>
          <div><Label className="text-xs text-muted-foreground">Tipo</Label><Input disabled value={tour.type}/></div>
          <div><Label className="text-xs text-muted-foreground">Duración</Label><Input disabled value={tour.duration}/></div>
          <div><Label className="text-xs text-muted-foreground">Capacidad</Label><Input disabled value={`${tour.capacity} personas`}/></div>
          <div><Label className="text-xs text-muted-foreground">Precio</Label><Input disabled value={`$${tour.price.toLocaleString()}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={tour.status} map={userStatusMap}/></div></div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Idiomas</Label>
          <div className="flex flex-wrap gap-2">
            {(tour.language ?? ["Español"]).map((l) => (<Badge key={l} variant="outline">{l}</Badge>))}
          </div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
