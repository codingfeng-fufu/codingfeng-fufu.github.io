import type { FocusArea } from "../data/projects";

type FocusSectionProps = {
  focusAreas: FocusArea[];
};

export function FocusSection({ focusAreas }: FocusSectionProps) {
  return (
    <section className="section-band" id="focus">
      <div className="section-heading">
        <p className="eyebrow">What I Can Build</p>
        <h2>我能做什么</h2>
        <p>我把项目经验沉淀成四类可复用能力，每一类都能从需求、架构、实现到验证独立推进。</p>
      </div>
      <div className="focus-grid">
        {focusAreas.map((area, index) => (
          <article className="focus-card" key={area.title}>
            <span className="index-label">{String(index + 1).padStart(2, "0")}</span>
            <h3>{area.title}</h3>
            <p>{area.summary}</p>
            <ul>
              {area.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
