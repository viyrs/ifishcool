import { Suspense, lazy, useRef } from 'react';
import '@ifc/App.css';
import Hero from '@ifc/sections/Hero';
import IntroGate from '@ifc/components/layout/IntroGate';
import TopNav from '@ifc/components/layout/TopNav';
import { useIntroGate } from '@ifc/hooks/useIntroGate';
import { useTopNavMenu } from '@ifc/hooks/useTopNavMenu';
import { useSmoothScroll } from '@ifc/hooks/useSmoothScroll';

const ProjectsStrip = lazy(() => import('@ifc/sections/ProjectsStrip'));
const TextScene = lazy(() => import('@ifc/sections/TextScene'));
const OpenSourceShowcase = lazy(
  () => import('@ifc/sections/OpenSourceShowcase')
);
const BigFooter = lazy(() => import('@ifc/sections/BigFooter'));

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
              <Suspense fallback={null}>
                <ProjectsStrip introReady={introReady} shellRef={shellRef} />
              </Suspense>
            </div>
            <div id='about'>
              <Suspense fallback={null}>
                <TextScene />
              </Suspense>
            </div>
            <div id='notes'>
              <Suspense fallback={null}>
                <OpenSourceShowcase />
              </Suspense>
            </div>
            <div id='contact'>
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
