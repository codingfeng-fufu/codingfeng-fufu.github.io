import React from "react";
import ReactDOM from "react-dom/client";

async function bootstrap() {
  const view = new URLSearchParams(window.location.search).get("view");
  const graph = view === "graph";
  const studio = view === "studio";
  const creative = new URLSearchParams(window.location.search).get("view") === "lab";
  document.documentElement.classList.toggle("creative", creative);
  const { default: App } = graph ? await import("./KnowledgeGraphPage") : studio ? await import("./StudioApp") : creative
    ? (await import("./creative-base.css"), await import("./CreativeApp"))
    : (await import("./styles.css"), await import("./App"));
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode><App /></React.StrictMode>,
  );
}
void bootstrap();
