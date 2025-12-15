import { createFileRoute } from "@tanstack/react-router";

function Index() {
  return <h1>Index</h1>;
}

export const Route = createFileRoute("/")({
  component: Index,
});
