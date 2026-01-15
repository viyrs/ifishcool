import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export const useBigFooterAnimation = (
  sectionRef: React.RefObject<HTMLElement | null>
) => {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const planets = section.querySelectorAll<SVGCircleElement>(
        ".big-footer-orbit-planet"
      );
      const orbits = section.querySelectorAll<SVGPathElement>(
        ".big-footer-orbit-path"
      );

      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      });

      if (planets.length) {
        gsap.to(planets, {
          y: (i) => (i % 2 === 0 ? -6 : 6),
          x: (i) => (i - (planets.length - 1) / 2) * 3,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.6,
            from: "edges",
          },
        });
      }

      if (orbits.length) {
        gsap.fromTo(
          orbits,
          { strokeDashoffset: 120 },
          {
            strokeDashoffset: 0,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 1.2,
              from: "center",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);
};
