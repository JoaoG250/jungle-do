import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";
import { useAuthStore } from "@/stores/auth.store";

function Index() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Index</h1>
      <Button>Test</Button>
    </div>
  );
}

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Index,
});
