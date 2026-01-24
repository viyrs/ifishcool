import { useRef } from 'react';
import '@ifc/App.css';
import Hero from '@ifc/sections/Hero';
import IntroGate from '@ifc/components/layout/IntroGate';
import TopNav from '@ifc/components/layout/TopNav';
import ProjectsStrip from '@ifc/sections/ProjectsStrip';
// import TextScene from '@ifc/sections/TextScene';
import OpenSourceShowcase from '@ifc/sections/OpenSourceShowcase';
import BigFooter from '@ifc/sections/BigFooter';
import { useIntroGate } from '@ifc/hooks/useIntroGate';
import { useTopNavMenu } from '@ifc/hooks/useTopNavMenu';
import { useSmoothScroll } from '@ifc/hooks/useSmoothScroll';

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
    ? 'app-root app-root--intro-open'
    : 'app-root';

  useSmoothScroll();

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>
        <div className={appRootClassName}>
          {/* Only start Hero and Projects animations after intro gate is fully gone */}
          <div className='hero-projects-shell' ref={shellRef}>
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
            <div id='projects'>
              <ProjectsStrip introReady={introReady} shellRef={shellRef} />
            </div>
            {/* <div id='about'>
              <TextScene />
            </div> */}
            <div id='notes'>
              <OpenSourceShowcase />
            </div>
            <div id='contact'>
              <BigFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
