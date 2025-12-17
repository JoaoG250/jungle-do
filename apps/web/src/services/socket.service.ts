import { io, Socket } from "socket.io-client";
import { WEBSOCKET_EVENTS } from "@repo/types/constants";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { taskKeys } from "@/hooks/queries/tasks.queries";
import type { NotificationResponse } from "@repo/types/notifications";

class SocketService {
  private socket: Socket | null = null;

  connect(accessToken: string, queryClient: QueryClient) {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_API_BASE_URL, {
      query: { token: accessToken },
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Socket connected");
    });

    this.socket.on(WEBSOCKET_EVENTS.TASK_CREATED, () => {
      toast.info("Nova tarefa criada!");
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    });

    this.socket.on(
      WEBSOCKET_EVENTS.TASK_UPDATED,
      (payload: NotificationResponse) => {
        toast.info("Tarefa atualizada!");
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        if (payload?.id) {
          queryClient.invalidateQueries({
            queryKey: taskKeys.detail(payload.id),
          });
        }
      }
    );

    this.socket.on(
      WEBSOCKET_EVENTS.COMMENT_NEW,
      (payload: NotificationResponse) => {
        toast.info("Novo comentário!");
        if (payload?.id) {
          queryClient.invalidateQueries({
            queryKey: taskKeys.detail(payload.id),
          });
        }
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      }
    );
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
