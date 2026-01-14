import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactMarkdown from "react-markdown";

gsap.registerPlugin(ScrollTrigger);

type ProjectsStripProps = {
  introReady?: boolean;
  shellRef?: RefObject<HTMLDivElement | null>;
};

type ProjectCard = {
  title: string;
  meta: string;
  desc: string;
  bodyMd: string;
};

const PROJECT_CARDS: ProjectCard[] = [
  {
    title: "Generative Sketchpad",
    meta: "AI · Product · Frontend",
    desc: "Real-time canvas for exploring model-assisted drawing and interaction patterns.",
    bodyMd: `# Generative Sketchpad

An experimental **real-time canvas** for exploring model-assisted drawing and interaction patterns.

## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
- LLM-assisted ideation workflows`,
  },

  {
    title: "Generative Sketchpad",
    meta: "AI · Product · Frontend",
    desc: "Real-time canvas for exploring model-assisted drawing and interaction patterns.",
    bodyMd: `# Generative Sketchpad

An experimental **real-time canvas** for exploring model-assisted drawing and interaction patterns.

## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
- LLM-assisted ideation workflows`,
  },
  {
    title: "Generative Sketchpad",
    meta: "AI · Product · Frontend",
    desc: "Real-time canvas for exploring model-assisted drawing and interaction patterns.",
    bodyMd: `# Generative Sketchpad

An experimental **real-time canvas** for exploring model-assisted drawing and interaction patterns.

## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments## What it explores

- Mixing human sketching with generative AI
- Fast iteration loops on layout and composition
- Lightweight tooling that feels more like play than tooling

## Stack

- React + GSAP motion
- Canvas-based rendering experiments
- LLM-assisted ideation workflows`,
  },
  {
    title: "Prompt Playground",
    meta: "LLM · Tools",
    desc: "A tool for designing, testing and visualizing complex prompt flows for multi-agent systems.",
    bodyMd: `# Prompt Playground

Design, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remix
Design, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remixDesign, test and visualize **complex prompt flows** for multi-agent systems.

## Highlights

- Node-based flow editor for prompts
- Inline test runs with token + latency stats
- Versioned prompt snippets you can remix
## Stack

- React + TypeScript
- API-first prompt execution layer
- Experimental evaluation hooks`,
  },
  {
    title: "Neon Poster Engine",
    meta: "Design · Motion",
    desc: "Procedural poster generator with GSAP-driven motion previews and exportable frames.",
    bodyMd: `# Neon Poster Engine

Procedural **poster generator** with GSAP-driven motion previews and exportable frames.

## What it does

- Generates neon / acid-inspired layouts
- Lets you scrub through motion states before export
- Exports stills for print or social

## Ingredients

- GSAP timelines
- Parametric layout presets
- High-contrast type experiments`,
  },
  {
    title: "Studio Dashboard",
    meta: "Web · Data",
    desc: "A minimal control room interface for monitoring experiments and deployments.",
    bodyMd: `# Studio Dashboard

A minimal **control room interface** for monitoring experiments and deployments.

## Focus

- Quick at-a-glance status
- Minimal chrome, strong typography
- Dark-mode first, with accent signals

## Tech

- React + TypeScript
- API integrations for metrics & logs
- Micro-interactions to highlight change`,
  },
  {
    title: "OMAUKOL Index",
    meta: "Personal · Archive",
    desc: "Living index of works, notes and visual experiments across code, AI and design.",
    bodyMd: `# OMAUKOL Index

A living **index of works, notes and visual experiments** across code, AI and design.

## Intent

- Capture fragments instead of polished case studies
- Link ideas across time
- Keep the archive lightweight and explorable

## Surfaces

- Short notes
- Visual experiments
- Links into larger projects`,
  },
];

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

  useLayoutEffect(() => {
    if (!introReady || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const sectionRoot = sectionRef.current!;
      const triggerRoot = shellRef?.current ?? sectionRoot;
      const cards = sectionRoot.querySelectorAll<HTMLElement>(".project-card");
      const track = sectionRoot.querySelector<HTMLElement>(
        ".projects-strip-track"
      );
      const planets = sectionRoot.querySelectorAll<SVGCircleElement>(
        ".projects-orbit-planet"
      );

      if (cards.length) {
        gsap.from(cards, {
          y: () => gsap.utils.random(60, 140),
          opacity: 0,
          duration: 1.3,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.12,
            from: "random",
          },
        });
      }

      // Hover interaction: quick pop up on enter, snap back on leave
      cards.forEach((card) => {
        const handleEnter = () => {
          gsap.to(card, {
            y: -18,
            scale: 1.03,
            duration: 0.18,
            ease: "back.out(2.1)",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.16,
            ease: "back.in(1.8)",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);
      });

      // Scroll-triggered horizontal movement: user scrolls down, track
      // moves from right to left while section is pinned
      if (track && triggerRoot) {
        const cardCount = cards.length || 1;
        // Make scroll distance scale with how many cards we have so that
        // when there are many cards, the overall movement feels slower
        // relative to the user's scroll.
        const scrollDistance = 900 + cardCount * 50;

        gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRoot,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 3,
              pin: true,
              onUpdate: (self) => {
                if (!planets.length) return;
                const p = self.progress;
                // 只在最后 40% 的区间里逐渐点亮行星
                const visible = gsap.utils.clamp(0, 1, (p - 0.6) / 0.4);
                gsap.to(planets, {
                  scale: 0.6 + visible * 0.5,
                  opacity: visible,
                  duration: 0.25,
                  ease: "sine.out",
                });
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      if (sectionRef.current) {
        const cards =
          sectionRef.current.querySelectorAll<HTMLElement>(".project-card");
        cards.forEach((card) => {
          gsap.killTweensOf(card);
        });
      }

      ctx.revert();
    };
  }, [introReady, shellRef]);

  // When modal is open, lock background scroll so only the article scrolls
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
      y: 140,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActiveProject(null);
      },
    });
  };

  // Animate modal panel entrance: slide up from bottom with a soft bounce
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
          y: 140,
          opacity: 0,
          scale: 0.9,
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(2.1)",
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
                className="project-card"
                key={projectId}
                onClick={() => setActiveProject(project)}
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
