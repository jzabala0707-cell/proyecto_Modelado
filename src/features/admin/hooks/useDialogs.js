import { useState } from "react";
export function useDialogs() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);
    const openEdit = (item) => {
        setSelectedItem(item);
        setIsEditOpen(true);
    };
    const closeEdit = () => {
        setIsEditOpen(false);
        setSelectedItem(null);
    };
    const openDetail = (item) => {
        setSelectedItem(item);
        setIsDetailOpen(true);
    };
    const closeDetail = () => {
        setIsDetailOpen(false);
        setSelectedItem(null);
    };
    const openDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };
    const closeDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItem(null);
    };
    const toggleFilters = () => setIsFilterOpen((v) => !v);
    const closeAll = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDetailOpen(false);
        setIsDeleteOpen(false);
        setSelectedItem(null);
    };
    return {
        isCreateOpen,
        setIsCreateOpen,
        openCreate,
        closeCreate,
        isEditOpen,
        setIsEditOpen,
        openEdit,
        closeEdit,
        isDetailOpen,
        setIsDetailOpen,
        openDetail,
        closeDetail,
        isDeleteOpen,
        setIsDeleteOpen,
        openDelete,
        closeDelete,
        isFilterOpen,
        setIsFilterOpen,
        toggleFilters,
        selectedItem,
        setSelectedItem,
        closeAll,
    };
}
