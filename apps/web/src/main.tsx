import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/auth.store";

const queryClient = new QueryClient();

import { socketService } from "@/services/socket.service";

useAuthStore
  .getState()
  .refreshAccessToken()
  .finally(() => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      socketService.connect(token, queryClient);
    }
  });

useAuthStore.subscribe((state, prevState) => {
  if (state.accessToken !== prevState.accessToken) {
    if (state.accessToken) {
      socketService.connect(state.accessToken, queryClient);
    } else {
      socketService.disconnect();
    }
  }
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
