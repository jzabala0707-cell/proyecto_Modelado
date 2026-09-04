import { useState, useCallback } from "react";
import { toast } from "sonner";
import { mockGuias, emptyGuideForm, guideServices, IDIOMA_OPTIONS } from "../guideServices";
import { useSearchFilter } from "@/features/admin/hooks/useSearchFilter";
import { useCrudState } from "@/features/admin/hooks/useCrudState";
import { useDialogs } from "@/features/admin/hooks/useDialogs";
import { usePagination } from "@/features/admin/hooks/usePagination";
import { useSortableTable } from "@/features/admin/hooks/useSortableTable";

export function useGuidesPage() {
    const crud = useCrudState(mockGuias, { name: "Guía" });
    const dialogs = useDialogs();
    const [formData, setFormData] = useState(emptyGuideForm);
    const [filters, setFilters] = useState({
        estado_usuario: "all",
        disponibilidad: "all",
        activo: "all",
        id_idioma: "all",
    });

    const search = useSearchFilter(
        crud.items,
        (g) => {
            const idiomasNombres = (g.idiomas ?? [])
                .map((i) => IDIOMA_OPTIONS.find((o) => o.value === i.id_idioma)?.label ?? "")
                .filter(Boolean);
            return [
                g.firstName ?? "",
                g.lastName ?? "",
                g.correo ?? "",
                g.telefono ?? "",
                g.especialidad ?? "",
                g.tipo_documento ?? "",
                g.numero_documento ?? "",
                ...idiomasNombres,
            ];
        },
        (g, f) => {
            const matchesEstado =
                f.estado_usuario === "all" || g.estado === f.estado_usuario;
            const matchesDisponibilidad =
                f.disponibilidad === "all" ||
                (f.disponibilidad === "disponible" && g.disponibilidad === true) ||
                (f.disponibilidad === "no_disponible" && g.disponibilidad === false);
            const matchesActivo =
                f.activo === "all" ||
                (f.activo === "activo" && g.activo === true) ||
                (f.activo === "inactivo" && g.activo === false);
            const matchesIdioma =
                f.id_idioma === "all" ||
                (g.idiomas ?? []).some(
                    (i) => Number(i.id_idioma) === Number(f.id_idioma)
                );
            return (
                matchesEstado &&
                matchesDisponibilidad &&
                matchesActivo &&
                matchesIdioma
            );
        },
        filters
    );

    const sortable = useSortableTable(search.filteredData);
    const pagination = usePagination(sortable.sortedItems, 10);

    const hasActiveFilters =
        filters.estado_usuario !== "all" ||
        filters.disponibilidad !== "all" ||
        filters.activo !== "all" ||
        filters.id_idioma !== "all" ||
        search.searchTerm !== "";

    const handleCreate = useCallback(() => {
        const creado = guideServices.createGuia(formData);
        if (creado) {
            crud.items = guideServices.getGuias();
            toast.success("Guía creado exitosamente");
        } else {
            toast.error("No se pudo crear el guía");
        }
        dialogs.closeCreate();
        setFormData(emptyGuideForm);
    }, [formData, dialogs, crud]);

    const handleEdit = useCallback(() => {
        if (!dialogs.selectedItem) return;
        const id = dialogs.selectedItem.id_guia ?? dialogs.selectedItem.id_usuario;
        const actualizado = guideServices.updateGuia(id, formData);
        if (actualizado) {
            crud.items = guideServices.getGuias();
            toast.success("Guía actualizado exitosamente");
        } else {
            toast.error("No se pudo actualizar el guía");
        }
        dialogs.closeEdit();
    }, [crud, dialogs, formData]);

    const handleDelete = useCallback(() => {
        if (!dialogs.selectedItem) return;
        const id = dialogs.selectedItem.id_guia ?? dialogs.selectedItem.id_usuario;
        const ok = guideServices.deleteGuia(id);
        if (ok) {
            crud.items = guideServices.getGuias();
            toast.success("Guía eliminado exitosamente");
        } else {
            toast.error("No se pudo eliminar el guía");
        }
        dialogs.closeDelete();
    }, [crud, dialogs]);

    const handleToggleActivo = useCallback((guide) => {
        const id = guide.id_guia ?? guide.id_usuario;
        const actual = guideServices.getGuiaById(id);
        if (!actual) return;
        guideServices.updateGuia(id, { activo: !actual.activo });
        crud.items = guideServices.getGuias();
        toast.success(
            `Guía ${actual.activo ? "desactivado" : "activado"} exitosamente`
        );
    }, [crud]);

    const handleToggleDisponibilidad = useCallback((guide) => {
        const id = guide.id_guia ?? guide.id_usuario;
        const actual = guideServices.getGuiaById(id);
        if (!actual) return;
        guideServices.updateGuia(id, { disponibilidad: !actual.disponibilidad });
        crud.items = guideServices.getGuias();
        toast.success(
            `Disponibilidad ${actual.disponibilidad ? "desactivada" : "activada"} exitosamente`
        );
    }, [crud]);

    const openCreate = useCallback(() => {
        setFormData(emptyGuideForm);
        dialogs.openCreate();
    }, [dialogs]);

    const openEdit = useCallback((guide) => {
        const id = guide.id_guia ?? guide.id_usuario;
        const datosCompletos = guideServices.getGuiaById(id) ?? guide;
        setFormData({
            firstName: datosCompletos.firstName ?? "",
            lastName: datosCompletos.lastName ?? "",
            correo: datosCompletos.correo ?? "",
            telefono: datosCompletos.telefono ?? "",
            estado: datosCompletos.estado ?? "ACTIVO",
            tipo_documento: datosCompletos.tipo_documento ?? "CC",
            numero_documento: datosCompletos.numero_documento ?? "",
            fecha_nacimiento: datosCompletos.fecha_nacimiento ?? "",
            genero: datosCompletos.genero ?? "",
            nacionalidad: datosCompletos.nacionalidad ?? "",
            pais_residencia: datosCompletos.pais_residencia ?? "",
            ciudad_residencia: datosCompletos.ciudad_residencia ?? "",
            direccion: datosCompletos.direccion ?? "",
            especialidad: datosCompletos.especialidad ?? "",
            experiencia_anios:
                datosCompletos.experiencia_anios ?? datosCompletos.experiencia_anios === 0
                    ? datosCompletos.experiencia_anios
                    : "",
            certificaciones: datosCompletos.certificaciones ?? "",
            foto_url: datosCompletos.foto_url ?? "",
            disponibilidad: Boolean(datosCompletos.disponibilidad),
            activo: Boolean(datosCompletos.activo),
            biografia: datosCompletos.biografia ?? "",
            idiomas: datosCompletos.idiomas ?? [],
            certificaciones_puente: datosCompletos.certificaciones_puente ?? [],
            rating: datosCompletos.rating ?? 0,
            toursCount: datosCompletos.toursCount ?? 0,
            joinedAt:
                datosCompletos.joinedAt ?? new Date().toISOString().split("T")[0],
        });
        dialogs.openEdit(datosCompletos);
    }, [dialogs]);

    const clearFilters = useCallback(() => {
        setFilters({
            estado_usuario: "all",
            disponibilidad: "all",
            activo: "all",
            id_idioma: "all",
        });
        search.setSearchTerm("");
        sortable.resetSort();
        toast.info("Filtros limpiados");
    }, [search, sortable]);

    const handleExportCSV = useCallback(() => {
        guideServices.exportCSV(search.filteredData);
        toast.success("Datos exportados a CSV");
    }, [search]);

    const stats = guideServices.computeStats(
        crud.items,
        search.filteredData.length
    );

    const handlers = {
        handleCreate,
        handleEdit,
        handleDelete,
        handleToggleActivo,
        handleToggleDisponibilidad,
        openCreate,
        openEdit,
        clearFilters,
        handleExportCSV,
    };

    return {
        guides: crud.items,
        items: pagination.paginatedItems,
        search,
        sortable,
        pagination,
        dialogs,
        filters,
        setFilters,
        hasActiveFilters,
        formData,
        setFormData,
        stats,
        ...handlers,
    };
}
