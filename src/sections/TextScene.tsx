import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextScene = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const textContainer = textRef.current!;

      // Split text into words for entrance animation
      const split = new SplitText(textContainer, { type: 'words' });

      gsap.set(split.words, { opacity: 0, y: -80, rotateZ: 0 });

      gsap.fromTo(
        split.words,
        { opacity: 0, y: -80, rotation: 0 },
        {
          opacity: 1,
          y: 0,
          rotation: () => gsap.utils.random(-3, 3),
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Intro fade + slight upward motion for the whole block
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Scroll-based subtle parallax on desktop
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.to(section, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className='text-scene' ref={sectionRef}>
      <div className='text-scene-inner' ref={textRef}>
        <div className='text-scene-copy'>
          <p className='text-scene-line text-scene-line--accent'>
            I'm building a personal "Dev × AI × Design" toolkit for my own work.
          </p>
          <p className='text-scene-line'>
            It's not a single project, but a series of experimental products,
            interactions, and workflows
          </p>
          <p className='text-scene-line'>
            exploring how AI can actually help me ship ideas faster to the
            screen, instead of just generating a few lines of copy.
          </p>
          <p className='text-scene-line'>
            Each module is a reusable building block, serving my own work while
            leaving hooks open for future collaboration.
          </p>
        </div>

        <div className='text-scene-decor' aria-hidden='true'>
          <svg
            className='text-scene-decor-svg'
            viewBox='0 0 400 200'
            preserveAspectRatio='xMidYMid meet'
          >
            <defs>
              <radialGradient id='textSceneGlow' cx='50%' cy='0%' r='70%'>
                <stop offset='0%' stopColor='#ffffff' stopOpacity='0.5' />
                <stop offset='40%' stopColor='#b6ff2b' stopOpacity='0.4' />
                <stop offset='100%' stopColor='#000000' stopOpacity='0' />
              </radialGradient>
            </defs>

            <ellipse
              cx='80'
              cy='40'
              rx='90'
              ry='26'
              fill='none'
              stroke='rgba(182, 255, 43, 0.5)'
              strokeWidth='1.4'
              strokeDasharray='4 10'
            />
            <circle
              cx='260'
              cy='110'
              r='6'
              fill='#22d3ee'
              filter='url(#shadowPlanet1)'
            />
            <circle cx='310' cy='150' r='3' fill='#b6ff2b' />
            <circle cx='220' cy='160' r='2.5' fill='#a855f7' />

            <circle cx='60' cy='70' r='70' fill='url(#textSceneGlow)' />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TextScene;
