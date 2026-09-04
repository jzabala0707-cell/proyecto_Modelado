import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { mockTours } from "../tourServices";

function tourName(id_tour) {
    if (!id_tour) return "";
    const t = mockTours.find((x) => String(x.id_tour ?? x.id) === String(id_tour));
    return t?.nombre ?? t?.name ?? "";
}

function salidaLabel(s) {
    if (!s) return "";
    const tn = tourName(s.id_tour ?? s.tourId ?? s.tour);
    const fecha = s.fecha_salida ?? s.date ?? "";
    const id = s.id_salida ?? s.id ?? "";
    const parts = [];
    if (id) parts.push(`#${id}`);
    if (tn) parts.push(tn);
    if (fecha) parts.push(fecha);
    return parts.join(" · ");
}

export function GroupDeleteDialog({ open, onOpenChange, group, onConfirm }) {
    const label = salidaLabel(group);
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de eliminar esta salida?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente la
                        salida
                        {label ? (
                            <>
                                {" "}
                                <strong>{label}</strong>
                            </>
                        ) : (
                            "."
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
