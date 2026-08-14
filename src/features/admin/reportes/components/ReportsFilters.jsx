import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { Download, Filter } from "lucide-react";
import { StatsGrid } from "@/features/admin/components/StatCard";
import { MONTHLY_DATA, TOURS_PERFORMANCE, GUIDES_PERFORMANCE, REPORT_TYPES, } from "../reportServices";
export function ReportsFilters({ reportType, onReportTypeChange, dateStart, onDateStartChange, dateEnd, onDateEndChange, onGenerate, onExport, }) {
    return (<Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <Label>Tipo de reporte</Label>
            <Select value={reportType} onValueChange={onReportTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar"/>
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Desde</Label>
            <Input type="date" value={dateStart} onChange={(e) => onDateStartChange(e.target.value)}/>
          </div>
          <div className="space-y-2">
            <Label>Hasta</Label>
            <Input type="date" value={dateEnd} onChange={(e) => onDateEndChange(e.target.value)}/>
          </div>
          <Button onClick={onGenerate}><Filter className="h-4 w-4 mr-2"/>Generar</Button>
          <Button variant="outline" onClick={onExport}><Download className="h-4 w-4 mr-2"/>Exportar</Button>
        </div>
      </CardContent>
    </Card>);
}
export function MonthlyChart({}) {
    return (<Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Ingresos vs Reservas (Mensual)</CardTitle>
        <CardDescription>Tendencia últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
            <XAxis dataKey="month" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }}/>
            <Line type="monotone" dataKey="reservas" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }}/>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
export function ToursChart() {
    return (<Card>
      <CardHeader>
        <CardTitle>Top Tours</CardTitle>
        <CardDescription>Reservas por tour</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={TOURS_PERFORMANCE}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
            <XAxis dataKey="tour" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="reservas" fill="#2563eb" radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
export function GuidesChart() {
    return (<Card>
      <CardHeader>
        <CardTitle>Desempeño de Guías</CardTitle>
        <CardDescription>Tours realizados por guía</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={GUIDES_PERFORMANCE} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
            <XAxis type="number" className="text-xs"/>
            <YAxis dataKey="guia" type="category" width={120} className="text-xs"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="tours" fill="#06b6d4" radius={[0, 4, 4, 0]}/>
            <Bar dataKey="rating" fill="#22c55e" radius={[0, 4, 4, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
export { StatsGrid as ReportsStatsGrid };
