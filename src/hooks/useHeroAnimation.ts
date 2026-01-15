import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(MotionPathPlugin, ScrambleTextPlugin);

export type HeroAnimationRefs = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  leftTextRef: React.RefObject<HTMLDivElement | null>;
  rightTextRef: React.RefObject<HTMLDivElement | null>;
  circleRef: React.RefObject<HTMLDivElement | null>;
  squareRef: React.RefObject<HTMLDivElement | null>;
  triangleRef: React.RefObject<HTMLDivElement | null>;
  orbitPathRef: React.RefObject<SVGPathElement | null>;
  orbitDotRef: React.RefObject<SVGCircleElement | null>;
};

export const useHeroAnimation = (
  introReady: boolean,
  refs: HeroAnimationRefs
) => {
  const {
    rootRef,
    titleRef,
    subtitleRef,
    leftTextRef,
    rightTextRef,
    circleRef,
    squareRef,
    triangleRef,
    orbitPathRef,
    orbitDotRef,
  } = refs;

  useLayoutEffect(() => {
    if (!introReady || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        rootRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 }
      );

      if (titleRef.current) {
        const words =
          titleRef.current.querySelectorAll<HTMLElement>(".hero-word");

        words.forEach((word, index) => {
          const finalText = word.textContent || "";
          // Clear initial text first to avoid a flash before scramble animation
          word.textContent = "";

          gsap.to(word, {
            duration: 1.4,
            delay: 0.4 + index * 0.12,
            scrambleText: {
              text: finalText,
              chars: "01/\\_-+*",
              speed: 0.4,
            },
            ease: "power2.out",
          });
        });
      }

      if (orbitPathRef.current && orbitDotRef.current) {
        const path = orbitPathRef.current;
        const dot = orbitDotRef.current;

        gsap.set(dot, { opacity: 0 });

        gsap.to(dot, {
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "power1.out",
        });

        gsap.to(dot, {
          duration: 18,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
          },
        });
      }

      if (circleRef.current) {
        gsap.to(circleRef.current, {
          y: -18,
          x: 10,
          rotation: 360,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (squareRef.current) {
        gsap.to(squareRef.current, {
          y: 24,
          x: -14,
          rotation: -360,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (triangleRef.current) {
        gsap.to(triangleRef.current, {
          y: -22,
          x: -6,
          rotation: 180,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (leftTextRef.current) {
        gsap.to(leftTextRef.current, {
          y: 30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (rightTextRef.current) {
        gsap.to(rightTextRef.current, {
          y: -30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          ">-0.1"
        );
      }

      let handleMouseMove: ((event: MouseEvent) => void) | undefined;

      if (leftTextRef.current || rightTextRef.current) {
        const leftEl = leftTextRef.current;
        const rightEl = rightTextRef.current;

        handleMouseMove = (event: MouseEvent) => {
          const vw = window.innerWidth || 1;
          const threshold = 140; // Pixels from each edge
          const x = event.clientX;

          // Left side: closer to left edge, text moves slightly inward
          if (leftEl) {
            const leftIntensity = Math.max(
              0,
              Math.min(1, (threshold - x) / threshold)
            );
            const leftOffset = leftIntensity * 14; // Offset to the right
            gsap.to(leftEl, {
              x: leftOffset,
              duration: 0.35,
              ease: "sine.out",
            });
          }

          // Right side: closer to right edge, text moves slightly inward
          if (rightEl) {
            const rightDist = vw - x;
            const rightIntensity = Math.max(
              0,
              Math.min(1, (threshold - rightDist) / threshold)
            );
            const rightOffset = -rightIntensity * 14; // Offset to the left
            gsap.to(rightEl, {
              x: rightOffset,
              duration: 0.35,
              ease: "sine.out",
            });
          }
        };

        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (handleMouseMove) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [
    introReady,
    rootRef,
    titleRef,
    subtitleRef,
    leftTextRef,
    rightTextRef,
    circleRef,
    squareRef,
    triangleRef,
    orbitPathRef,
    orbitDotRef,
  ]);
};
