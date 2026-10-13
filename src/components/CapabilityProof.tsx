import { ArrowRight, CheckCheck, Code2, ShieldCheck, Workflow } from "lucide-react";

const proofs = [
  { icon: Workflow, title: "把需求拆成系统", text: "能从业务问题拆出数据、状态、工具、模型和验收边界。", example: "同心杯七模块架构" },
  { icon: Code2, title: "把模型接进工程", text: "能实现 Agent loop、工具协议、路由、API、CLI 和前端工作台。", example: "FinCoder / Agent Learning Assistant" },
  { icon: ShieldCheck, title: "让结果可以相信", text: "能处理溯源、审计、拒答、注入、降级和失败后的修复。", example: "ref_node DAG / Self-RAG / QC" },
  { icon: CheckCheck, title: "用证据验证交付", text: "能建立测试集、回归脚本、指标和发布门槛，而不是只展示 Demo。", example: "26/26 · 459 tests · 30/30" },
];

export function CapabilityProof() {
  return (
    <section className="section-band capability-proof" id="capabilities">
      <div className="section-heading">
        <p className="eyebrow">Engineering Proof</p>
        <h2>我不是只会调用模型</h2>
        <p>我能把模型能力放进真实系统，并对系统的边界、失败和结果负责。</p>
      </div>
      <div className="proof-grid">
        {proofs.map(({ icon: Icon, title, text, example }) => (
          <article className="proof-item" key={title}>
            <Icon size={21} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
            <span>{example}<ArrowRight size={14} aria-hidden="true" /></span>
          </article>
        ))}
      </div>
    </section>
  );
}
