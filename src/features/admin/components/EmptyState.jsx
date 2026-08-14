import { TableCell, TableRow } from "@/shared/components/ui/table";
export function EmptyState({ message = "No se encontraron resultados", colSpan = 6 }) {
    return (<TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8 text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>);
}
