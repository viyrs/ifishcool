import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";
import { PROJECT_CARDS, type ProjectCard } from "../config/projects";
import { useProjectsStripAnimation } from "../hooks/useProjectsStripAnimation";

type ProjectsStripProps = {
  introReady?: boolean;
  shellRef?: RefObject<HTMLDivElement | null>;
};

const THUMB_CLASSES: string[] = [
  "project-card-thumb--one",
  "project-card-thumb--two",
  "project-card-thumb--three",
  "project-card-thumb--four",
  "project-card-thumb--five",
  "project-card-thumb--six",
  "project-card-thumb--seven",
  "project-card-thumb--eight",
  "project-card-thumb--nine",
  "project-card-thumb--ten",
  "project-card-thumb--eleven",
  "project-card-thumb--twelve",
  "project-card-thumb--thirteen",
  "project-card-thumb--fourteen",
  "project-card-thumb--fifteen",
  "project-card-thumb--sixteen",
  "project-card-thumb--seventeen",
  "project-card-thumb--eighteen",
  "project-card-thumb--nineteen",
  "project-card-thumb--twenty",
];

const ProjectsStrip = ({ introReady = true, shellRef }: ProjectsStripProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectCard | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const expandAudioRef = useRef<HTMLAudioElement | null>(null);

  useProjectsStripAnimation(sectionRef, introReady, shellRef, hoverAudioRef);

  // When the modal is open, lock background scroll so only the article scrolls
  useEffect(() => {
    if (!activeProject) return undefined;

    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevHtmlOverflow = htmlStyle.overflow;

    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = prevBodyOverflow;
      htmlStyle.overflow = prevHtmlOverflow;
    };
  }, [activeProject]);

  const handleCloseProject = () => {
    if (!sectionRef.current) {
      setActiveProject(null);
      return;
    }

    const panel = sectionRef.current.querySelector<HTMLElement>(
      ".project-modal-panel"
    );

    if (!panel) {
      setActiveProject(null);
      return;
    }

    gsap.to(panel, {
      y: -300,
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setActiveProject(null);
      },
    });
  };

  const handleCardClick = (project: ProjectCard) => {
    try {
      if (!expandAudioRef.current) {
        expandAudioRef.current = new Audio("/expand.mp3");
        expandAudioRef.current.volume = 0.4;
      }

      expandAudioRef.current.currentTime = 0;
      expandAudioRef.current.play().catch(() => {
        // ignore play errors
      });
    } catch {
      // ignore Audio construction errors
    }

    setActiveProject(project);
  };

  // Animate modal panel entrance: drop down from top with a soft bounce
  useEffect(() => {
    if (!activeProject || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const panel = sectionRef.current!.querySelector<HTMLElement>(
        ".project-modal-panel"
      );

      if (!panel) return;

      gsap.fromTo(
        panel,
        {
          y: -300,
          opacity: 0,
          scale: 1,
          transformOrigin: "50% 0%",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [activeProject]);

  return (
    <section className="projects-strip" ref={sectionRef}>
      <div className="projects-strip-inner">
        <div className="projects-strip-label">PROJECTS · HIGHLIGHTS</div>
        <div className="projects-strip-track">
          {PROJECT_CARDS.map((project, index) => {
            const thumbClass =
              THUMB_CLASSES[index % THUMB_CLASSES.length] ?? THUMB_CLASSES[0];
            const projectId = `project-${index + 1}`;

            return (
              <article
                id="card-click"
                className="project-card"
                key={projectId}
                onClick={() => handleCardClick(project)}
              >
                <div className={"project-card-thumb " + thumbClass} />
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-meta">{project.meta}</p>
                <p className="project-card-desc">{project.desc}</p>
              </article>
            );
          })}
        </div>

        <div className="projects-orbit-layer" aria-hidden="true">
          <svg
            className="projects-orbit-svg"
            viewBox="0 0 400 180"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              className="projects-orbit-planet projects-orbit-planet--one"
              cx="80"
              cy="90"
              r="10"
            />
            <circle
              className="projects-orbit-planet projects-orbit-planet--two"
              cx="200"
              cy="50"
              r="7"
            />
            <circle
              className="projects-orbit-planet projects-orbit-planet--three"
              cx="320"
              cy="120"
              r="9"
            />
          </svg>
        </div>

        {activeProject && (
          <div className="project-modal-overlay" onClick={handleCloseProject}>
            <div
              className="project-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="project-modal-header">
                <div>
                  <div className="project-modal-label">PROJECT STORY</div>
                  <h2 className="project-modal-title">{activeProject.title}</h2>
                  <div className="project-modal-meta">{activeProject.meta}</div>
                </div>
                <button
                  type="button"
                  className="project-modal-close"
                  onClick={handleCloseProject}
                >
                  Close
                </button>
              </div>

              <div className="project-modal-body">
                <ReactMarkdown>{activeProject.bodyMd}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsStrip;
