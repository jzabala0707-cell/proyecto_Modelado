import { StatsGrid } from "@/features/admin/components/StatCard";
import { Users, UserCheck, Clock, Star, Eye, Pencil, Phone, Mail, MoreHorizontal, Search, CheckCircle2, XCircle, Award, Languages } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { StatusBadge, estadoUsuarioMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { guideServices, IDIOMA_OPTIONS, CERTIFICACION_OPTIONS } from "../guideServices";
import { NIVEL_IDIOMA_OPTIONS } from "@/shared/constants/dbEnums";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

export function GuideStats({ total, disponibles, ocupados, inactivos, avgRating, filtered }) {
    return (<StatsGrid stats={[
            { title: "Total Guías", value: total, icon: Users, color: "text-primary" },
            { title: "Disponibles", value: disponibles, icon: UserCheck, color: "text-success" },
            { title: "Ocupados", value: ocupados, icon: Clock, color: "text-warning" },
            { title: "Inactivos", value: inactivos, icon: XCircle, color: "text-destructive" },
            { title: "Rating Promedio", value: avgRating, icon: Star, color: "text-secondary" },
            { title: "Resultados Filtrados", value: filtered, icon: Search, color: "text-info" },
        ]} columns={6}/>);
}

export function GuidesTable({ guides, onDetail, onEdit, onDelete }) {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guía</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Especialidad</TableHead>
          <TableHead>Tours</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guides.length === 0 ? (<EmptyState colSpan={7}/>) : (guides.map((g) => {
            const stars = guideServices.stars(g.rating);
            const id = g.id_guia ?? g.id_usuario;
            return (<TableRow key={id}>
                <TableCell>
                  <div className="font-medium">
                    {(g.firstName ?? "") + " " + (g.lastName ?? "")}
                  </div>
                  <div className="text-xs text-muted-foreground">Desde {g.joinedAt}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm"><Mail className="h-3 w-3"/>{g.correo}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3"/>{g.telefono}</div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                    {g.especialidad || "—"}
                </TableCell>
                <TableCell>{g.toursCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning"/>
                    <span className="font-semibold">{g.rating}</span>
                    <span className="text-xs text-muted-foreground">({stars.filled}/5)</span>
                  </div>
                </TableCell>
                <TableCell>
                    <StatusBadge status={g.estado} map={estadoUsuarioMap}/>
                </TableCell>
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
    const id = guide.id_guia ?? guide.id_usuario;
    const nombreCompleto = (guide.firstName ?? "") + " " + (guide.lastName ?? "");

    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] max-h-[88vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Detalle del Guía</DialogTitle>
          <DialogDescription>Información completa de {nombreCompleto}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">ID Guía</Label><Input disabled value={String(id)}/></div>
            <div><Label className="text-xs text-muted-foreground">ID Usuario</Label><Input disabled value={String(guide.id_usuario ?? id)}/></div>
            <div><Label className="text-xs text-muted-foreground">Nombre</Label><Input disabled value={guide.firstName ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Apellido</Label><Input disabled value={guide.lastName ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Correo</Label><Input disabled value={guide.correo ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Teléfono</Label><Input disabled value={guide.telefono ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Tipo Documento</Label><Input disabled value={guide.tipo_documento ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Número Documento</Label><Input disabled value={guide.numero_documento ?? ""}/></div>
            <div><Label className="text-xs text-muted-foreground">Fecha Nacimiento</Label><Input disabled value={guide.fecha_nacimiento ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">Género</Label><Input disabled value={guide.genero ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">Nacionalidad</Label><Input disabled value={guide.nacionalidad ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">País Residencia</Label><Input disabled value={guide.pais_residencia ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">Ciudad Residencia</Label><Input disabled value={guide.ciudad_residencia ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">Años Experiencia</Label><Input disabled value={guide.experiencia_anios ?? guide.experiencia_anios === 0 ? String(guide.experiencia_anios) : "N/A"}/></div>
            <div className="col-span-2"><Label className="text-xs text-muted-foreground">Dirección</Label><Input disabled value={guide.direccion ?? "N/A"}/></div>
            <div className="col-span-2"><Label className="text-xs text-muted-foreground">Especialidad Principal</Label><Input disabled value={guide.especialidad ?? "N/A"}/></div>
            <div className="col-span-2"><Label className="text-xs text-muted-foreground">Certificaciones (texto)</Label><Input disabled value={guide.certificaciones ?? "N/A"}/></div>
            <div className="col-span-2"><Label className="text-xs text-muted-foreground">Foto URL</Label><Input disabled value={guide.foto_url ?? "N/A"}/></div>
            <div><Label className="text-xs text-muted-foreground">Estado Usuario</Label>
              <div className="pt-2"><StatusBadge status={guide.estado} map={estadoUsuarioMap}/></div>
            </div>
            <div><Label className="text-xs text-muted-foreground">Fecha Ingreso</Label><Input disabled value={guide.joinedAt ?? ""}/></div>
            <div className="col-span-1 flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-xs text-muted-foreground">Disponibilidad</Label>
                <div className="pt-1 font-medium flex items-center gap-1">
                  {guide.disponibilidad ? (<span className="text-success flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Disponible</span>) : (<span className="text-muted-foreground flex items-center gap-1"><XCircle className="h-4 w-4"/> No disponible</span>)}
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-xs text-muted-foreground">Activo</Label>
                <div className="pt-1 font-medium flex items-center gap-1">
                  {guide.activo ? (<span className="text-success flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Activo</span>) : (<span className="text-destructive flex items-center gap-1"><XCircle className="h-4 w-4"/> Inactivo</span>)}
                </div>
              </div>
            </div>
            <div><Label className="text-xs text-muted-foreground">Tours Realizados</Label><Input disabled value={String(guide.toursCount ?? 0)}/></div>
            <div><Label className="text-xs text-muted-foreground">Rating</Label>
              <div className="pt-2 flex items-center gap-2"><Star className="h-4 w-4 text-warning fill-warning"/>{guide.rating ?? 0}/5</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Biografía</Label>
            <div className="rounded-lg border p-3 bg-muted/20 text-sm whitespace-pre-line">
              {guide.biografia ?? "Sin biografía registrada."}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
                <Languages className="h-4 w-4 text-primary"/>
                Idiomas
            </div>
            {(guide.idiomas ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin idiomas registrados.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(guide.idiomas ?? []).map((i, idx) => {
                    const nombre = IDIOMA_OPTIONS.find((o) => o.value === i.id_idioma)?.label ?? "Idioma #" + i.id_idioma;
                    const nivel = NIVEL_IDIOMA_OPTIONS.find((n) => n.value === i.nivel)?.label ?? i.nivel;
                    return (<Badge key={idx} variant="outline">
                        {nombre} <span className="text-muted-foreground mx-1">·</span> {nivel}
                    </Badge>);
                })}
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
                <Award className="h-4 w-4 text-primary"/>
                Certificaciones (tabla puente)
            </div>
            {(guide.certificaciones_puente ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin certificaciones registradas en tabla puente.</p>
            ) : (
              <div className="space-y-2">
                {(guide.certificaciones_puente ?? []).map((c, idx) => {
                    const cert = CERTIFICACION_OPTIONS.find((o) => o.value === c.id_certificacion);
                    return (
                        <div key={idx} className="rounded-lg border p-3 bg-muted/20 text-sm space-y-1">
                            <div className="font-medium">{cert?.label ?? "Certificación #" + c.id_certificacion}</div>
                            <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                                <span>Obtención: {c.fecha_obtencion || "—"}</span>
                                <span>Vencimiento: {c.fecha_vencimiento || "—"}</span>
                                <span>N°: {c.numero_certificado || "—"}</span>
                            </div>
                        </div>
                    );
                })}
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="pt-4 border-t"><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
