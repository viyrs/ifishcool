import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export const useOpenSourceShowcaseAnimation = (
  sectionRef: React.RefObject<HTMLElement | null>
) => {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const cards = section.querySelectorAll<HTMLElement>(".oss-vault-card");
      const shuffleBtn = section.querySelector<HTMLElement>(".oss-shuffle-btn");
      const planets =
        section.querySelectorAll<SVGCircleElement>(".oss-orbit-planet");

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

          // Set initial rotation so the center card faces forward and sides are slightly tilted
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
            y: (i) => Math.abs(i - (cards.length - 1) / 2) * 3,
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

          if (planets.length) {
            gsap.to(planets, {
              y: (i) => (i % 2 === 0 ? -6 : 6),
              x: (i) => (i - (planets.length - 1) / 2) * 4,
              scale: 1.1,
              duration: 4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              stagger: {
                each: 0.6,
                from: "edges",
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);
};
