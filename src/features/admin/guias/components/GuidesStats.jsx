import { StatsGrid } from "@/features/admin/components/StatCard";
import { Users, UserCheck, Clock, Star, Eye, Pencil, Phone, Mail, MoreHorizontal, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { StatusBadge, guideStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { guideServices } from "../guideServices";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
export function GuideStats({ total, available, busy, inactive, avgRating, filtered }) {
    return (<StatsGrid stats={[
            { title: "Total Guías", value: total, icon: Users, color: "text-primary" },
            { title: "Disponibles", value: available, icon: UserCheck, color: "text-success" },
            { title: "Ocupados", value: busy, icon: Clock, color: "text-warning" },
            { title: "Rating Promedio", value: avgRating, icon: Star, color: "text-secondary" },
            { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-info" },
        ]} columns={5}/>);
}
export function GuidesTable({ guides, onDetail, onEdit, onDelete }) {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guía</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Tours</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guides.length === 0 ? (<EmptyState colSpan={6}/>) : (guides.map((g) => {
            const stars = guideServices.stars(g.rating);
            return (<TableRow key={g.id}>
                <TableCell>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-muted-foreground">Desde {g.joinedAt}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm"><Mail className="h-3 w-3"/>{g.email}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3"/>{g.phone}</div>
                </TableCell>
                <TableCell>{g.toursCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning"/>
                    <span className="font-semibold">{g.rating}</span>
                    <span className="text-xs text-muted-foreground">({stars.filled}/5)</span>
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={g.status} map={guideStatusMap}/></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onDetail(g)} style={{ color: "#ff9500" }}><Eye className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(g)} style={{ color: "#0d47a1" }}><Pencil className="h-4 w-4"/></Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4"/></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDelete(g)} className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>);
        }))}
      </TableBody>
    </Table>);
}
export function GuideDetailDialog({ open, onOpenChange, guide }) {
    if (!guide)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle del Guía</DialogTitle>
          <DialogDescription>Información completa de {guide.name}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Nombre</Label><Input disabled value={guide.name}/></div>
          <div><Label className="text-xs text-muted-foreground">Email</Label><Input disabled value={guide.email}/></div>
          <div><Label className="text-xs text-muted-foreground">Teléfono</Label><Input disabled value={guide.phone}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label>
            <div className="pt-2"><StatusBadge status={guide.status} map={guideStatusMap}/></div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Tours Realizados</Label><Input disabled value={String(guide.toursCount)}/></div>
          <div><Label className="text-xs text-muted-foreground">Rating</Label>
            <div className="pt-2 flex items-center gap-2"><Star className="h-4 w-4 text-warning fill-warning"/>{guide.rating}/5</div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Fecha Ingreso</Label><Input disabled value={guide.joinedAt}/></div>
          <div><Label className="text-xs text-muted-foreground">Dirección</Label><Input disabled value={guide.address ?? "N/A"}/></div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Idiomas</Label>
          <div className="flex flex-wrap gap-2">
            {(guide.languages ?? []).map((lang) => <Badge key={lang} variant="outline">{lang}</Badge>)}
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Especialidades</Label>
          <div className="flex flex-wrap gap-2">
            {(guide.specialties ?? []).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
          </div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
