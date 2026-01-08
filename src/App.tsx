import { useRef } from "react";
import "./App.css";
import Hero from "./sections/Hero";
import ProjectsStrip from "./sections/ProjectsStrip";
import TextScene from "./sections/TextScene";
import OpenSourceShowcase from "./sections/OpenSourceShowcase";
import IntroGate from "./components/layout/IntroGate";
import TopNav from "./components/layout/TopNav";
import { useIntroGate } from "./hooks/useIntroGate";
import { useTopNavMenu } from "./hooks/useTopNavMenu";

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

  return (
    <div className={appRootClassName}>
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

      {/* Only start Hero and Projects animations after intro gate is fully gone */}
      <div className="hero-projects-shell" ref={shellRef}>
        <Hero introReady={introReady} />
        <ProjectsStrip introReady={introReady} shellRef={shellRef} />
        <TextScene />
      </div>

      <OpenSourceShowcase />
    </div>
  );
}

export default App;
