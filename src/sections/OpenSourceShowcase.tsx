import { useLayoutEffect, useRef, useState } from "react";
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
    id: "prompt-orbit",
    name: "prompt-orbit",
    description:
      "Composable prompt pipeline toolkit for multi-agent LLM systems.",
    tech: "TypeScript · Node · OpenAI",
    stars: "1.2k",
  },
  {
    id: "prompt-orbit",
    name: "prompt-orbit",
    description:
      "Composable prompt pipeline toolkit for multi-agent LLM systems.",
    tech: "TypeScript · Node · OpenAI",
    stars: "1.2k",
  },
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
  const [visibleRepos, setVisibleRepos] =
    useState<OpenSourceRepoCard[]>(OSS_REPOS);
  const [isShuffling, setIsShuffling] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const cards = section.querySelectorAll<HTMLElement>(".oss-vault-card");
      const shuffleBtn = section.querySelector<HTMLElement>(".oss-shuffle-btn");

      const mm = gsap.matchMedia();

      // Only run OSS animations on desktop / larger screens
      mm.add("(min-width: 769px)", () => {
        // Fade the whole section in when it enters the viewport
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        if (cards.length) {
          // Entrance: cards expand out from the center when scrolled into view
          gsap.from(cards, {
            scale: 0.7,
            opacity: 0,
            y: 80,
            duration: 0.9,
            ease: "power3.out",
            stagger: {
              each: 0.12,
              from: "center",
            },
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          if (shuffleBtn) {
            // Shuffle button enters slightly after cards, from center
            gsap.from(shuffleBtn, {
              scale: 0.7,
              opacity: 0,
              y: 40,
              duration: 0.7,
              ease: "back.out(1.8)",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // Create a gentle horizontal / vertical sway (no rotation)
          gsap.to(cards, {
            x: (i) => (i - (cards.length - 1) / 2) * 12,
            y: (i) => Math.abs(i - (cards.length - 1) / 2) * 3,
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
      });
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
          {visibleRepos.map((repo, index) => (
            <article key={index} className="oss-vault-card">
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

        <div className="oss-actions">
          <button
            type="button"
            className="oss-shuffle-btn"
            disabled={isShuffling}
            onClick={() => {
              if (!sectionRef.current || isShuffling) return;

              const cards =
                sectionRef.current.querySelectorAll<HTMLElement>(
                  ".oss-vault-card"
                );

              const shuffleBtn =
                sectionRef.current.querySelector<HTMLElement>(
                  ".oss-shuffle-btn"
                );

              if (!cards.length) return;

              const isMobile = window.matchMedia("(max-width: 768px)").matches;

              // On mobile: simple data shuffle without animation
              if (isMobile) {
                setVisibleRepos((prev) => {
                  const next = [...prev];
                  for (let i = next.length - 1; i > 0; i -= 1) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [next[i], next[j]] = [next[j], next[i]];
                  }
                  return next;
                });
                return;
              }

              // Desktop: keep the animated shuffle timeline
              setIsShuffling(true);

              const tl = gsap.timeline({
                onComplete: () => {
                  setIsShuffling(false);
                },
              });

              tl.to(cards, {
                scale: 0.86,
                opacity: 0.55,
                duration: 0.25,
                ease: "power2.in",
                stagger: 0.04,
              })
                .to(
                  shuffleBtn,
                  {
                    scale: 0.9,
                    opacity: 0.7,
                    duration: 0.22,
                    ease: "power2.in",
                  },
                  "<"
                )
                .add(() => {
                  // 中间时刻替换卡片里的数据，模拟重新发牌
                  setVisibleRepos((prev) => {
                    const next = [...prev];
                    for (let i = next.length - 1; i > 0; i -= 1) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [next[i], next[j]] = [next[j], next[i]];
                    }
                    return next;
                  });
                })
                .to(cards, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.32,
                  ease: "back.out(1.6)",
                  stagger: 0.06,
                })
                .to(
                  shuffleBtn,
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.26,
                    ease: "back.out(1.6)",
                  },
                  "<"
                );
            }}
          >
            换一换
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceShowcase;
