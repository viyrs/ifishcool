import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectsStripProps = {
  introReady?: boolean;
  shellRef?: RefObject<HTMLDivElement | null>;
};

type ProjectCard = {
  id: string;
  title: string;
  meta: string;
  desc: string;
};

const PROJECT_CARDS: ProjectCard[] = [
  {
    id: "generative-sketchpad",
    title: "Generative Sketchpad",
    meta: "AI · Product · Frontend",
    desc: "Real-time canvas for exploring model-assisted drawing and interaction patterns.",
  },
  {
    id: "prompt-playground",
    title: "Prompt Playground",
    meta: "LLM · Tools",
    desc: "A tool for designing, testing and visualizing complex prompt flows for multi-agent systems.",
  },
  {
    id: "neon-poster-engine",
    title: "Neon Poster Engine",
    meta: "Design · Motion",
    desc: "Procedural poster generator with GSAP-driven motion previews and exportable frames.",
  },
  {
    id: "studio-dashboard",
    title: "Studio Dashboard",
    meta: "Web · Data",
    desc: "A minimal control room interface for monitoring experiments and deployments.",
  },
  {
    id: "omaukol-index",
    title: "OMAUKOL Index",
    meta: "Personal · Archive",
    desc: "Living index of works, notes and visual experiments across code, AI and design.",
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
        gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRoot,
              start: "top top",
              end: "+=1400", // 再拉长一点滚动距离，让节奏更从容
              scrub: 3, // 提升阻尼感：动画明显滞后，再缓缓追上滚动
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

  return (
    <section className="projects-strip" ref={sectionRef}>
      <div className="projects-strip-inner">
        <div className="projects-strip-label">PROJECTS · HIGHLIGHTS</div>
        <div className="projects-strip-track">
          {PROJECT_CARDS.map((project, index) => {
            const thumbClass =
              THUMB_CLASSES[index % THUMB_CLASSES.length] ?? THUMB_CLASSES[0];

            return (
              <article className="project-card" key={project.id}>
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
      </div>
    </section>
  );
};

export default ProjectsStrip;
