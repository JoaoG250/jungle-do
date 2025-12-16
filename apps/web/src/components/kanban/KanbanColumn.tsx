import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import type { TaskResponse } from "@repo/types/tasks";
import type { Status } from "@repo/types/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/card";

interface KanbanColumnProps {
  id: Status;
  title: string;
  tasks: TaskResponse[];
  onEdit: (task: TaskResponse) => void;
  onDelete: (taskId: string) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  onEdit,
  onDelete,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Card className="flex flex-col h-full bg-muted/50 border-transparent">
      <CardHeader className="p-4 py-3">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          {title}
          <span className="bg-muted-foreground/20 text-muted-foreground text-xs px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[500px]">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="flex flex-col gap-2 min-h-full">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}
