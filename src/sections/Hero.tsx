import { useRef } from "react";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

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
  useHeroAnimation(introReady, {
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
  });

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
