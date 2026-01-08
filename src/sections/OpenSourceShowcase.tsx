import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export type OpenSourceRepoCard = {
  id: string;
  name: string;
  description: string;
  tech: string;
  stars: string;
};

const OSS_REPOS: OpenSourceRepoCard[] = [
  {
    id: "prompt-orbit",
    name: "prompt-orbit",
    description:
      "Composable prompt pipeline toolkit for multi-agent LLM systems.",
    tech: "TypeScript · Node · OpenAI",
    stars: "1.2k",
  },
  {
    id: "neon-gsap-lab",
    name: "neon-gsap-lab",
    description:
      "Collection of GSAP motion experiments for creative UI and landing pages.",
    tech: "React · GSAP · SVG",
    stars: "860",
  },
  {
    id: "ai-notes-archive",
    name: "ai-notes-archive",
    description:
      "Public notebook templates and utilities for AI-assisted workflows.",
    tech: "Jupyter · Python · LangChain",
    stars: "640",
  },
];

const OpenSourceShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const cards = section.querySelectorAll<HTMLElement>(".oss-vault-card");

      // Fade the whole section in when it enters the viewport
      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (cards.length) {
        // Set initial rotation so center card正面，两侧略微倾斜
        cards.forEach((card, index) => {
          const mid = (cards.length - 1) / 2;
          const offset = index - mid;
          const baseRot = gsap.utils.clamp(-16, 16, offset * 8);
          gsap.set(card, {
            rotation: baseRot,
            transformOrigin: "50% 100%",
          });
        });

        // Create an orbital-style horizontal sway with rotation
        gsap.to(cards, {
          x: (i) => (i - (cards.length - 1) / 2) * 12,
          y: (i) => Math.abs(i - (cards.length - 1) / 2) * 6,
          rotation: (i) => {
            const mid = (cards.length - 1) / 2;
            const offset = i - mid;
            return gsap.utils.clamp(-22, 22, offset * 10);
          },
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.4,
            from: "center",
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="oss-section" ref={sectionRef}>
      <div className="oss-inner">
        <div className="oss-header">
          <p className="oss-label">OPEN SOURCE · HIGHLIGHTS</p>
        </div>

        <div className="oss-track">
          {OSS_REPOS.map((repo) => (
            <article key={repo.id} className="oss-vault-card">
              <div className="oss-vault-pill-row">
                <span className="oss-vault-pill">OPEN SOURCE</span>
                <span className="oss-vault-pill oss-vault-pill-muted">
                  HIGHLIGHT
                </span>
              </div>

              <div className="oss-vault-header">
                <h3 className="oss-vault-title">{repo.name}</h3>
                <p className="oss-vault-subtitle">{repo.description}</p>
              </div>

              <div className="oss-vault-thumb" />

              <div className="oss-vault-meta">
                <span className="oss-vault-tech">{repo.tech}</span>
                <span className="oss-vault-stars">★ {repo.stars}</span>
              </div>

              <button className="oss-vault-cta" type="button">
                查看仓库
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSourceShowcase;
