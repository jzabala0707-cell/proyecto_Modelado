import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Filter } from "lucide-react";
import { StatsGrid } from "@/features/admin/components/StatCard";
import { MONTHLY_DATA, TOURS_PERFORMANCE, GUIDES_PERFORMANCE, REPORT_TYPES } from "../reportServices";
import { reportFiltersSchema } from "@/features/admin/configuracion/validations/settingsValidation";

export function ReportsFilters({
    reportType,
    onReportTypeChange,
    dateStart,
    onDateStartChange,
    dateEnd,
    onDateEndChange,
    onGenerate,
    onExport,
}) {
    const form = useForm({
        resolver: zodResolver(reportFiltersSchema),
        defaultValues: {
            reportType: reportType,
            startDate: dateStart,
            endDate: dateEnd,
        },
        mode: "onTouched",
    });

    useEffect(() => {
        form.reset({
            reportType: reportType ?? "",
            startDate: dateStart ?? "",
            endDate: dateEnd ?? "",
        });
    }, [reportType, dateStart, dateEnd, form]);

    const handleReportTypeChange = (value) => {
        form.setValue("reportType", value, { shouldValidate: true });
        onReportTypeChange(value);
    };

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        form.setValue("startDate", value, { shouldValidate: true });
        onDateStartChange(value);
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        form.setValue("endDate", value, { shouldValidate: true });
        onDateEndChange(value);
    };

    const handleInternalGenerate = (validatedData) => {
        onDateStartChange(validatedData.startDate);
        onDateEndChange(validatedData.endDate);
        onReportTypeChange(validatedData.reportType);
        onGenerate();
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalGenerate)}>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <FormField
                                control={form.control}
                                name="reportType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de reporte</FormLabel>
                                        <Select
                                            onValueChange={(v) => {
                                                field.onChange(v);
                                                handleReportTypeChange(v);
                                            }}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {REPORT_TYPES.map((r) => (
                                                    <SelectItem key={r.value} value={r.value}>
                                                        {r.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Desde</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    handleStartDateChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hasta</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    handleEndDateChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">
                                <Filter className="h-4 w-4 mr-2" />
                                Generar
                            </Button>
                            <Button variant="outline" type="button" onClick={onExport}>
                                <Download className="h-4 w-4 mr-2" />
                                Exportar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
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
