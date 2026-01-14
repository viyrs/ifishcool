import { Suspense, lazy, useRef } from "react";
import "./App.css";
import Hero from "./sections/Hero";
import ProjectsStrip from "./sections/ProjectsStrip";
import IntroGate from "./components/layout/IntroGate";
import TopNav from "./components/layout/TopNav";
import { useIntroGate } from "./hooks/useIntroGate";
import { useTopNavMenu } from "./hooks/useTopNavMenu";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

const TextScene = lazy(() => import("./sections/TextScene"));
const OpenSourceShowcase = lazy(() => import("./sections/OpenSourceShowcase"));
const BigFooter = lazy(() => import("./sections/BigFooter"));

function App() {
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const { introVisible, introAnimatingOut, handleIntroEnter, introReady } =
    useIntroGate();

  const { menuOpen, menuAnimatingOut, handleToggleMenu } = useTopNavMenu(
    headerRef,
    dropdownRef
  );

  const appRootClassName = introVisible
    ? "app-root app-root--intro-open"
    : "app-root";

  useSmoothScroll();

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className={appRootClassName}>
          {/* Only start Hero and Projects animations after intro gate is fully gone */}
          <div className="hero-projects-shell" ref={shellRef}>
            <IntroGate
              visible={introVisible}
              animatingOut={introAnimatingOut}
              onEnter={handleIntroEnter}
            />

            <TopNav
              ref={headerRef}
              menuOpen={menuOpen}
              menuAnimatingOut={menuAnimatingOut}
              onToggleMenu={handleToggleMenu}
              dropdownRef={dropdownRef}
            />
            <Hero introReady={introReady} />
            <div id="projects">
              <ProjectsStrip introReady={introReady} shellRef={shellRef} />
            </div>
            <div id="about">
              <Suspense fallback={null}>
                <TextScene />
              </Suspense>
            </div>
            <div id="notes">
              <Suspense fallback={null}>
                <OpenSourceShowcase />
              </Suspense>
            </div>
            <div id="contact">
              <Suspense fallback={null}>
                <BigFooter />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
