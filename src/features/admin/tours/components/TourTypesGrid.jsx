import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Palette, Eye, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function TourTypesGrid({ types, onDetail }) {
    if (types.length === 0) {
        return <div className="text-center py-12 text-muted-foreground">No se encontraron tipos</div>;
    }
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map((t) => (<Card key={t.id} className="overflow-hidden hover:shadow-md transition">
          <div className="h-2 w-full" style={{ backgroundColor: t.color }}/>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${t.color}20`, color: t.color }}>
                <Palette className="h-5 w-5"/>
              </div>
              <div>
                <CardTitle>{t.name}</CardTitle>
                <div className="text-xs text-muted-foreground">{t.count} tours · {t.activeTours} activos</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </CardContent>
          <CardFooter className="gap-2 border-t pt-4">
            <Button variant="outline" size="sm" onClick={() => onDetail(t)} style={{ color: "#ff9500" }}>
              <Eye className="h-4 w-4 mr-2"/>Detalle
            </Button>
            <Button variant="outline" size="sm" style={{ color: "#0d47a1" }}><Pencil className="h-4 w-4 mr-2"/>Editar</Button>
            <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4 mr-2"/>Eliminar</Button>
          </CardFooter>
        </Card>))}
    </div>);
}
export function TourTypeDetailDialog({ open, onOpenChange, type }) {
    if (!type)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalle Tipo de Tour</DialogTitle>
          <DialogDescription>Información del tipo de tour</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Nombre</Label><Input disabled value={type.name}/></div>
          <div><Label className="text-xs text-muted-foreground">Color</Label>
            <div className="h-10 rounded-md border" style={{ backgroundColor: type.color }}/>
          </div>
          <div><Label className="text-xs text-muted-foreground">Tours Totales</Label><Input disabled value={String(type.count)}/></div>
          <div><Label className="text-xs text-muted-foreground">Tours Activos</Label><Input disabled value={String(type.activeTours)}/></div>
          <div className="col-span-2"><Label className="text-xs text-muted-foreground">Descripción</Label><Input disabled value={type.description}/></div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
