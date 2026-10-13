export type Identity = {
  name: string;
  role: string;
  direction: string;
  thesis: string;
  tags: string[];
};

export type FocusArea = {
  title: string;
  summary: string;
  points: string[];
};

export type EvidenceMetric = {
  value: string;
  label: string;
  project: string;
};

export type Project = {
  name: string;
  subtitle: string;
  role: string;
  signature: string;
  problem: string;
  method: string;
  contributions: string[];
  evidence: string[];
  stack: string[];
  emphasis?: boolean;
};

export type StackGroup = {
  title: string;
  items: string[];
};

export const identity: Identity = {
  name: "冯宗林",
  role: "中央财经大学 · 计算机科学与技术",
  direction: "GraphRAG、AI Agent 与可审计智能系统",
  thesis:
    "研究知识增强生成与智能体决策机制，并将证据检索、工具执行、数值推理和审计验证落地为可运行系统。",
  tags: ["Agent Runtime", "Knowledge Systems", "Reliable AI"],
};

export const focusAreas: FocusArea[] = [
  {
    title: "我能做 Agent Runtime",
    summary: "把一个模型调用变成可以执行真实任务的 Agent：有工具、有状态、有预算，也知道什么时候停止。",
    points: ["设计 tool loop、路由和状态机", "实现隔离执行、Repair、拒答和降级", "用 FinCoder 的审计链验证每一步"],
  },
  {
    title: "我能把文档变成知识系统",
    summary: "从 PDF、网页和对话中建立可搜索、可关联、可追溯的知识层，而不是只做一次性文本切块。",
    points: ["设计 Chunk、Fact、Entity 和 provenance", "搭建 Hybrid RAG、GraphRAG 和 Neo4j", "用版本、引用和健康检查保证可维护"],
  },
  {
    title: "我能做领域智能与数值推理",
    summary: "把业务问题拆成模型擅长的理解环节和程序擅长的计算环节，交付可解释的结果。",
    points: ["处理 PDF/Excel、口径、单位和时间", "实现 fact binding、模板计算和预测", "在结果不可靠时明确拒答"],
  },
  {
    title: "我能把原型交付成产品",
    summary: "不止完成模型实验，还能把 API、前端、CLI、测试、产物和演示流程串成可复现的交付物。",
    points: ["FastAPI + React 工作台和 CLI", "Mock/真实模型双路径与阶段恢复", "测试、QC、成本和人工复核闭环"],
  },
];

export const evidenceMetrics: EvidenceMetric[] = [
  { value: "WISE 2026", label: "已接收", project: "EvidenceFirst" },
  { value: "CIKM 2026", label: "已接收 · 共同第一作者", project: "Routing by Contract" },
  { value: "WSDM", label: "已投稿", project: "TripleChecker" },
];

