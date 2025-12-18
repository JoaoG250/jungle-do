import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { useSearchUsers } from "@/hooks/queries/users.queries";
import { useDebounce } from "@/hooks/use-debounce";

interface UserMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function UserMultiSelect({ value, onChange }: UserMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: users = [] } = useSearchUsers(debouncedSearch, open);

  const handleSelect = (userId: string) => {
    if (value.includes(userId)) {
      onChange(value.filter((id) => id !== userId));
    } else {
      onChange([...value, userId]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value.length > 0
            ? `${value.length} usuário(s) selecionado(s)`
            : "Selecione usuários..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar usuários..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={() => handleSelect(user.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(user.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
