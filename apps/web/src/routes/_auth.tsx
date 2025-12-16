import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
