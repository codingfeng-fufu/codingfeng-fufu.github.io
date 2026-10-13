import { CheckCircle2 } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectSectionProps = {
  projects: Project[];
};

export function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <section className="section-band" id="projects">
      <div className="section-heading">
        <p className="eyebrow">Selected Projects</p>
        <h2>项目记录</h2>
        <p>每个项目都回答三个问题：解决谁的问题、我具体做了什么、结果如何被验证。</p>
      </div>
      <div className="project-timeline">
        {projects.map((project, index) => (
          <article className={project.emphasis ? "project-entry emphasis" : "project-entry"} key={project.name}>
            <div className="project-index">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <em>Project</em>
            </div>
            <div className="project-main">
              <div className="project-heading-row">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.subtitle}</p>
                </div>
                <div className="stack-tags compact-tags">
                  {project.stack.slice(0, 4).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <p className="project-signature">{project.signature}</p>
              <a className="project-detail-link" href={`#project=${encodeURIComponent(project.name)}`}>查看完整项目讲解 <span aria-hidden="true">↗</span></a>
              <div className="project-columns">
                <div>
                  <h4>Role</h4>
                  <p>{project.role}</p>
                </div>
                <div>
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <h4>Approach</h4>
                  <p>{project.method}</p>
                </div>
              </div>
              <div className="entry-detail-grid">
                <div>
                  <h4>Implementation Notes</h4>
                  <ul className="contribution-list">
                    {project.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Recorded Results</h4>
                  <ul className="evidence-list">
                    {project.evidence.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
