import type { StackGroup } from "../data/projects";

type StackSectionProps = {
  stackGroups: StackGroup[];
};

export function StackSection({ stackGroups }: StackSectionProps) {
  return (
    <section className="section-band" id="stack">
      <div className="section-heading">
        <p className="eyebrow">Technical Stack</p>
        <h2>技术栈</h2>
        <p>按项目中实际使用过的方向分组列出。</p>
      </div>
      <div className="stack-grid">
        {stackGroups.map((group) => (
          <article className="stack-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="stack-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
