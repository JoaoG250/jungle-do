import { apiClient as api } from "@/lib/axios";
import type {
  CreateTaskDto,
  UpdateTaskDto,
  TaskResponse,
  CommentResponse,
  CreateCommentDto,
} from "@repo/types/tasks";

export const tasksService = {
  getTasks: async (): Promise<TaskResponse[]> => {
    const response = await api.get<{ total: number; tasks: TaskResponse[] }>(
      "/tasks"
    );
    return response.data.tasks;
  },

  createTask: async (data: CreateTaskDto): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>("/tasks", data);
    return response.data;
  },

  getTask: async (id: string): Promise<TaskResponse> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (
    id: string,
    data: UpdateTaskDto
  ): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  createComment: async (
    taskId: string,
    data: CreateCommentDto
  ): Promise<CommentResponse> => {
    const response = await api.post<CommentResponse>(
      `/tasks/${taskId}/comments`,
      data
    );
    return response.data;
  },
};
