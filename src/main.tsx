import React from "react";
import ReactDOM from "react-dom/client";

async function bootstrap() {
  const view = new URLSearchParams(window.location.search).get("view");
  const { default: App } = view === "graph"
    ? await import("./KnowledgeGraphPage")
    : await import("./StudioApp");
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode><App /></React.StrictMode>,
  );
}
void bootstrap();
