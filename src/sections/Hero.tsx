import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(MotionPathPlugin, ScrambleTextPlugin);

type HeroProps = {
  introReady?: boolean;
};

const Hero = ({ introReady = true }: HeroProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const rightTextRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const triangleRef = useRef<HTMLDivElement | null>(null);
  const orbitPathRef = useRef<SVGPathElement | null>(null);
  const orbitDotRef = useRef<SVGCircleElement | null>(null);

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
          // 先清空文字，避免初始闪现
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
    }, rootRef);
    let handleMouseMove: ((event: MouseEvent) => void) | undefined;

    if (leftTextRef.current || rightTextRef.current) {
      const leftEl = leftTextRef.current;
      const rightEl = rightTextRef.current;

      handleMouseMove = (event: MouseEvent) => {
        const vw = window.innerWidth || 1;
        const threshold = 140; // px from each edge
        const x = event.clientX;

        // 左侧：鼠标越靠近左边缘，文字越往内缩一点
        if (leftEl) {
          const leftIntensity = Math.max(
            0,
            Math.min(1, (threshold - x) / threshold)
          );
          const leftOffset = leftIntensity * 14; // 向右偏移
          gsap.to(leftEl, {
            x: leftOffset,
            duration: 0.35,
            ease: "sine.out",
          });
        }

        // 右侧：鼠标越靠近右边缘，文字越往内缩一点
        if (rightEl) {
          const rightDist = vw - x;
          const rightIntensity = Math.max(
            0,
            Math.min(1, (threshold - rightDist) / threshold)
          );
          const rightOffset = -rightIntensity * 14; // 向左偏移
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
      ctx.revert();
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [introReady]);

  return (
    <main className="hero-root" ref={rootRef}>
      <div className="hero-decor-layer">
        <div className="hero-decor hero-decor-circle" ref={circleRef} />
        <div className="hero-decor hero-decor-square" ref={squareRef} />

        <svg
          className="hero-orbit-svg"
          viewBox="0 0 400 160"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            ref={orbitPathRef}
            className="hero-orbit-path"
            d="M20 120 C 120 20, 280 20, 380 120"
          />
          <circle
            ref={orbitDotRef}
            className="hero-orbit-dot"
            r="4"
            cx="20"
            cy="120"
          />
        </svg>
      </div>

      <div className="side-text side-text-left" ref={leftTextRef}>
        <span>DEV · AI · DESIGN</span>
      </div>
      <div className="side-text side-text-right" ref={rightTextRef}>
        <span>PORTFOLIO · 2025</span>
      </div>

      <section className="hero-content">
        <div className="hero-title-block">
          <h1 className="hero-title-main pacifico-regular" ref={titleRef}>
            <span className="hero-word">Dev</span>
            <span className="hero-word">Toolkit</span>
            <span className="hero-word">for</span>
            <br />
            <span className="hero-word">AI</span>
            <span className="hero-word">×</span>
            <span className="hero-word">Design</span>
            <span className="hero-word">Products</span>
          </h1>
        </div>
      </section>
    </main>
  );
};

export default Hero;
