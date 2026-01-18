import React from 'react';

export type IntroGateProps = {
  visible: boolean;
  animatingOut: boolean;
  onEnter: () => void;
};

const IntroGate: React.FC<IntroGateProps> = ({
  visible,
  animatingOut,
  onEnter,
}) => {
  if (!visible && !animatingOut) return null;

  const handleEnterClick = () => {
    try {
      const audio = new Audio('/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore play errors (e.g. autoplay restrictions)
      });
    } catch {
      // Ignore Audio construction errors in non-browser environments
    }

    onEnter();
  };

  return (
    <div
      className={`intro-gate ${
        animatingOut ? 'intro-gate--closing' : 'intro-gate--open'
      }`}
    >
      <div className='intro-gate-inner'>
        <p className='intro-gate-label'>BLOG / AI</p>
        <h1 className='intro-gate-title'>
          <span className='intro-gate-title-part intro-gate-title-part--left'>
            IFISH
          </span>
          <span className='intro-gate-title-part intro-gate-title-part--right'>
            COOL
          </span>
        </h1>
        <p className='intro-gate-sub'>DEV · AI PRODUCT · DESIGN</p>
        <div className='intro-gate-button-row'>
          <button
            type='button'
            className='intro-gate-button intro-gate-button--primary'
            onClick={handleEnterClick}
          >
            Enter
          </button>
          <button
            type='button'
            className='intro-gate-button intro-gate-button--secondary'
            onClick={() => {
              window.open('https://github.com/viyrs/ifishcool');
            }}
          >
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroGate;
