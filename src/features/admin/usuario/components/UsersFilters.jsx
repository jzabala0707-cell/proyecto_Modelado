import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { USER_ROLE_OPTIONS } from "../userServices";
import { ESTADO_USUARIO_OPTIONS } from "@/shared/constants/dbEnums";

const DEPARTMENT_OPTIONS = [
    { value: "Administración", label: "Administración" },
    { value: "Operaciones", label: "Operaciones" },
    { value: "Ventas", label: "Ventas" },
];

export function UsersFilters({ filters, setFilters, onClear }) {
    const allRoles = [{ value: "all", label: "Todos los roles" }, ...USER_ROLE_OPTIONS];
    const allEstados = [{ value: "all", label: "Todos los estados" }, ...ESTADO_USUARIO_OPTIONS];
    const allDepts = [{ value: "all", label: "Todos los departamentos" }, ...DEPARTMENT_OPTIONS];
    return (<Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={filters.rol ?? filters.role ?? "all"} onValueChange={(value) => setFilters({ ...filters, rol: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol"/>
              </SelectTrigger>
              <SelectContent>
                {allRoles.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={filters.estado ?? filters.status ?? "all"} onValueChange={(value) => setFilters({ ...filters, estado: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado"/>
              </SelectTrigger>
              <SelectContent>
                {allEstados.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Departamento</Label>
            <Select value={filters.departamento ?? filters.department ?? "all"} onValueChange={(value) => setFilters({ ...filters, departamento: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar departamento"/>
              </SelectTrigger>
              <SelectContent>
                {allDepts.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button variant="outline" onClick={onClear} className="w-full">
              <X className="h-4 w-4 mr-2"/> Limpiar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>);
}
