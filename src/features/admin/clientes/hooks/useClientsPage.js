import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockClientes, emptyClientForm, clientServices } from "@/features/admin/clientes/clientServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";

function flattenCliente(cliente) {
  const id = cliente.id_turista ?? cliente.id;
  const nombre = cliente.nombre_completo ?? [cliente.nombre, cliente.apellido].filter(Boolean).join(" ") ?? cliente.name;
  return {
    id,
    id_turista: cliente.id_turista ?? id,
    id_usuario: cliente.id_usuario,
    nombre,
    name: nombre,
    firstName: cliente.nombre ?? cliente.firstName ?? "",
    lastName: cliente.apellido ?? cliente.lastName ?? "",
    correo: cliente.correo ?? cliente.email ?? "",
    email: cliente.correo ?? cliente.email ?? "",
    telefono: cliente.telefono ?? cliente.phone ?? "",
    phone: cliente.telefono ?? cliente.phone ?? "",
    estado: cliente.estado ?? "ACTIVO",
    status: cliente.estado ?? cliente.status ?? "active",
    tipo_documento: cliente.tipo_documento ?? "",
    numero_documento: cliente.numero_documento ?? "",
    fecha_nacimiento: cliente.fecha_nacimiento ?? "",
    genero: cliente.genero ?? "",
    nacionalidad: cliente.nacionalidad ?? "",
    pais_residencia: cliente.pais_residencia ?? "",
    ciudad_residencia: cliente.ciudad_residencia ?? "",
    direccion: cliente.direccion ?? "",
    contacto_emergencia_nombre: cliente.contacto_emergencia_nombre ?? "",
    contacto_emergencia_telefono: cliente.contacto_emergencia_telefono ?? "",
    contacto_emergencia_parentesco: cliente.contacto_emergencia_parentesco ?? "",
    preferencias: cliente.preferencias ?? "",
    observaciones: cliente.observaciones ?? "",
    vip: Boolean(cliente.vip),
    cantidad_reservas: cliente.cantidad_reservas ?? cliente.bookings ?? 0,
    bookings: cliente.cantidad_reservas ?? cliente.bookings ?? 0,
    gasto_total: cliente.gasto_total ?? cliente.totalSpent ?? 0,
    totalSpent: cliente.gasto_total ?? cliente.totalSpent ?? 0,
    fecha_registro: cliente.fecha_registro ?? cliente.registrationDate ?? new Date().toISOString().split("T")[0],
    registrationDate: cliente.fecha_registro ?? cliente.registrationDate ?? new Date().toISOString().split("T")[0],
    ultima_reserva: cliente.ultima_reserva ?? cliente.lastBooking ?? "",
    lastBooking: cliente.ultima_reserva ?? cliente.lastBooking ?? "",
  };
}

function mergeFlatToForm(flat) {
  return {
    firstName: flat.firstName || flat.nombre || "",
    lastName: flat.lastName || flat.apellido || "",
    correo: flat.correo || flat.email || "",
    telefono: flat.telefono || flat.phone || "",
    estado: flat.estado || flat.status || "ACTIVO",

    tipo_documento: flat.tipo_documento || "",
    numero_documento: flat.numero_documento || "",
    fecha_nacimiento: flat.fecha_nacimiento || "",
    genero: flat.genero || "",
    nacionalidad: flat.nacionalidad || "",
    pais_residencia: flat.pais_residencia || "",
    ciudad_residencia: flat.ciudad_residencia || "",
    direccion: flat.direccion || "",
    contacto_emergencia_nombre: flat.contacto_emergencia_nombre || "",
    contacto_emergencia_telefono: flat.contacto_emergencia_telefono || "",
    contacto_emergencia_parentesco: flat.contacto_emergencia_parentesco || "",
    preferencias: flat.preferencias || "",
    observaciones: flat.observaciones || "",
    vip: Boolean(flat.vip),

    cantidad_reservas: flat.cantidad_reservas ?? 0,
    gasto_total: flat.gasto_total ?? 0,
    fecha_registro: flat.fecha_registro || new Date().toISOString().split("T")[0],
    ultima_reserva: flat.ultima_reserva || "",
  };
}

