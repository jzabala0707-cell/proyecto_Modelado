import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from "recharts";
import { toursData, PIE_CHART_COLORS } from "../layoutServices";
export function DashboardPopularTours({ data = toursData, colors = PIE_CHART_COLORS, }) {
    return (<Card>
      <CardHeader>
        <CardTitle>Tours Más Populares</CardTitle>
        <CardDescription>Distribución por tipo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
