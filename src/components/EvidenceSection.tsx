import type { EvidenceMetric } from "../data/projects";

type EvidenceSectionProps = {
  metrics: EvidenceMetric[];
};

export function EvidenceSection({ metrics }: EvidenceSectionProps) {
  return (
    <section className="section-band evidence-section" id="evidence">
      <div className="section-heading">
        <p className="eyebrow">Recorded Results</p>
        <h2>已有记录中的数字</h2>
        <p>以下数字来自 README、报告或脚本输出记录，仅作项目完成情况参考。</p>
      </div>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={`${metric.project}-${metric.label}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.project}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