export function useClientsPage() {
  const flatInitial = Array.isArray(mockClientes) ? mockClientes.map(flattenCliente) : [];
  const crud = useCrudState(flatInitial, { name: "Cliente" });
  const dialogs = useDialogs();
  const [formData, setFormData] = useState(emptyClientForm);
  const [filters, setFilters] = useState({
    status: "all",
    nacionalidad: "all",
    vip: "all",
  });
  const search = useSearchFilter(
    crud.items,
    (c) => [c.nombre, c.correo, c.telefono, c.nacionalidad ?? "", c.numero_documento ?? ""],
    (c, f) => {
      const matchesStatus = f.status === "all" || (c.estado ?? c.status) === f.status;
      const matchesNacionalidad =
        f.nacionalidad === "all" || (c.nacionalidad ?? "") === f.nacionalidad;
      let matchesVip = true;
      if (f.vip === "yes") matchesVip = Boolean(c.vip);
      else if (f.vip === "no") matchesVip = !c.vip;
      return matchesStatus && matchesNacionalidad && matchesVip;
    },
    filters
  );
  const sortable = useSortableTable(search.filteredData);
  const pagination = usePagination(sortable.sortedItems, 10);
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.nacionalidad !== "all" ||
    filters.vip !== "all" ||
    search.searchTerm !== "";

  const handleCreate = useCallback(() => {
    if (!formData || typeof formData === "object" && formData.usuario) {
      const usr = formData.usuario ?? {};
      const tur = formData.turista ?? {};
      const flat = flattenCliente({
        nombre: usr.nombre,
        apellido: usr.apellido,
        correo: usr.correo,
        telefono: usr.telefono,
        estado: usr.estado,
        ...tur,
      });
      const created = crud.handleCreate(flat);
      dialogs.closeCreate();
      setFormData(emptyClientForm);
      return created;
    }
    const created = crud.handleCreate({ ...formData, vip: Boolean(formData?.vip) });
    dialogs.closeCreate();
    setFormData(emptyClientForm);
    return created;
  }, [crud, formData, dialogs]);

  const handleEdit = useCallback(() => {
    if (!dialogs.selectedItem) return;
    const id = dialogs.selectedItem.id_turista ?? dialogs.selectedItem.id;
    let updates = {};
    if (formData && formData.usuario) {
      const usr = formData.usuario ?? {};
      const tur = formData.turista ?? {};
      updates = flattenCliente({
        ...dialogs.selectedItem,
        nombre: usr.nombre,
        apellido: usr.apellido,
        correo: usr.correo,
        telefono: usr.telefono,
        estado: usr.estado,
        ...tur,
      });
    } else {
      updates = { ...dialogs.selectedItem, ...formData, vip: Boolean(formData?.vip) };
    }
    crud.handleEdit(id, updates);
    dialogs.closeEdit();
  }, [crud, dialogs, formData]);

  const handleDelete = useCallback(() => {
    if (!dialogs.selectedItem) return;
    const id = dialogs.selectedItem.id_turista ?? dialogs.selectedItem.id;
    crud.handleDelete(id);
    dialogs.closeDelete();
  }, [crud, dialogs]);

  const handleToggleStatus = useCallback(
    (cliente) => {
      const current = cliente.estado ?? cliente.status ?? "ACTIVO";
      let nuevoEstado;
      if (current === "ACTIVO") nuevoEstado = "INACTIVO";
      else if (current === "INACTIVO") nuevoEstado = "BLOQUEADO";
      else nuevoEstado = "ACTIVO";
      const id = cliente.id_turista ?? cliente.id;
      crud.handleEdit(id, {
        ...cliente,
        estado: nuevoEstado,
        status: nuevoEstado,
      });
      toast.success(`Cliente marcado como ${nuevoEstado}`);
    },
    [crud]
  );

  const openCreate = useCallback(() => {
    setFormData(emptyClientForm);
    dialogs.openCreate();
  }, [dialogs]);

  const openEdit = useCallback(
    (cliente) => {
      setFormData(mergeFlatToForm(cliente));
      dialogs.openEdit(cliente);
    },
    [dialogs]
  );

  const clearFilters = useCallback(() => {
    setFilters({ status: "all", nacionalidad: "all", vip: "all" });
    search.setSearchTerm("");
    sortable.resetSort();
    toast.info("Filtros limpiados");
  }, [search, sortable]);

  const handleExportCSV = useCallback(() => {
    clientServices.exportCSV(search.filteredData);
    toast.success("Datos exportados a CSV");
  }, [search]);

  const stats = clientServices.computeStats(crud.items, search.filteredData.length);
  return {
    clientes: crud.items,
    items: pagination.paginatedItems,
    search,
    sortable,
    pagination,
    dialogs,
    formData,
    setFormData,
    filters,
    setFilters,
    hasActiveFilters,
    stats,
    handleCreate,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    openCreate,
    openEdit,
    clearFilters,
    handleExportCSV,
  };
}
