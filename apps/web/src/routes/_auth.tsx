import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { Spinner } from "@repo/ui/components/spinner";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (useAuthStore.getState().isLoading) return;
  },
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
