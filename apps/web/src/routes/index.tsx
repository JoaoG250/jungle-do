import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";

function Index() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Index</h1>
      <Button>Test</Button>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
