import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { upcomingTours } from "../layoutServices";
export function DashboardUpcomingTours({ items = upcomingTours, }) {
    return (<Card>
      <CardHeader>
        <CardTitle>Próximos Tours</CardTitle>
        <CardDescription>Calendario de hoy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((tour, index) => (<div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${tour.variant === "primary"
                ? "bg-primary/5 border border-primary/20"
                : "bg-muted"}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {tour.timeNumber}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tour.timePeriod}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium">{tour.tourName}</p>
                <p className="text-sm text-muted-foreground">
                  {tour.people} personas
                </p>
              </div>
              <Badge variant={tour.badge}>Hoy</Badge>
            </div>))}
        </div>
      </CardContent>
    </Card>);
}
