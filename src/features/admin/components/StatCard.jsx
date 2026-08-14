import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
export function StatCard({ stat }) {
    const Icon = stat.icon;
    return (<Card>
      <CardHeader className="pb-3">
        <div className="flex flex-row items-center justify-between">
          <CardDescription>{stat.title}</CardDescription>
          {Icon && <Icon className={`h-4 w-4 ${stat.color ?? ""}`}/>}
        </div>
        <CardTitle className={`text-3xl ${stat.color ?? ""}`}>{stat.value}</CardTitle>
      </CardHeader>
      {stat.trend && stat.change && (<CardContent>
          <div className="flex items-center gap-1 mt-2">
            {stat.trend === "up" ? (<ArrowUp className="h-4 w-4 text-success"/>) : (<ArrowDown className="h-4 w-4 text-destructive"/>)}
            <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
              {stat.change}
            </span>
            <span className="text-sm text-muted-foreground">vs periodo anterior</span>
          </div>
        </CardContent>)}
    </Card>);
}
export function StatsGrid({ stats, columns = 4 }) {
    const colsClass = columns === 5
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
        : columns === 3
            ? "grid-cols-1 md:grid-cols-3"
            : columns === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    return (<div className={`grid ${colsClass} gap-4`}>
      {stats.map((stat, index) => (<StatCard key={`${stat.title}-${index}`} stat={stat}/>))}
    </div>);
}
