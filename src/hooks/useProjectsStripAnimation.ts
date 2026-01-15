import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useProjectsStripAnimation = (
  sectionRef: React.RefObject<HTMLElement | null>,
  introReady: boolean,
  shellRef?: React.RefObject<HTMLDivElement | null>,
  hoverAudioRef?: React.RefObject<HTMLAudioElement | null>
) => {
  useLayoutEffect(() => {
    if (!introReady || !sectionRef.current) return;

    const sectionEl = sectionRef.current;

    const ctx = gsap.context(() => {
      const sectionRoot = sectionEl!;
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
          if (hoverAudioRef) {
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
          }

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
                // Gradually light up the planets only in the last 40% of the scroll
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
      if (sectionEl) {
        const cards = sectionEl.querySelectorAll<HTMLElement>(".project-card");
        cards.forEach((card) => {
          gsap.killTweensOf(card);
        });
      }

      ctx.revert();
    };
  }, [introReady, sectionRef, shellRef, hoverAudioRef]);
};
