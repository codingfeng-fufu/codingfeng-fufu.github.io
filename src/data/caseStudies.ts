export type CaseStudy = {
  status: string;
  story: { eyebrow: string; title: string; text: string }[];
  example: { title: string; input: string; steps: string[]; output: string };
  results: { value: string; label: string; context: string; href: string }[];
  scope: string;
  sources: { label: string; href: string }[];
};
const repo = (name: string) => `https://github.com/codingfeng-fufu/${name}`;

// Reviewed against repository READMEs, available screenshots, and implementation files on 2026-10-17.
// Reported evaluations retain their original scope; no project benchmarks were rerun.
export const caseStudies: Record<string, CaseStudy> = {
  "技术雷达知识库": {
    status: "Local-first knowledge workspace",
    story: [
      { eyebrow: "THE PROBLEM", title: "Research notes need connections, not just folders.", text: "Paper notes, technical concepts, interview preparation, and research ideas accumulate in different places. Finding a page again is only part of the problem: the workspace also needs to expose how concepts relate and let each kind of material keep its own structure." },
      { eyebrow: "THE IMPLEMENTATION", title: "Build the workspace from portable Markdown.", text: "RadarLoom keeps Markdown pages and explicit [[wikilinks]] as the source of truth. Python scripts generate search indexes and relationship graphs. Leiden discovers communities from links between knowledge pages; optional model-generated names summarize those fixed communities without changing their membership. Interview pages, project pages, and maps of content stay outside the knowledge-community graph." },
      { eyebrow: "THE OUTCOME", title: "Read a page, follow its links, explore its community.", text: "The local Viewer brings together search, LaTeX, Mermaid, favorites, reading history, and exports. A graph workbench supports community drill-down, while paper notes and Idea Lab have dedicated views. Indexes, community summaries, and graph artifacts can be regenerated from files, so the workspace remains usable independently of the optional Claude integration." },
    ],
    example: { title: "From a concept page to its knowledge community", input: "Create a knowledge page in pages/ with source metadata and explicit [[wikilinks]] to related concepts.", steps: ["Rebuild page indexes and resolve explicit references.", "Discover communities from eligible knowledge-page links.", "Open the Viewer, then drill into a community and its member pages."], output: "A searchable page with a source record, navigable links, and graph context. This is a representative workflow, not a recorded run." },
    results: [
      { value: "4", label: "Separate workspaces", context: "Knowledge pages, interview preparation, paper notes, and Idea Lab.", href: repo("radar-loom") + "#workspaces" },
      { value: "Leiden", label: "Link-based communities", context: "Membership comes from explicit page links; generated names cannot change it.", href: repo("radar-loom") + "/blob/master/scripts/community_graph.py" },
      { value: "Rebuildable", label: "Indexes and graph artifacts", context: "Documented build, health-check, backup, and CI workflows.", href: repo("radar-loom") + "#testing-and-ci" },
    ],
    scope: "The standalone Viewer and graph require no model API key. Claude Code and its external WebUI are optional integrations.",
    sources: [{ label: "README & actual UI screenshots", href: repo("radar-loom") + "#product-overview" }, { label: "Community construction", href: repo("radar-loom") + "/blob/master/scripts/community_graph.py" }],
  },
  "Mini Coding Agent": {
    status: "Local autonomous coding runtime",
    story: [
      { eyebrow: "THE PROBLEM", title: "A code suggestion is only the start of a finished task.", text: "A coding task needs more than generated text: the agent must inspect the existing workspace, make changes in the right files, run a meaningful check, and return enough evidence to review the result. A confident final message alone cannot establish that the work succeeded." },
      { eyebrow: "THE IMPLEMENTATION", title: "Connect tool use to a verification-gated delivery loop.", text: "A Python runtime gives the model file, search, edit, and shell tools, with read-before-edit rules and optional write scopes. CodingAgent.deliver resolves an explicit or inferred verification command, snapshots the workspace, invokes the task loop, and collects changed files. Failed checks can trigger bounded repair rounds; the delivery result derives success from verification." },
      { eyebrow: "THE OUTCOME", title: "Return the changed code and the check that judged it.", text: "The same runtime is available through a task CLI, a local browser UI, and a Python API. A structured delivery includes the final answer, changed files and code, verification command, and verification output. The CLI distinguishes successful delivery from failed verification, and provider errors become a failed report rather than an uncaught traceback." },
    ],
    example: { title: "Implement a missing utility and verify it", input: "Implement a slugify utility, restrict writes to src/, and use pytest -q as the delivery check.", steps: ["Read the existing files and inspect expected behavior.", "Edit the implementation within the configured write scope.", "Run the check, repair within the round limit if needed, and collect changed code."], output: "A delivery report containing the answer, modified files, and verification transcript. The repository documents a real-provider slugify demo; this walkthrough illustrates the flow." },
    results: [
      { value: "CLI · UI · API", label: "One delivery loop", context: "The same task runtime is exposed through a task CLI, local browser UI, and reusable Python API.", href: repo("mini_coding_agent") + "#run-a-task" },
      { value: "Scoped", label: "Workspace-aware edits", context: "Read-before-edit checks and optional write scopes constrain where the agent can change files.", href: repo("mini_coding_agent") + "/blob/main/autonomous_coding_agent/client.py" },
      { value: "Verify", label: "Before reporting success", context: "deliver() preserves changed files, check output, and failure details instead of trusting a final message.", href: repo("mini_coding_agent") + "/blob/main/autonomous_coding_agent/client.py" },
    ],
    scope: "A small local coding runtime, best suited to tasks with a clear verification command. Write scopes and read-before-edit checks are runtime rules, not an OS sandbox.",
    sources: [{ label: "Usage & Python API", href: repo("mini_coding_agent") + "#python-api" }, { label: "Delivery implementation", href: repo("mini_coding_agent") + "/blob/main/autonomous_coding_agent/client.py" }, { label: "Status & demo records", href: repo("mini_coding_agent") + "/blob/main/CURRENT_STATUS.md" }],
  },
  OpenFusionKGQA: {
    status: "Runnable beta · 0.2.0-beta.1",
    story: [
      { eyebrow: "THE PROBLEM", title: "Extracted triples are candidates, not established facts.", text: "Open text introduces duplicate entities, inconsistent relation names, and unsupported graph edges. If those candidates go straight into retrieval, the final answer hides whether the failure came from extraction, graph fusion, missing evidence, or answer selection." },
      { eyebrow: "THE IMPLEMENTATION", title: "Make graph admission and rejection inspectable.", text: "The pipeline chunks documents with provenance, extracts candidates, resolves entities, and aligns relation mentions. Fusion scores extraction confidence, alignment, evidence references, and graph consistency. Accepted relationships retain source chunk IDs; rejected triples retain scores and reasons. The current evidence-support signal checks for evidence references, rather than proving semantic entailment." },
      { eyebrow: "THE OUTCOME", title: "Trace an answer through the graph back to source text.", text: "Local and global QA combine graph and text evidence with citations. Persisted candidate, graph, rejection, and run artifacts let the CLI inspect each stage independently. The JSON path runs offline with mock extraction and answering; real-model calls and Neo4j are explicit configuration choices. Evaluation distinguishes evidence retrieval from final answer quality." },
    ],
    example: { title: "Inspect why a relation did not enter the graph", input: "Index a directory of research documents, then ask a question over the resulting corpus.", steps: ["Extract candidate entities and triples with source chunk IDs.", "Resolve names, align relations, and retain accepted and rejected candidates.", "Ask with graph/text evidence, then inspect rejected triples and the run summary."], output: "A cited answer plus graph artifacts and rejection reasons that can be inspected separately. The default offline path uses mock extraction and answering." },
    results: [
      { value: "Staged", label: "Inspectable graph pipeline", context: "Document, extraction, fusion, graph-store, and QA stages expose their own artifacts and run metadata.", href: repo("OpenFusionKGQA") + "/blob/main/graphrag_v2/indexing.py" },
      { value: "Accepted + rejected", label: "Graph admission evidence", context: "Fusion retains accepted relationships and rejected triples with scores and rejection reasons.", href: repo("OpenFusionKGQA") + "/blob/main/graphrag_v2/graph_fusion/fusion.py" },
      { value: "JSON + Neo4j", label: "Two graph-store paths", context: "The offline JSON path supports local checks; Neo4j is an explicit service-backed option.", href: repo("OpenFusionKGQA") + "#neo4j-path" },
    ],
    scope: "A beta prototype. The portfolio cover is a concept mockup; its dashboard metrics and Apple example are illustrative, not repository output. Structured-output parsing and answer selection remain areas for improvement. Evaluation values are repository-reported, not reruns for this website.",
    sources: [{ label: "Release status & evaluation scope", href: repo("OpenFusionKGQA") + "#current-status" }, { label: "Fusion and rejection logic", href: repo("OpenFusionKGQA") + "/blob/main/graphrag_v2/graph_fusion/fusion.py" }, { label: "Scoring formula", href: repo("OpenFusionKGQA") + "/blob/main/graphrag_v2/graph_fusion/triple_scoring.py" }],
  },
  "LLM Wiki": {
    status: "Public alpha · local developer tool",
    story: [
      { eyebrow: "THE PROBLEM", title: "Useful project knowledge should survive the chat session.", text: "Coding and research agents repeatedly revisit the same sources. Retrieval can find relevant text, but it does not by itself maintain a shared account of concepts, decisions, and provenance. New sessions need a durable knowledge layer that remains readable and reviewable outside the agent." },
      { eyebrow: "THE IMPLEMENTATION", title: "Compile sources into maintained, linked Markdown.", text: "LLM Wiki implements the Karpathy LLM Wiki pattern with a clear boundary between immutable raw evidence, maintained wiki pages, and local runtime state. Source registration and ingest packets support source-backed pages. CLI and MCP expose context, search, query, plan, apply, and health checks. Planned writes support dry-run previews and constrained patch actions that reject paths outside allowed areas." },
      { eyebrow: "THE OUTCOME", title: "Give agents memory they can inspect and maintain.", text: "A coding agent can retrieve context from earlier work, follow source links, propose changes, and check the wiki structure after an update. The included demo searches the example wiki and dry-runs a plan without changing tracked pages. Local text search, planning previews, and structural checks work without a model key; model-backed querying and ingestion use configured providers." },
    ],
    example: { title: "Reuse a design source in a later coding session", input: "Register a source note about agent tool safety, then maintain linked source and concept pages.", steps: ["Create an ingest packet and preserve source IDs in maintained pages.", "Start a later session and search the wiki through CLI or MCP.", "Preview a maintenance plan, apply supported changes, and run a structural health check."], output: "Reusable Markdown knowledge with provenance and reviewable updates. The repository includes an offline demo of search, planning, and dry-run application." },
    results: [
      { value: "Immutable", label: "Source-backed memory", context: "Raw sources stay separate from maintained wiki pages, provenance, plans, and local runtime state.", href: repo("agent-wiki") + "#what-it-manages" },
      { value: "MCP", label: "Agent maintenance interface", context: "Context, search, query, planning, apply, and health-check tools share one contract.", href: repo("agent-wiki") + "#use-with-an-agent" },
      { value: "Dry-run", label: "Reviewable writes", context: "Maintenance plans can be inspected before changes are applied, followed by structural health checks.", href: repo("agent-wiki") + "#build-your-own-wiki" },
    ],
    scope: "An independent implementation inspired by the Karpathy LLM Wiki pattern. Alpha-stage local tooling; example-wiki counts and search results describe the repository baseline, not arbitrary corpora.",
    sources: [{ label: "Architecture & safe writes", href: repo("agent-wiki") + "/blob/main/docs/architecture.md" }, { label: "MCP tool contracts", href: repo("agent-wiki") + "/blob/main/src/llmw/mcp/server.py" }, { label: "Development checks", href: repo("agent-wiki") + "#development-checks" }],
  },
  "Agent Learning Assistant": {
    status: "Local-first learning prototype",
    story: [
      { eyebrow: "THE PROBLEM", title: "Learning an agent stack takes more than isolated answers.", text: "A learner moves between explanations, prerequisite concepts, code experiments, and a changing study plan. A chat transcript does not make those relationships or learning progress easy to navigate. The assistant needs to connect answers with practice and remember what the learner has already covered." },
      { eyebrow: "THE IMPLEMENTATION", title: "Connect retrieval, planning, and memory around the learner.", text: "A React/Vite workbench connects Chat, Plan, graph, code, progress, and tools to a FastAPI service. Ordinary explanations can stream through a fast path; evidence-oriented questions use retrieval or agent tools. The planning graph profiles the learner, generates a curriculum, and routes critique back into revision. MemoryManager scores turns, extracts important episodic memories, updates the profile, and synchronizes mastered topics." },
      { eyebrow: "THE OUTCOME", title: "Move from a question to a navigable learning path.", text: "The concept graph supports neighbors, paths, relation legends, and progress overlays. Code execution, web search, learning plans, and a local Wiki runtime sit alongside chat, so learners can explore a concept, try an example, and mark progress in one workspace. Startup checks and a Chromium smoke workflow cover the main application surfaces." },
    ],
    example: { title: "Learn GraphRAG through concepts and practice", input: "Ask for a GraphRAG learning path and explore its prerequisite concepts.", steps: ["Build a learner profile, draft a curriculum, and critique the plan.", "Browse related concepts and paths, then ask evidence-oriented questions or try code.", "Mark mastered topics and persist useful memories for subsequent sessions."], output: "A plan connected to concept navigation and progress state. This is an illustrative journey through the implemented workspaces, not a measured learning-outcome study." },
    results: [
      { value: "Chat · Plan · Graph", label: "One learning workbench", context: "The React/Vite shell connects conversation, planning, concept navigation, code, progress, and tools.", href: repo("agent-learning-assistant") + "#web-workbench" },
      { value: "Stateful", label: "Learning path continuity", context: "Planning state, user profile, episodic memory, and mastered topics persist across sessions.", href: repo("agent-learning-assistant") + "/blob/main/memory/memory_manager.py" },
      { value: "Smoke-tested", label: "Integrated workspace", context: "The repository provides startup, web E2E, integration, and browser smoke checks for the main surfaces.", href: repo("agent-learning-assistant") + "#常用验证" },
    ],
    scope: "A desktop-first learning prototype. Reported RAGAS averages cover questions requiring retrieval and do not measure learning gains. Model-backed chat requires a configured provider.",
    sources: [{ label: "Workbench & evaluation snapshot", href: repo("agent-learning-assistant") }, { label: "Planning graph", href: repo("agent-learning-assistant") + "/blob/main/planning/planner_graph.py" }, { label: "Long-term memory", href: repo("agent-learning-assistant") + "/blob/main/memory/memory_manager.py" }],
  },
};
