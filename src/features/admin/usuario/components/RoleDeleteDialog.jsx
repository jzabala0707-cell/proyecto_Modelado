import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";
export function RoleDeleteDialog({ open, onOpenChange, role, onConfirm }) {
    return (<AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-destructive/10">
              <ShieldAlert className="h-6 w-6 text-destructive"/>
            </div>
            <AlertDialogTitle>¿Estás seguro de eliminar este rol?</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el rol{" "}
            <strong>{role?.name}</strong>
            {role && role.usersCount > 0 && (
              <span className="block mt-2 text-destructive font-medium">
                ⚠️ Este rol tiene {role.usersCount} usuario(s) asignado(s). Los usuarios perderán estos permisos.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">
            Eliminar Rol
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>);
}
