import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { salesData } from "../layoutServices";
export function DashboardSalesChart({ data = salesData }) {
    return (<Card>
      <CardHeader>
        <CardTitle>Ventas y Reservas</CardTitle>
        <CardDescription>Comparativa mensual</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
            <XAxis dataKey="month" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="ventas" stroke="#2563eb" fillOpacity={1} fill="url(#colorVentas)"/>
            <Area type="monotone" dataKey="reservas" stroke="#06b6d4" fillOpacity={1} fill="url(#colorReservas)"/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
