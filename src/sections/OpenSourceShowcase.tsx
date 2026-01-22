import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { OSS_REPOS, type OpenSourceRepoCard } from '@ifc/config/openSource';
import { useOpenSourceShowcaseAnimation } from '@ifc/hooks/useOpenSourceShowcaseAnimation';
import clickSmallSound from '@ifc/assets/sounds/clickSmall.mp3';

const OSS_PAGE_SIZE = 3;

const OpenSourceShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleRepos, setVisibleRepos] = useState<OpenSourceRepoCard[]>(
    OSS_REPOS.slice(0, OSS_PAGE_SIZE)
  );
  const [isShuffling, setIsShuffling] = useState(false);

  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  useOpenSourceShowcaseAnimation(sectionRef);

  const getRandomRepos = (current: OpenSourceRepoCard[]) => {
    const pool = [...OSS_REPOS];
    const size = Math.min(OSS_PAGE_SIZE, pool.length);

    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    let next = pool.slice(0, size);

    if (
      current.length === next.length &&
      current.every((repo, index) => repo.name === next[index]?.name)
    ) {
      next = pool.slice(size, size * 2).slice(0, size);
      if (!next.length) {
        next = pool.slice(0, size);
      }
    }

    return next;
  };

  return (
    <section className='oss-section' ref={sectionRef}>
      <div className='oss-inner'>
        <div className='oss-header'>
          <p className='oss-label'>OPEN SOURCE · HIGHLIGHTS</p>
        </div>

        <div className='oss-track'>
          {visibleRepos.map((repo, index) => (
            <article key={index} className='oss-vault-card'>
              <div className='oss-vault-pill-row'>
                <span className='oss-vault-pill'>OPEN SOURCE</span>
                <span className='oss-vault-pill oss-vault-pill-muted'>
                  HIGHLIGHT
                </span>
              </div>

              <div className='oss-vault-header'>
                <h3 className='oss-vault-title'>{repo.name}</h3>
                <p className='oss-vault-subtitle'>{repo.description}</p>
              </div>

              <div className='oss-vault-meta'>
                <span className='oss-vault-tech'>{repo.tech}</span>
              </div>

              <button
                className='oss-vault-cta'
                type='button'
                onClick={() => window.open(repo.url)}
              >
                查看仓库
              </button>
            </article>
          ))}
        </div>

        <div className='oss-actions'>
          <button
            type='button'
            className='oss-shuffle-btn'
            disabled={isShuffling}
            onClick={() => {
              if (!sectionRef.current || isShuffling) return;

              try {
                if (!hoverAudioRef.current) {
                  hoverAudioRef.current = new Audio(clickSmallSound);
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
                  '.oss-vault-card'
                );

              const shuffleBtn =
                sectionRef.current.querySelector<HTMLElement>(
                  '.oss-shuffle-btn'
                );

              if (!cards.length) return;

              const isMobile = window.matchMedia('(max-width: 768px)').matches;

              const nextRepos = getRandomRepos(visibleRepos);

              const applyPage = () => {
                setVisibleRepos(nextRepos);
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
                ease: 'power2.in',
                stagger: 0,
              })
                .to(
                  shuffleBtn,
                  {
                    scale: 0.9,
                    opacity: 0.7,
                    duration: 0.22,
                    ease: 'power2.in',
                  },
                  '<'
                )
                .add(() => {
                  // Switch to the next page of data at the midpoint of the animation
                  applyPage();
                })
                .to(cards, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.32,
                  ease: 'back.out(1.6)',
                  stagger: 0,
                })
                .to(
                  shuffleBtn,
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.26,
                    ease: 'back.out(1.6)',
                  },
                  '<'
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
