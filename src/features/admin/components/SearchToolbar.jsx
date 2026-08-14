import { Input } from "@/shared/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
export function SearchToolbar({ searchTerm, onSearchChange, searchPlaceholder = "Buscar...", statusFilter, onStatusFilterChange, statusOptions, statusFilterPlaceholder = "Estado", hasActiveFilters, onToggleFilters, onExport, extraContent, }) {
    return (<div className="flex gap-2 w-full md:w-auto flex-wrap">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <Input placeholder={searchPlaceholder} className="pl-9" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}/>
      </div>

      {statusOptions && onStatusFilterChange && (<Select value={statusFilter ?? "all"} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={statusFilterPlaceholder}/>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>))}
          </SelectContent>
        </Select>)}

      {onToggleFilters && (<Button variant="outline" size="sm" onClick={onToggleFilters}>
          <Filter className="h-4 w-4 mr-2"/>
          Filtros
          {hasActiveFilters && (<Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
              !
            </Badge>)}
        </Button>)}

      {onExport && (<Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2"/>
          Exportar
        </Button>)}

      {extraContent}
    </div>);
}
