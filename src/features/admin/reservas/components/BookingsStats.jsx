import { StatsGrid } from "@/features/admin/components/StatCard";
import { Calendar, CalendarCheck, Clock, DollarSign, Eye, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { StatusBadge, bookingStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function BookingsStats({ total, confirmadas, pendientes, canceladas, completadas, revenue }) {
    return (<StatsGrid stats={[
            { title: "Total Reservas", value: total, icon: Calendar, color: "text-primary" },
            { title: "Confirmadas", value: confirmadas, icon: CalendarCheck, color: "text-success" },
            { title: "Pendientes", value: pendientes, icon: Clock, color: "text-warning" },
            { title: "Canceladas", value: canceladas, icon: Calendar, color: "text-destructive" },
            { title: "Completadas", value: completadas, icon: CalendarCheck, color: "text-info" },
            { title: "Ingresos", value: revenue, icon: DollarSign, color: "text-secondary" },
        ]} columns={6}/>);
}
export function BookingsTable({ bookings, onDetail, onEdit, onDelete }) {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tour</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Personas</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (<EmptyState colSpan={8}/>) : (bookings.map((b) => (<TableRow key={b.id}>
              <TableCell className="font-mono">#{b.id}</TableCell>
              <TableCell>
                <div className="font-medium">{b.customer}</div>
                <div className="text-xs text-muted-foreground">{b.phone}</div>
              </TableCell>
              <TableCell>{b.tour}</TableCell>
              <TableCell>
                <div>{b.date}</div>
                <div className="text-xs text-muted-foreground">{b.time}</div>
              </TableCell>
              <TableCell>{b.people}</TableCell>
              <TableCell className="font-semibold">${b.total.toLocaleString()}</TableCell>
              <TableCell><StatusBadge status={b.status} map={bookingStatusMap}/></TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onDetail(b)} style={{ color: "#ff9500" }}><Eye className="h-4 w-4"/></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(b)}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(b)} className="text-destructive">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>)))}
      </TableBody>
    </Table>);
}
export function BookingDetailDialog({ open, onOpenChange, booking }) {
    if (!booking)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Reserva #{booking.id}</DialogTitle>
          <DialogDescription>Detalle completo de la reserva</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Código Reserva</Label><Input disabled value={booking.codigo_reserva ?? `#${booking.id}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Fecha Reserva</Label><Input disabled value={booking.fecha_reserva ?? booking.date ?? "N/A"}/></div>
          <div><Label className="text-xs text-muted-foreground">Cliente</Label><Input disabled value={booking.customer}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={booking.status} map={bookingStatusMap}/></div></div>
          <div className="col-span-2"><Label className="text-xs text-muted-foreground">Salida Tour</Label><Input disabled value={booking.salida_label ?? `${booking.tour} · ${booking.date ?? ""} ${booking.time ?? ""}`.trim()}/></div>
          <div><Label className="text-xs text-muted-foreground">Guía</Label><Input disabled value={booking.guide_nombre ?? booking.guide ?? "Asignación pendiente"}/></div>
          <div><Label className="text-xs text-muted-foreground">Cupos / Pax</Label><Input disabled value={`${booking.people} personas (${booking.cantidad_adultos ?? "?"} adultos, ${booking.cantidad_ninos ?? "?"} niños)`}/></div>
          <div><Label className="text-xs text-muted-foreground">Precio Unitario</Label><Input disabled value={`$${(booking.precio_unitario ?? 0).toLocaleString()}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Descuento</Label><Input disabled value={`$${(booking.descuento ?? 0).toLocaleString()}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Subtotal</Label><Input disabled value={`$${(booking.subtotal ?? booking.total ?? 0).toLocaleString()}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Total</Label><Input disabled value={`$${(booking.total ?? 0).toLocaleString()}`}/></div>
          {booking.status === "CANCELADA" && booking.motivo_cancelacion && (<div className="col-span-2"><Label className="text-xs text-muted-foreground">Motivo de Cancelación</Label><p className="text-sm bg-destructive/10 text-destructive rounded p-3 border border-destructive/20">{booking.motivo_cancelacion}</p></div>)}
        </div>
        {booking.observaciones && (<div className="border-t pt-4 space-y-2">
            <Label>Observaciones</Label>
            <p className="text-sm text-muted-foreground bg-muted/40 rounded p-3">{booking.observaciones}</p>
          </div>)}
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
