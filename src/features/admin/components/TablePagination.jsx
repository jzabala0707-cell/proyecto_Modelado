import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function TablePagination({ currentPage, totalPages, totalItems, onPageChange, itemsLabel = "resultados", }) {
    if (totalPages <= 1)
        return null;
    const pageNumbers = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++)
            pageNumbers.push(i);
    }
    else if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++)
            pageNumbers.push(i);
    }
    else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++)
            pageNumbers.push(i);
    }
    else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++)
            pageNumbers.push(i);
    }
    return (<div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages} ({totalItems} {itemsLabel} totales)
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4"/>
        </Button>
        {pageNumbers.map((pageNumber) => (<Button key={pageNumber} variant={currentPage === pageNumber ? "default" : "outline"} size="sm" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </Button>))}
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <ChevronRight className="h-4 w-4"/>
        </Button>
      </div>
    </div>);
}