export const projects: Project[] = [
  {
    name: "Agent Learning Assistant",
    subtitle: "Local-first AI Agent learning workspace",
    role: "Full-stack system · RAG, knowledge graph, tools, and long-term memory",
    signature: "Turn one-off questions into a continuous learning workflow.",
    problem: "Learning materials, questions, code execution, and progress tracking are often disconnected across tools.",
    method: "Hybrid FAISS + BM25 retrieval, concept graph browsing, code execution, learning plans, web search, and persistent memory.",
    contributions: ["Built a FastAPI and React workspace for Agent development learning.", "Integrated retrieval, graph navigation, code execution, and learning progress.", "Added an LLM Wiki memory layer for cross-session knowledge reuse."],
    evidence: ["Local-first full-stack application", "Hybrid retrieval + graph browsing", "RAG, tools, plans, and memory in one workspace"],
    stack: ["Python", "FastAPI", "React", "FAISS", "BM25"],
  },

  {
    name: "区域与产业发展大模型问答系统",
    subtitle: "KG + RAG + Multi-Agent policy and industry research QA",
    role: "Technical lead · CUFE School of Economics",
    signature: "Connect heterogeneous policy documents to cross-document reasoning.",
    problem: "Policy and industry research requires reliable retrieval and multi-stage synthesis across a large document collection.",
    method: "Neo4j knowledge graph + BM25 / FAISS hybrid retrieval + LangGraph multi-agent orchestration + FastAPI.",
    contributions: ["Structured more than 100,000 policy documents into a domain knowledge graph.", "Designed three-way retrieval across keywords, semantics, and graph structure.", "Built specialized agents for retrieval, analysis, and synthesis."],
    evidence: ["Top-3 accuracy 85%", "Response time under 100 ms", "Presented at the National Digital Economy Academic Conference"],
    stack: ["Neo4j", "BM25", "FAISS", "LangGraph", "FastAPI"],
  },

  {
    name: "EvidenceFirst",
    subtitle: "Auditable GraphRAG 的证据状态监控",
    role: "WISE 2026 论文 · 研究与系统实现",
    signature: "记录答案之前发生了什么，让 GraphRAG 的失败可以回放、审计和重算。",
    problem: "GraphRAG 输出异常时，运营者往往无法知道是哪一种证据状态导致了风险。",
    method: "Evidence-State Checker + typed routing states + replayable audit trace + selection-conditioned review queues。",
    contributions: ["在生成前区分 checked path、repaired path、residual graph gap 和 passage fallback。", "保存修复路径、读者证据、选择器决策和审计字段。", "用 HotpotQA-1000 与 2WikiMultiHopQA-500 验证错误发现和路由分析。"],
    evidence: ["WISE 2026", "HotpotQA error-detection AUC 0.6077 → 0.6321", "审计队列支持无需重新生成的回放"],
    stack: ["GraphRAG", "Evidence Monitoring", "Audit Trace", "Python", "Evaluation"],
    emphasis: true,
  },
  {
    name: "FinCoder",
    subtitle: "带审计回路的金融 Coding Agent",
    role: "面向财务报表的可审计数值问答与工具执行系统。",
    signature: "让模型负责规划，让程序负责计算、追溯和拒答。",
    problem: "解决财务报表中的口径、单位、来源和计算错误无法被可靠发现的问题。",
    method: "Agent Loop + 隔离工具执行 + append-only 审计链 + ref_node 计算 DAG + Repair 子循环。",
    contributions: [
      "设计工具 Schema、隔离执行器、计算链和审计器的边界。",
      "实现单位检查、来源追溯、交叉核验、独立重算和 Repair。",
      "构建七维确定性评估框架，拒绝使用 LLM Judge 判断财务正确性。",
    ],
    evidence: ["10 份年报 30/30 报表发现", "27 PASS / 3 WARN / 0 FAIL", "26 个端到端用例 100% 通过"],
    stack: ["Python", "Pydantic", "Decimal", "PDF/Excel", "pytest"],
    emphasis: true,
  },
  {
    name: "同心杯金融知识平台",
    subtitle: "金融文档问答、数值统计与时序预测",
    role: "七模块金融文档分析系统。",
    signature: "用原文证据解释，用结构化事实计算。",
    problem: "解决 PDF 表格难解析、数值问题不能稳定计算、结果无法回溯来源的问题。",
    method: "PDF → Chunk → Fact → 双物理向量库/Neo4j → 严格二选一路由 → 问答或确定性计算。",
    contributions: [
      "设计双向量库、dataset_version 和四级证据追溯标识。",
      "设计 general_qa / quantitative_analysis 二选一路由。",
      "用固定统计模板、fact_id 绑定和 Decimal 执行确定性计算。",
    ],
    evidence: ["七模块 MVP 闭环", "FAISS + BM25 + Reranker", "fact_id → 原文页码可追溯"],
    stack: ["Python", "FAISS", "BM25", "Neo4j", "Decimal"],
    emphasis: true,
  },
  {
    name: "OpenFusionKGQA",
    subtitle: "开放语料知识图谱融合与 GraphRAG",
    role: "开放文本抽取、图谱融合、社区证据和带引用问答原型。",
    signature: "让开放文本变成可检查、可引用的图谱证据。",
    problem: "解决实体别名、关系噪声、三元组可信度和多跳问答证据不足的问题。",
    method: "候选抽取 → 实体/关系对齐 → 证据评分与 rejected triples → local/global GraphRAG QA。",
    contributions: [
      "设计 candidate/final/rejected artifact 分层。",
      "实现 JSON/Neo4j 图存储、三层向量召回和 citation 元数据。",
      "搭建离线 release gate、HotpotQA 和失败分类评估。",
    ],
    evidence: ["Full pytest 459 passed", "Offline QA 7/7", "HotpotQA real100 78/100"],
    stack: ["Python", "Neo4j", "NetworkX", "FastAPI", "pytest"],
  },
  {
    name: "技术雷达知识库",
    subtitle: "本地优先个人知识工程系统",
    role: "用 Markdown、Git、索引、图谱和 Claude Code 管理长期知识资产。",
    signature: "把学习资料编译成可追溯、可搜索、可维护的知识系统。",
    problem: "解决资料分散、知识重复、来源丢失和 Agent 修改不可控的问题。",
    method: "raw 证据区 → Markdown/frontmatter 页面 → 索引/分类/图谱 → 健康检查 → Web/Claude Code。",
    contributions: [
      "设计页面协议、来源、双链和派生索引。",
      "开发动态分类、知识图谱和健康检查脚本。",
      "集成 Claude Code 安全写入、刷新回执和 Web Viewer。",
    ],
    evidence: ["134 概念页", "148 图谱节点 / 855 条边", "断链 0"],
    stack: ["Markdown", "Git", "Python", "Cytoscape", "Claude Code"],
  },
  {
    name: "LLM Wiki",
    subtitle: "面向 Agent 的本地长期记忆",
    role: "Agent Wiki · 本地知识工具",
    signature: "把原始资料整理成有来源、可维护、可复用的 Markdown 记忆。",
    problem: "跨会话工作需要持久知识，原始材料检索难以持续积累结构和关联。",
    method: "不可变原始源 → 关联 Wiki → CLI / MCP，通过维护计划和健康检查管理知识更新。",
    contributions: ["保存来源、概念页面和交叉链接。", "提供搜索、MCP 工具和跨会话知识访问。", "通过 safe plans、dry-run apply 和健康检查维护知识。"],
    evidence: ["CLI 与 MCP 接口", "来源追踪与关联页面", "安全维护计划与健康检查"],
    stack: ["Python", "Markdown", "MCP", "CLI"],
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: "Agent And Orchestration",
    items: ["Python", "LangChain", "LangGraph", "MCP", "ReAct-style tool use"],
  },
  {
    title: "Retrieval And Evaluation",
    items: ["FAISS", "BM25", "RAGAS", "pytest", "benchmark scripts"],
  },
  {
    title: "Knowledge Graph",
    items: ["NetworkX", "Neo4j", "graph fusion", "Louvain community detection"],
  },
  {
    title: "Backend And Data",
    items: ["FastAPI", "Uvicorn", "Pydantic", "SQLite", "JSON artifacts"],
  },
  {
    title: "Frontend And Deployment",
    items: ["React", "TypeScript", "Vite", "GitHub Pages-ready static build"],
  },
];
