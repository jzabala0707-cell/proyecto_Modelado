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
export function BookingsStats({ total, confirmed, pending, revenue }) {
    return (<StatsGrid stats={[
            { title: "Total Reservas", value: total, icon: Calendar, color: "text-primary" },
            { title: "Confirmadas", value: confirmed, icon: CalendarCheck, color: "text-success" },
            { title: "Pendientes", value: pending, icon: Clock, color: "text-warning" },
            { title: "Ingresos", value: revenue, icon: DollarSign, color: "text-secondary" },
        ]} columns={4}/>);
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
          <div><Label className="text-xs text-muted-foreground">Cliente</Label><Input disabled value={booking.customer}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={booking.status} map={bookingStatusMap}/></div></div>
          <div><Label className="text-xs text-muted-foreground">Email</Label><Input disabled value={booking.email ?? "N/A"}/></div>
          <div><Label className="text-xs text-muted-foreground">Teléfono</Label><Input disabled value={booking.phone ?? "N/A"}/></div>
          <div><Label className="text-xs text-muted-foreground">Tour</Label><Input disabled value={booking.tour}/></div>
          <div><Label className="text-xs text-muted-foreground">Guía</Label><Input disabled value={booking.guide ?? "Asignación pendiente"}/></div>
          <div><Label className="text-xs text-muted-foreground">Fecha</Label><Input disabled value={booking.date}/></div>
          <div><Label className="text-xs text-muted-foreground">Hora</Label><Input disabled value={booking.time}/></div>
          <div><Label className="text-xs text-muted-foreground">Personas</Label><Input disabled value={String(booking.people)}/></div>
          <div><Label className="text-xs text-muted-foreground">Total</Label><Input disabled value={`$${booking.total.toLocaleString()}`}/></div>
          <div className="col-span-2"><Label className="text-xs text-muted-foreground">Método de pago</Label><Input disabled value={booking.paymentMethod ?? "N/A"}/></div>
        </div>
        {booking.notes && (<div className="border-t pt-4 space-y-2">
            <Label>Notas</Label>
            <p className="text-sm text-muted-foreground bg-muted/40 rounded p-3">{booking.notes}</p>
          </div>)}
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
