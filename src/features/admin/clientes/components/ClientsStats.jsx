import { Users, Crown, UserCheck, DollarSign, Mail, Phone, Calendar, Eye } from "lucide-react";
import { StatsGrid } from "@/features/admin/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { clientServices } from "@/features/admin/clientes/clientServices";
export function ClientsStats({ total, vip, activos, totalRevenue }) {
    return (<StatsGrid stats={[
            { title: "Total Clientes", value: total, icon: Users, color: "text-primary" },
            { title: "Clientes VIP", value: vip, icon: Crown, color: "text-warning" },
            { title: "Clientes Activos", value: activos, icon: UserCheck, color: "text-success" },
            { title: "Ingresos Totales", value: totalRevenue, icon: DollarSign, color: "text-secondary" },
        ]} columns={4}/>);
}
export function ClientsGrid({ clients, onDetail }) {
    if (clients.length === 0) {
        return <div className="text-center py-12 text-muted-foreground">No se encontraron clientes</div>;
    }
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((c) => (<Card key={c.id} className="hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {clientServices.initials(c.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  {c.vip && (<Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
                      <Crown className="h-3 w-3 mr-1"/>VIP
                    </Badge>)}
                </div>
                <div className="text-xs text-muted-foreground">{c.nationality}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1"><Mail className="h-3 w-3 text-muted-foreground"/><span className="truncate">{c.email}</span></div>
              <div className="flex items-center gap-1"><Phone className="h-3 w-3 text-muted-foreground"/><span>{c.phone}</span></div>
              <div className="flex items-center gap-1"><Calendar className="h-3 w-3 text-muted-foreground"/><span>{c.bookings} reservas</span></div>
              <div className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-muted-foreground"/><span>${c.totalSpent.toLocaleString()}</span></div>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <div className="text-xs text-muted-foreground">
                Última: {c.lastBooking ?? "N/A"}
              </div>
              <Button variant="outline" size="sm" onClick={() => onDetail(c)} style={{ color: "#ff9500" }}>
                <Eye className="h-4 w-4 mr-2"/>Ver
              </Button>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}
export function ClientDetailDialog({ open, onOpenChange, client }) {
    if (!client)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle del Cliente</DialogTitle>
          <DialogDescription>Información completa</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Nombre</Label><Input disabled value={client.name}/></div>
          <div><Label className="text-xs text-muted-foreground">Nacionalidad</Label><Input disabled value={client.nationality ?? "N/A"}/></div>
          <div><Label className="text-xs text-muted-foreground">Email</Label><Input disabled value={client.email}/></div>
          <div><Label className="text-xs text-muted-foreground">Teléfono</Label><Input disabled value={client.phone}/></div>
          <div><Label className="text-xs text-muted-foreground">Reservas</Label><Input disabled value={String(client.bookings)}/></div>
          <div><Label className="text-xs text-muted-foreground">Gasto total</Label><Input disabled value={`$${client.totalSpent.toLocaleString()}`}/></div>
          <div><Label className="text-xs text-muted-foreground">Registro</Label><Input disabled value={client.registrationDate ?? "N/A"}/></div>
          <div><Label className="text-xs text-muted-foreground">Última reserva</Label><Input disabled value={client.lastBooking ?? "N/A"}/></div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
