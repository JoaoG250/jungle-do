import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (filters: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

export const useTasksQuery = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: tasksService.getTasks,
  });
};

export const useTaskQuery = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => tasksService.getTask(id),
    enabled: !!id,
  });
};
