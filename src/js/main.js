const toggle = document.querySelector('.nav__toggle');
const panel  = document.getElementById('mobile-nav');

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });
}

// Demo videos (components/demo-video.njk), each handled on its own. Silent
// and muted; plays automatically only while at least 40% of it is on screen,
// and never for visitors who prefer reduced motion or have Save-Data on (they
// get the poster and a Play button; with reduced motion a started demo plays
// once instead of looping). Without this script the native controls remain.
document.querySelectorAll('[data-demo-video]').forEach(demo => {
  const video  = demo.querySelector('video');
  const button = demo.querySelector('.demo-video__toggle');
  const label  = button.querySelector('.demo-video__label');
  const sources = demo.querySelectorAll('source');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const labels = { play: 'Play demo', pause: 'Pause demo', replay: 'Replay demo' };
  let userPaused = false;    // a visitor's pause sticks until they press Play
  let userStarted = false;   // reduced motion: playback the visitor asked for
  let resumeInView = false;  // paused only because it scrolled away
  let inView = false;

  const canPlay = [...sources].some(source => video.canPlayType(source.type) !== '');
  const autoplay = () => !reduceMotion.matches && !saveData && !userPaused;

  const render = () => {
    const state = !video.paused && !video.ended ? 'pause' : video.ended ? 'replay' : 'play';
    button.dataset.state = state;
    label.textContent = labels[state];
  };

  // play() rejects when the browser refuses (for example iOS Low Power Mode);
  // the poster and the Play button stay.
  const play = () => {
    const attempt = video.play();
    if (attempt) attempt.catch(render);
  };

  const applyMotionPreference = () => {
    video.loop = !reduceMotion.matches;
    if (reduceMotion.matches && !userStarted && !video.paused) video.pause();
  };

  if (canPlay) {
    video.controls = false;
    button.hidden = false;
    applyMotionPreference();
    render();

    ['play', 'playing', 'pause', 'ended'].forEach(type => video.addEventListener(type, render));
    // Every source failed: keep the poster, drop the control.
    sources[sources.length - 1].addEventListener('error', () => {
      button.hidden = true;
      video.pause();
    });
    reduceMotion.addEventListener('change', applyMotionPreference);

    button.addEventListener('click', () => {
      if (video.paused || video.ended) {
        userPaused = false;
        userStarted = true;
        if (video.ended) video.currentTime = 0;
        play();
      } else {
        userPaused = true;
        video.pause();
      }
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        const nowInView = entry.intersectionRatio >= 0.4;
        if (nowInView === inView) return;
        inView = nowInView;
        if (!inView && !video.paused) {
          resumeInView = true;
          video.pause();
        } else if (inView && (resumeInView || autoplay()) && !video.ended) {
          resumeInView = false;
          play();
        }
      }, { threshold: [0, 0.4, 0.6] }).observe(video);
    } else if (autoplay()) {
      play();
    }
  }
});
