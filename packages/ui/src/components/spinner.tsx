import { Loader2, type LucideProps } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

function Spinner({ className, ...props }: LucideProps) {
  return (
    <Loader2 className={cn("size-4 animate-spin", className)} {...props} />
  );
}

export { Spinner };
