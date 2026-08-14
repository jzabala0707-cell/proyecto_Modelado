import { StatsGrid } from "@/features/admin/components/StatCard";
import { Receipt, CheckCircle, DollarSign, Clock, Eye, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { StatusBadge, paymentStatusMap } from "@/features/admin/components/StatusBadge";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function PaymentsStats({ total, completed, collected, pending }) {
    return (<StatsGrid stats={[
            { title: "Total Abonos", value: total, icon: Receipt, color: "text-primary" },
            { title: "Completados", value: completed, icon: CheckCircle, color: "text-success" },
            { title: "Recaudado", value: collected, icon: DollarSign, color: "text-secondary" },
            { title: "Pendiente", value: pending, icon: Clock, color: "text-warning" },
        ]} columns={4}/>);
}
export function PaymentsTable({ payments, onDetail }) {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Factura</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tour</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.length === 0 ? (<EmptyState colSpan={8}/>) : (payments.map((p) => (<TableRow key={p.id}>
              <TableCell className="font-mono text-primary">{p.invoice}</TableCell>
              <TableCell>{p.client}</TableCell>
              <TableCell>{p.tour}</TableCell>
              <TableCell>{p.date}</TableCell>
              <TableCell>{p.method}</TableCell>
              <TableCell className="font-semibold">${p.amount.toLocaleString()}</TableCell>
              <TableCell><StatusBadge status={p.status} map={paymentStatusMap}/></TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onDetail(p)} style={{ color: "#ff9500" }}><Eye className="h-4 w-4"/></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Registrar nuevo abono</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>)))}
      </TableBody>
    </Table>);
}
export function PaymentDetailDialog({ open, onOpenChange, payment }) {
    if (!payment)
        return null;
    const paid = payment.payments
        .filter((p) => p.status === "completed")
        .reduce((s, p) => s + p.amount, 0);
    const pending = payment.saleTotal - paid;
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Abono - {payment.invoice}</DialogTitle>
          <DialogDescription>Detalle del abono seleccionado</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div><Label className="text-xs text-muted-foreground">Cliente</Label><Input disabled value={payment.client}/></div>
          <div><Label className="text-xs text-muted-foreground">Tour</Label><Input disabled value={payment.tour}/></div>
          <div><Label className="text-xs text-muted-foreground">Fecha del pago</Label><Input disabled value={payment.date}/></div>
          <div><Label className="text-xs text-muted-foreground">Estado</Label><div className="pt-2"><StatusBadge status={payment.status} map={paymentStatusMap}/></div></div>
          <div><Label className="text-xs text-muted-foreground">Método</Label><Input disabled value={payment.method}/></div>
          <div><Label className="text-xs text-muted-foreground">Referencia</Label><Input disabled value={payment.reference ?? "N/A"}/></div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Resumen financiero</Label>
          <div className="rounded-lg border divide-y">
            <div className="flex justify-between p-3 text-sm"><span className="text-muted-foreground">Total factura</span><span>${payment.saleTotal.toLocaleString()}</span></div>
            <div className="flex justify-between p-3 text-sm text-success"><span>Pagado</span><span>${paid.toLocaleString()}</span></div>
            <div className="flex justify-between p-3 text-sm text-destructive"><span>Pendiente</span><span>${pending.toLocaleString()}</span></div>
            <div className="flex justify-between p-3 font-semibold bg-muted/40"><span>Monto de este abono</span><span>${payment.amount.toLocaleString()}</span></div>
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <Label>Historial completo</Label>
          <div className="space-y-2">
            {payment.payments.map((p) => (<div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
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
        <DialogFooter>
          <Button variant="outline">Registrar Abono</Button>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
