import { ArrowUpRight, BookOpenCheck, GraduationCap } from "lucide-react";
import type { EvidenceMetric, Identity } from "../data/projects";

type HeroProps = {
  identity: Identity;
  metrics: EvidenceMetric[];
};

export function Hero({ identity, metrics }: HeroProps) {
  const headlineMetrics = metrics.slice(0, 4);

  return (
    <section className="hero section-band">
      <div className="hero-copy">
        <p className="eyebrow">Research & Systems Portfolio</p>
        <h1>{identity.name}</h1>
        <p className="identity-line">{identity.role}</p>
        <p className="direction">{identity.direction} · 从需求拆解到可验证交付</p>
        <p className="thesis">{identity.thesis}</p>
        <div className="tag-row" aria-label="capability tags">
          {identity.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#projects" className="primary-link">
            查看代表项目 <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="#publications" className="secondary-link">
            查看研究论文
          </a>
        </div>
      </div>
      <aside className="profile-panel" aria-label="research profile summary">
        <div className="panel-heading">
          <GraduationCap size={20} aria-hidden="true" />
          <span>Profile</span>
        </div>
        <p className="profile-summary">
          面向 AI Agent、知识增强和可审计智能系统，展示从知识工程、GraphRAG 到金融数值推理与 Agent 记忆的完整项目链路。
        </p>
        <div className="hero-stats">
          <div>
            <strong>6</strong>
            <span>研究与工程案例</span>
          </div>
          <div>
            <strong>3</strong>
            <span>研究论文</span>
          </div>
        </div>
        <p className="panel-subtitle">Research</p>
        <ul className="metric-list compact">
          {headlineMetrics.map((metric) => (
            <li key={`${metric.project}-${metric.label}`}>
              <BookOpenCheck size={16} aria-hidden="true" />
              <span>
                <strong>{metric.value}</strong> {metric.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
