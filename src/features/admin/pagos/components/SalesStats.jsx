import { StatsGrid } from "@/features/admin/components/StatCard";
import { FileText, CheckCircle, DollarSign, Percent, Eye, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { StatusBadge, paymentStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function SalesStats({ total, paid, revenue, commissions }) {
    return (<StatsGrid stats={[
            { title: "Total Ventas", value: total, icon: FileText, color: "text-primary" },
            { title: "Pagadas", value: paid, icon: CheckCircle, color: "text-success" },
            { title: "Ingresos", value: revenue, icon: DollarSign, color: "text-secondary" },
            { title: "Comisiones", value: commissions, icon: Percent, color: "text-warning" },
        ]} columns={4}/>);
}
export function SalesTable({ sales, onDetail }) {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Factura</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tour</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Descuento</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.length === 0 ? (<EmptyState colSpan={9}/>) : (sales.map((s) => (<TableRow key={s.id}>
              <TableCell className="font-mono text-primary">{s.invoice}</TableCell>
              <TableCell>{s.client}</TableCell>
              <TableCell>{s.tour}</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>${s.subtotal.toLocaleString()}</TableCell>
              <TableCell>${s.discount.toLocaleString()}</TableCell>
              <TableCell className="font-semibold">${s.total.toLocaleString()}</TableCell>
              <TableCell><StatusBadge status={s.status} map={paymentStatusMap}/></TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onDetail(s)} style={{ color: "#ff9500" }}><Eye className="h-4 w-4"/></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>)))}
      </TableBody>
    </Table>);
}
export function SaleDetailDialog({ open, onOpenChange, sale }) {
    if (!sale)
        return null;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Venta {sale.invoice}</DialogTitle>
          <DialogDescription>Detalle completo de la venta</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Cliente</Label><Input disabled value={sale.client}/></div>
          <div><Label className="text-xs text-muted-foreground">Tour</Label><Input disabled value={sale.tour}/></div>
          <div><Label className="text-xs text-muted-foreground">Fecha</Label><Input disabled value={sale.date}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={sale.status} map={paymentStatusMap}/></div></div>
          <div><Label className="text-xs text-muted-foreground">Método pago</Label><Input disabled value={sale.paymentMethod}/></div>
          <div><Label className="text-xs text-muted-foreground">Comisión</Label><Input disabled value={`$${sale.commission.toLocaleString()}`}/></div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Desglose</Label>
          <div className="rounded-lg border divide-y">
            <div className="flex justify-between p-3 text-sm"><span className="text-muted-foreground">Subtotal</span><span>${sale.subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between p-3 text-sm"><span className="text-muted-foreground">Descuento</span><span className="text-success">-${sale.discount.toLocaleString()}</span></div>
            <div className="flex justify-between p-3 font-semibold bg-muted/40"><span>Total</span><span>${sale.total.toLocaleString()}</span></div>
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Historial de pagos ({sale.payments.length})</Label>
          <div className="space-y-2">
            {sale.payments.map((p) => (<div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <div>
                  <div className="text-sm font-medium">{p.date} · {p.method}</div>
                  <div className="text-xs text-muted-foreground">{p.reference ?? "Sin referencia"}</div>
                </div>
                <div className="text-right">
                  <StatusBadge status={p.status} map={paymentStatusMap}/>
                  <div className="text-sm font-semibold mt-1">${p.amount.toLocaleString()}</div>
                </div>
              </div>))}
          </div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Cerrar</Button></DialogFooter>
      </DialogContent>
    </Dialog>);
}
