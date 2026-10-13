import { ArrowLeft, CheckCircle2, Layers3, Target, Wrench } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectDetailProps = { project: Project };

const problemSolving: Record<string, { challenge: string; method: string; proof: string }> = {
  FinCoder: {
    challenge: "模型可能选错口径、单位或来源，但错误数字看起来仍然合理。",
    method: "我把计算拆成可追溯的 ref_node DAG，用单位检查、来源检查和独立重算建立失败边界；审计失败就进入 Repair，而不是继续生成。",
    proof: "10 份真实年报 30/30 报表发现，27 PASS / 3 WARN / 0 FAIL；26 个端到端用例通过。",
  },
  "同心杯金融知识平台": {
    challenge: "原文问答和数值计算需要不同证据，混在一起会让召回和计算都不可控。",
    method: "我将原文 Chunk 与结构化 Fact 物理隔离，使用严格二选一路由；模型只选择模板和事实，Decimal 由程序执行。",
    proof: "建立 document_id、chunk_id、fact_id、dataset_version 四级追溯链，结果可回到原始 PDF。",
  },
  "Agent Learning Assistant": {
    challenge: "Agent 同时面对检索、工具、记忆和学习状态，任何一层失败都可能污染最终回答。",
    method: "我用 HarnessExecutor 统一状态边界，给工具做参数归一化和 fallback，对答案做 Self-RAG 校验，并用重要性门控写入记忆。",
    proof: "2051 个文档块，retrieval smoke 30/30，需要检索样例 context recall 1.0。",
  },
  OpenFusionKGQA: {
    challenge: "开放文本抽取噪声大，错误三元组一旦进入图谱会持续污染问答。",
    method: "我把候选抽取、融合和最终图谱分层，保留 rejected triples 与拒绝原因，再分别评估证据召回和答案选择。",
    proof: "459 个测试通过，Offline QA 7/7；HotpotQA real100 support recall 1.0。",
  },
  "技术雷达知识库": {
    challenge: "知识页面、索引、分类、图谱和 Agent 写入很容易产生状态漂移。",
    method: "我把索引和图谱设计成可重建派生物，用健康检查、Git 快照、白名单写入和刷新回执形成维护闭环。",
    proof: "维护 134 个知识页、148 个图谱节点、855 条边，断链 0。",
  },
  "NarraGraph（忆绘）": {
    challenge: "多章图像生成容易出现人物漂移、镜头重复和失败后全量重跑。",
    method: "我先建立章节、角色阶段和视觉母题，再用设定图约束生成，并将分析、插画、排版和 QC 分阶段持久化。",
    proof: "每次运行保留 manifest、原始图、排版页、PDF 和 QC 报告，可局部恢复和人工复核。",
  },
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <main className="detail-page">
      <div className="detail-topbar">
        <a className="back-link" href="#projects"><ArrowLeft size={16} aria-hidden="true" /> 返回项目列表</a>
        <span>PROJECT WALKTHROUGH</span>
      </div>
      <header className="detail-hero">
        <p className="eyebrow">{project.subtitle}</p>
        <h1>{project.name}</h1>
        <p className="detail-lead">{project.signature}</p>
        <div className="tag-row">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
      </header>
      <section className="detail-grid">
        <article className="detail-card detail-card-wide problem-solving-card">
          <div className="detail-label"><Wrench size={17} aria-hidden="true" /> Problem Solving</div>
          <h2>我如何解决问题</h2>
          <div className="solution-grid">
            <div><span className="solution-step">01 · 识别风险</span><p>{problemSolving[project.name]?.challenge ?? "先明确系统中最可能导致错误的环节和失败条件。"}</p></div>
            <div><span className="solution-step">02 · 技术取舍</span><p>{problemSolving[project.name]?.method ?? "把不确定部分隔离，并将关键结果交给可测试的程序逻辑。"}</p></div>
            <div><span className="solution-step">03 · 证据验证</span><p>{problemSolving[project.name]?.proof ?? "用测试、日志、指标和可复现产物验证方案，而不是只展示 Demo。"}</p></div>
          </div>
        </article>
        <article className="detail-card detail-card-wide">
          <div className="detail-label"><Target size={17} aria-hidden="true" /> 商业场景</div>
          <h2>谁需要它，为什么值得做</h2>
          <p>{project.role}</p>
          <p>{project.problem}</p>
          <p>这个项目的核心价值不是增加一个功能，而是把高频、易错或需要追溯的工作变成可重复的系统流程。</p>
        </article>
        <article className="detail-card detail-card-wide">
          <div className="detail-label"><Layers3 size={17} aria-hidden="true" /> 系统方案</div>
          <h2>从输入到结果</h2>
          <p>{project.method}</p>
          <div className="detail-flow">需求输入 <span>→</span> 结构化处理 <span>→</span> Agent / 工具执行 <span>→</span> 证据与结果</div>
        </article>
        <article className="detail-card">
          <div className="detail-label"><Wrench size={17} aria-hidden="true" /> 我的贡献</div>
          <h2>我具体做了什么</h2>
          <ul className="detail-list">{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="detail-card">
          <div className="detail-label"><CheckCircle2 size={17} aria-hidden="true" /> 结果证据</div>
          <h2>如何验证</h2>
          <ul className="detail-list evidence-list">{project.evidence.map((item) => <li key={item}><CheckCircle2 size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </article>
      </section>
      <footer className="detail-footer"><a className="back-link" href="#projects"><ArrowLeft size={16} aria-hidden="true" /> 查看其他项目</a></footer>
    </main>
  );
}
