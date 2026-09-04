import { useState } from "react";
import { toast } from "sonner";
export function useCrudState(initialItems, options = {}) {
    const [items, setItems] = useState(initialItems);
    const label = options.name ?? "Elemento";
    const handleCreate = (newItemData) => {
        const now = new Date().toISOString().split("T")[0];
        const nextId = items.length > 0 ? Math.max(...items.map((u) => u.id)) + 1 : 1;
        const newItem = {
            id: nextId,
            createdAt: now,
            creado_en: now,
            ...newItemData,
        };
        setItems([...items, newItem]);
        toast.success(options.onCreateMessage?.(newItem) ?? `${label} creado exitosamente`);
        return newItem;
    };
    const handleEdit = (id, updates) => {
        setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
        const updated = items.find((i) => i.id === id);
        if (updated) {
            toast.success(options.onEditMessage?.(updated) ?? `${label} actualizado exitosamente`);
        }
    };
    const handleDelete = (id) => {
        const found = items.find((i) => i.id === id);
        setItems(items.filter((item) => item.id !== id));
        if (found) {
            toast.success(options.onDeleteMessage?.(found) ?? `${label} eliminado exitosamente`);
        }
    };
    const handleToggleStatus = (id, statusKey = "status") => {
        setItems(items.map((item) => {
            if (item.id !== id)
                return item;
            const current = item[statusKey];
            let newValue;
            let actionLabel;
            if (typeof current === "boolean") {
                newValue = !current;
                actionLabel = newValue ? "activado" : "desactivado";
            } else if (typeof current === "string") {
                const upper = current.toUpperCase();
                if (upper === "ACTIVO") {
                    newValue = "INACTIVO";
                    actionLabel = "desactivado";
                } else if (upper === "INACTIVO" || upper === "BLOQUEADO") {
                    newValue = "ACTIVO";
                    actionLabel = "activado";
                } else if (current === "active") {
                    newValue = "inactive";
                    actionLabel = "desactivado";
                } else {
                    newValue = "active";
                    actionLabel = "activado";
                }
            } else {
                newValue = "active";
                actionLabel = "activado";
            }
            const updated = { ...item, [statusKey]: newValue };
            toast.success(options.onToggleMessage?.(updated, newValue) ??
                `${label} ${actionLabel} exitosamente`);
            return updated;
        }));
    };
    return {
        items,
        setItems,
        handleCreate,
        handleEdit,
        handleDelete,
        handleToggleStatus,
    };
}
