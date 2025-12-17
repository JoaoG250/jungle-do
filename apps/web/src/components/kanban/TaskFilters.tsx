import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import {
  STATUS,
  PRIORITY,
  type Status,
  type Priority,
} from "@repo/types/constants";
import type { TaskFilters as ITaskFilters } from "@repo/types/tasks";
import { Search, X } from "lucide-react";

interface TaskFiltersProps {
  filters: ITaskFilters;
  onFilterChange: (filters: ITaskFilters) => void;
}

export function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value === "ALL" ? undefined : (value as Status),
    });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({
      ...filters,
      priority: value === "ALL" ? undefined : (value as Priority),
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasFilters = filters.search || filters.status || filters.priority;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tarefas..."
          className="pl-9"
          value={filters.search || ""}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-4">
        <Select
          value={filters.status || "ALL"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos Status</SelectItem>
            <SelectItem value={STATUS.TODO}>A Fazer</SelectItem>
            <SelectItem value={STATUS.IN_PROGRESS}>Em Progresso</SelectItem>
            <SelectItem value={STATUS.REVIEW}>Revisão</SelectItem>
            <SelectItem value={STATUS.DONE}>Concluído</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority || "ALL"}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todas Prioridades</SelectItem>
            <SelectItem value={PRIORITY.LOW}>Baixa</SelectItem>
            <SelectItem value={PRIORITY.MEDIUM}>Média</SelectItem>
            <SelectItem value={PRIORITY.HIGH}>Alta</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
