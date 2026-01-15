import { useRef, useState } from "react";
import { gsap } from "gsap";
import { OSS_REPOS, type OpenSourceRepoCard } from "../config/openSource";
import { useOpenSourceShowcaseAnimation } from "../hooks/useOpenSourceShowcaseAnimation";

const OSS_PAGE_SIZE = 3;
const OSS_TOTAL_PAGES = Math.ceil(OSS_REPOS.length / OSS_PAGE_SIZE);

const OpenSourceShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleRepos, setVisibleRepos] = useState<OpenSourceRepoCard[]>(
    OSS_REPOS.slice(0, OSS_PAGE_SIZE)
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  useOpenSourceShowcaseAnimation(sectionRef);

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
                View Repository
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

              try {
                if (!hoverAudioRef.current) {
                  hoverAudioRef.current = new Audio("/clickSmall.mp3");
                  hoverAudioRef.current.volume = 0.3;
                }

                hoverAudioRef.current.currentTime = 0;
                hoverAudioRef.current.play().catch(() => {
                  // ignore play errors
                });
              } catch {
                // ignore Audio construction errors
              }

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

              const nextPage = (pageIndex + 1) % OSS_TOTAL_PAGES;

              const applyPage = () => {
                setPageIndex(nextPage);
                const start = nextPage * OSS_PAGE_SIZE;
                setVisibleRepos(OSS_REPOS.slice(start, start + OSS_PAGE_SIZE));
              };

              // On mobile: simple paging without animation
              if (isMobile) {
                applyPage();
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
                  // Switch to the next page of data at the midpoint of the animation
                  applyPage();
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
            Shuffle
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceShowcase;
