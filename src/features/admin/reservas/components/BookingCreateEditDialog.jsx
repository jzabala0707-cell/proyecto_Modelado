import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, User, Crown, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { TIPO_DOCUMENTO_OPTIONS, ESTADO_RESERVA_OPTIONS } from "@/shared/constants/dbEnums";
import { TURISTA_OPTIONS, SALIDA_OPTIONS, emptyParticipanteForm } from "../bookingServices";
import { reservaSchema } from "../validations/bookingValidation";

function SectionTitle({ title, subtitle }) {
  return (
    <div className="space-y-1 pt-2">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-base text-foreground">{title}</h4>
      </div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function CalcBadge({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <Badge variant="outline" className="h-9 w-full justify-center inline-flex font-semibold text-base">
        {value}
      </Badge>
    </div>
  );
}

export function BookingCreateEditDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEdit = false }) {
  const [participantes, setParticipantes] = useState([]);
  const [participantesOpen, setParticipantesOpen] = useState(false);

  const form = useForm({
    defaultValues: formData,
    resolver: zodResolver(reservaSchema),
    context: { participantes },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participantes_array",
  });

  useEffect(() => {
    if (open) {
      form.reset(formData);
      const initial = Array.isArray(formData?.participantes) && formData.participantes.length > 0
        ? formData.participantes.map((p) => ({ ...emptyParticipanteForm, ...p }))
        : [];
      setParticipantes(initial);
    }
  }, [open, formData, form]);

  const idSalida = form.watch("id_salida");
  const cantidadAdultos = form.watch("cantidad_adultos") ?? 1;
  const cantidadNinos = form.watch("cantidad_ninos") ?? 0;
  const precioUnitario = form.watch("precio_unitario") ?? 0;
  const descuento = form.watch("descuento") ?? 0;
  const estado = form.watch("estado") ?? "PENDIENTE";
  const idTurista = form.watch("id_turista");

  useEffect(() => {
    const salida = SALIDA_OPTIONS.find((s) => String(s.value) === String(idSalida));
    if (salida && salida.precioUnitario != null) {
      form.setValue("precio_unitario", Number(salida.precioUnitario), { shouldValidate: true });
    }
  }, [idSalida, form]);

  const { subtotalCalc, totalCalc } = useMemo(() => {
    const pax = Number(cantidadAdultos ?? 0) + Number(cantidadNinos ?? 0);
    const pu = Number(precioUnitario ?? 0);
    const desc = Number(descuento ?? 0);
    const subtotal = Math.max(0, pax * pu - desc);
    return { subtotalCalc: subtotal, totalCalc: subtotal };
  }, [cantidadAdultos, cantidadNinos, precioUnitario, descuento]);

  const salidaActual = useMemo(
    () => SALIDA_OPTIONS.find((s) => String(s.value) === String(idSalida)),
    [idSalida]
  );

  const turistaActual = useMemo(
    () => TURISTA_OPTIONS.find((t) => String(t.value) === String(idTurista)),
    [idTurista]
  );

  const agregarParticipante = () => {
    setParticipantes((prev) => [...prev, { ...emptyParticipanteForm, __id: Date.now() }]);
  };

  const eliminarParticipante = (index) => {
    setParticipantes((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarParticipante = (index, field, value) => {
    setParticipantes((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = (datosLimpios) => {
    const payload = {
      id_turista: Number(datosLimpios.id_turista),
      id_salida: Number(datosLimpios.id_salida),
      cantidad_adultos: Number(datosLimpios.cantidad_adultos),
      cantidad_ninos: Number(datosLimpios.cantidad_ninos),
      precio_unitario: Number(datosLimpios.precio_unitario),
      descuento: Number(datosLimpios.descuento),
      estado: datosLimpios.estado,
      motivo_cancelacion: datosLimpios.estado === "CANCELADA" ? datosLimpios.motivo_cancelacion : null,
      observaciones: datosLimpios.observaciones || null,
      subtotal: subtotalCalc,
      total: totalCalc,
    };
    const participantesLimpios = participantes
      .filter((p) => p.nombres && p.numero_documento)
      .map(({ __id, ...rest }) => ({
        nombres: rest.nombres?.trim(),
        apellidos: rest.apellidos?.trim(),
        tipo_documento: rest.tipo_documento,
        numero_documento: rest.numero_documento?.trim(),
        fecha_nacimiento: rest.fecha_nacimiento || null,
        nacionalidad: rest.nacionalidad || null,
        es_titular: Boolean(rest.es_titular),
      }));
    const combined = { reserva: payload, participantes: participantesLimpios };
    setFormData?.(combined);
    onSubmit(combined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Reserva" : "Crear Nueva Reserva"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza los datos de la reserva y sus participantes"
              : "Selecciona turista, salida y completa la información de la reserva"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {isEdit && (
              <div className="grid grid-cols-2 gap-3">
                <CalcBadge
                  label="Código de reserva (auto)"
                  value={form.watch("codigo_reserva") || "—"}
                />
                <CalcBadge
                  label="Fecha de reserva (auto)"
                  value={form.watch("fecha_reserva") || new Date().toISOString().split("T")[0]}
                />
              </div>
            )}

            <SectionTitle title="1. Turista y Salida" subtitle="Selecciona el cliente titular y la salida programada" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
              <FormField
                control={form.control}
                name="id_turista"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turista titular</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value != null ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un turista" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TURISTA_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{opt.label}</span>
                              {opt.email && (
                                <span className="text-xs text-muted-foreground">· {opt.email}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {turistaActual && (
                      <div className="text-xs text-muted-foreground pt-1">
                        {turistaActual.phone || turistaActual.email ? (
                          <>📞 {turistaActual.phone || ""} ✉️ {turistaActual.email || ""}</>
                        ) : null}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_salida"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salida de tour</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value != null ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una salida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SALIDA_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {salidaActual && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="outline" className="text-xs">
                          💰 ${Number(salidaActual.precioUnitario ?? 0).toLocaleString("es-CO")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            "text-xs " +
                            (salidaActual.cuposDisponibles === 0
                              ? "border-destructive text-destructive"
                              : salidaActual.cuposDisponibles <= 3
                              ? "border-warning text-warning"
                              : "")
                          }
                        >
                          🎟️ {salidaActual.cuposDisponibles} cupos
                        </Badge>
                        {salidaActual.guiaNombre && (
                          <Badge variant="outline" className="text-xs">🧑‍🏫 {salidaActual.guiaNombre}</Badge>
                        )}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            <SectionTitle title="2. Personas, precios y descuentos" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-2">
              <FormField
                control={form.control}
                name="cantidad_adultos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad Adultos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cantidad_ninos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad Niños</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="precio_unitario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio Unitario ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={500}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription className="text-[11px]">Precargado del tour.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descuento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={1000}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-2 pt-1">
              <CalcBadge
                label="Total PAX"
                value={`${Number(cantidadAdultos ?? 0) + Number(cantidadNinos ?? 0)} personas`}
              />
              <CalcBadge
                label="SUBTOTAL"
                value={`$${Number(subtotalCalc).toLocaleString("es-CO")} COP`}
              />
              <div className="md:col-span-2">
                <CalcBadge
                  label="TOTAL (auto)"
                  value={`$${Number(totalCalc).toLocaleString("es-CO")} COP`}
                />
              </div>
            </div>

            <Separator />
            <SectionTitle title="3. Estado y notas" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado de la reserva</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ESTADO_RESERVA_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                <div className="w-full rounded-lg border p-3 flex items-center gap-3">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <div>📝 Subtotal = (Adultos + Niños) × Precio Unitario − Descuento</div>
                    <div>🔒 El Total es calculado por el backend/trigger al guardar.</div>
                    {estado === "CANCELADA" && (
                      <div className="text-destructive font-medium mt-1">
                        ⚠️ Al cancelar se devolverán los cupos a la salida.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {estado === "CANCELADA" && (
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="motivo_cancelacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo de cancelación (requerido)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Explique por qué se cancela la reserva (mín. 3 caracteres)"
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="observaciones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones internas</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Notas para el equipo: alergias, preferencias, logística, etc."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />
            <SectionTitle
              title={`4. Participantes de la reserva (${participantes.length})`}
              subtitle="Detalle de personas que asistirán al tour (opcional, recomendado)"
            />
            <div className="pl-2">
              <Collapsible
                open={participantesOpen}
                onOpenChange={setParticipantesOpen}
                className="border rounded-lg"
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {participantes.length} participante(s) registrados
                    </span>
                    {participantes.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Titular:{" "}
                        {participantes.find((p) => p.es_titular)?.nombres || "sin marcar"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={agregarParticipante}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Agregar participante
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" type="button">
                        {participantesOpen ? "Ocultar" : "Ver"} participantes
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="px-4 pb-4 space-y-3">
                  {participantes.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-md">
                      No hay participantes agregados. Click en "Agregar participante" para registrar al menos el titular.
                    </div>
                  ) : (
                    participantes.map((p, idx) => (
                      <div key={p.__id ?? idx} className="border rounded-md p-3 space-y-3 bg-muted/30">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              #{idx + 1}
                            </Badge>
                            <div className="flex items-center gap-2 pl-2">
                              <FormLabel className="text-xs !mb-0">
                                <Crown className="h-3 w-3 inline mr-1 text-warning" />
                                Es titular
                              </FormLabel>
                              <Switch
                                checked={Boolean(p.es_titular)}
                                onCheckedChange={(v) => {
                                  setParticipantes((prev) =>
                                    prev.map((q, i) =>
                                      i === idx
                                        ? { ...q, es_titular: v }
                                        : v
                                        ? { ...q, es_titular: false }
                                        : q
                                    )
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarParticipante(idx)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <FormLabel className="text-xs">Nombres</FormLabel>
                            <Input
                              value={p.nombres ?? ""}
                              onChange={(e) =>
                                actualizarParticipante(idx, "nombres", e.target.value)
                              }
                              placeholder="Juan José"
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">Apellidos</FormLabel>
                            <Input
                              value={p.apellidos ?? ""}
                              onChange={(e) =>
                                actualizarParticipante(idx, "apellidos", e.target.value)
                              }
                              placeholder="Pérez"
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">Tipo Doc.</FormLabel>
                            <Select
                              onValueChange={(v) => actualizarParticipante(idx, "tipo_documento", v)}
                              value={p.tipo_documento || undefined}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIPO_DOCUMENTO_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <FormLabel className="text-xs">Número Doc.</FormLabel>
                            <Input
                              value={p.numero_documento ?? ""}
                              onChange={(e) =>
                                actualizarParticipante(idx, "numero_documento", e.target.value)
                              }
                              placeholder="1020304050"
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">Fecha Nac. (opc)</FormLabel>
                            <Input
                              type="date"
                              value={p.fecha_nacimiento ?? ""}
                              onChange={(e) =>
                                actualizarParticipante(idx, "fecha_nacimiento", e.target.value)
                              }
                            />
                          </div>
                          <div className="md:col-span-3">
                            <FormLabel className="text-xs">Nacionalidad (opc)</FormLabel>
                            <Input
                              value={p.nacionalidad ?? ""}
                              onChange={(e) =>
                                actualizarParticipante(idx, "nacionalidad", e.target.value)
                              }
                              placeholder="Colombia"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEdit ? "Guardar Cambios" : "Crear Reserva"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
