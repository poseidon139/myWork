/**
 * Tiny Fish Companion
 * Interactive animated goldfish that follows cursor direction,
 * blinks, wiggles, blows bubbles, and reacts with cute actions.
 */

(function () {
  'use strict';

  function initTinyFish() {
    if (document.getElementById('tiny-fish-companion')) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'tiny-fish-companion';
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', 'Cute little animated fish companion');
    container.setAttribute('title', 'Click me! 🫧');

    container.innerHTML = `
      <div class="fish-bubble-stream" id="fish-bubble-stream"></div>
      <div class="fish-speech-bubble" id="fish-speech">Blub! 🫧</div>
      <div class="fish-inner">
        <svg viewBox="0 0 200 160" class="fish-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Fish gradient shading -->
            <radialGradient id="fishBodyGrad" cx="65%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#ff7f32" />
              <stop offset="70%" stop-color="#ea5b19" />
              <stop offset="100%" stop-color="#d44508" />
            </radialGradient>
            <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbb768" />
              <stop offset="100%" stop-color="#f58e28" />
            </linearGradient>
            <!-- Filter for soft bubble glow -->
            <filter id="bubbleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#38bdf8" flood-opacity="0.4"/>
            </filter>
          </defs>

          <!-- Back Pectoral Fin (Far side, behind body) -->
          <g class="fish-fin-back">
            <path d="M 152 92 C 168 94 186 104 180 116 C 174 124 156 120 146 108 Z" 
                  fill="url(#finGrad)" />
            <!-- Fin lines -->
            <path d="M 154 98 C 166 102 174 108 174 113" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 150 104 C 160 108 168 114 168 117" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
          </g>

          <!-- Dorsal Fin (Top) -->
          <g class="fish-dorsal">
            <!-- Fin base & scalloped crest -->
            <path d="M 72 74 C 70 56 82 38 100 36 C 114 34 126 42 134 58 C 122 62 108 65 96 70 Z" 
                  fill="url(#finGrad)" />
            <!-- Scalloped crest rays -->
            <path d="M 76 68 C 80 50 92 42 100 38" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 88 68 C 94 54 104 46 112 43" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 102 66 C 108 55 116 48 124 48" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 116 64 C 122 58 128 54 132 54" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.85"/>
          </g>

          <!-- Tail Fin (Left) -->
          <g class="fish-tail">
            <!-- Fan-shaped tail with cute lobes -->
            <path d="M 52 90 C 38 74 24 70 18 78 C 12 86 16 96 14 104 C 12 114 26 118 36 112 C 44 108 48 102 52 98 Z" 
                  fill="url(#finGrad)" />
            <!-- Tail fin rays -->
            <path d="M 48 91 C 36 84 26 80 20 82" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 48 94 C 36 90 26 92 18 94" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 48 97 C 38 98 28 102 20 106" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
          </g>

          <!-- Main Body -->
          <g class="fish-body-group">
            <!-- Smooth chubby fish body -->
            <path d="M 46 95 C 46 82 64 68 88 64 C 114 60 148 64 162 82 C 174 98 168 118 152 130 C 130 146 88 142 64 122 C 50 110 46 102 46 95 Z" 
                  fill="url(#fishBodyGrad)" />

            <!-- Body Scales (decorative scallops) -->
            <g stroke="#fba858" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.9">
              <path d="M 72 86 C 70 82 74 78 78 80" />
              <path d="M 84 82 C 82 78 86 74 90 76" />
              <path d="M 68 98 C 66 94 70 90 74 92" />
              <path d="M 80 94 C 78 90 82 86 86 88" />
              <path d="M 92 90 C 90 86 94 82 98 84" />
              <path d="M 66 110 C 64 106 68 102 72 104" />
              <path d="M 78 106 C 76 102 80 98 84 100" />
              <path d="M 124 122 C 122 118 126 114 130 116" />
              <path d="M 132 116 C 130 112 134 108 138 110" />
            </g>

            <!-- Mouth (Cute smile) -->
            <path id="fish-mouth" d="M 120 100 Q 140 114 154 101" 
                  stroke="#3d2012" stroke-width="4.2" stroke-linecap="round" fill="none" />

            <!-- Blushing Cheeks (shown during happy/click) -->
            <ellipse id="blush-left" cx="98" cy="95" rx="6" ry="4" fill="#ff5e7e" opacity="0" />
            <ellipse id="blush-right" cx="164" cy="95" rx="6" ry="4" fill="#ff5e7e" opacity="0" />

            <!-- EYES -->
            <!-- Left Eye -->
            <g class="fish-eye" id="eye-left-group">
              <!-- Eye White Base -->
              <ellipse class="eye-white" cx="108" cy="78" rx="10" ry="11" fill="#ffffff" stroke="#3d2012" stroke-width="1.5" />
              <!-- Moving Pupil -->
              <g class="pupil-target" id="pupil-left">
                <circle cx="108" cy="78" r="6" fill="#30180e" />
                <circle cx="106" cy="76" r="2.2" fill="#ffffff" />
                <circle cx="110" cy="80.5" r="1.1" fill="#ffffff" />
              </g>
              <!-- Closed Eyelid Arc (active during blink/happy) -->
              <path class="eyelid-closed" d="M 98 81 C 99 69 117 69 118 81" 
                    stroke="#3d2012" stroke-width="4.2" stroke-linecap="round" fill="none" opacity="0" />
            </g>

            <!-- Right Eye -->
            <g class="fish-eye" id="eye-right-group">
              <!-- Eye White Base -->
              <ellipse class="eye-white" cx="156" cy="78" rx="10" ry="11" fill="#ffffff" stroke="#3d2012" stroke-width="1.5" />
              <!-- Moving Pupil -->
              <g class="pupil-target" id="pupil-right">
                <circle cx="156" cy="78" r="6" fill="#30180e" />
                <circle cx="154" cy="76" r="2.2" fill="#ffffff" />
                <circle cx="158" cy="80.5" r="1.1" fill="#ffffff" />
              </g>
              <!-- Closed Eyelid Arc (active during blink/happy) -->
              <path class="eyelid-closed" d="M 146 81 C 147 69 165 69 166 81" 
                    stroke="#3d2012" stroke-width="4.2" stroke-linecap="round" fill="none" opacity="0" />
            </g>
          </g>

          <!-- Foreground Pectoral Fin -->
          <g class="fish-pectoral">
            <path d="M 88 104 C 84 122 100 138 112 128 C 120 120 116 102 100 96 C 92 98 89 101 88 104 Z" 
                  fill="url(#finGrad)" />
            <!-- Fin lines -->
            <path d="M 94 104 C 96 114 104 122 108 126" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 98 101 C 103 110 108 116 112 118" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.85"/>
          </g>
        </svg>
      </div>
    `;

    document.body.appendChild(container);

    // References
    const pupilLeft = document.getElementById('pupil-left');
    const pupilRight = document.getElementById('pupil-right');
    const eyeLeftGroup = document.getElementById('eye-left-group');
    const eyeRightGroup = document.getElementById('eye-right-group');
    const bubbleStream = document.getElementById('fish-bubble-stream');
    const speechBubble = document.getElementById('fish-speech');
    const blushLeft = document.getElementById('blush-left');
    const blushRight = document.getElementById('blush-right');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let isBlinking = false;
    let isHappy = false;
    let animationFrameId = null;

    // Track mouse
    window.addEventListener('pointermove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateEyes);
      }
    }, { passive: true });

    function getEyeCenter(eyeGroup) {
      const rect = eyeGroup.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    function updateEyes() {
      animationFrameId = null;
      if (isBlinking || isHappy) return;

      const maxOffset = 4.2; // Max pupil travel distance within socket

      // Update Left Pupil
      const centerL = getEyeCenter(eyeLeftGroup);
      const dxL = mouseX - centerL.x;
      const dyL = mouseY - centerL.y;
      const distL = Math.hypot(dxL, dyL);
      const angleL = Math.atan2(dyL, dxL);
      const offsetL = Math.min(maxOffset, distL / 28);
      // Because the fish SVG is flipped horizontally (scaleX(-1)) to face left,
      // the local SVG X-axis is inverted relative to viewport space.
      // Inverting px ensures the pupil moves toward the cursor in screen space.
      const pxL = Math.cos(angleL) * offsetL;
      const pyL = Math.sin(angleL) * offsetL;
      pupilLeft.style.transform = `translate(${(-pxL).toFixed(1)}px, ${pyL.toFixed(1)}px)`;

      // Update Right Pupil
      const centerR = getEyeCenter(eyeRightGroup);
      const dxR = mouseX - centerR.x;
      const dyR = mouseY - centerR.y;
      const distR = Math.hypot(dxR, dyR);
      const angleR = Math.atan2(dyR, dxR);
      const offsetR = Math.min(maxOffset, distR / 28);
      const pxR = Math.cos(angleR) * offsetR;
      const pyR = Math.sin(angleR) * offsetR;
      pupilRight.style.transform = `translate(${(-pxR).toFixed(1)}px, ${pyR.toFixed(1)}px)`;
    }

    // Blink Action
    function blink(duration = 200) {
      if (isHappy) return;
      isBlinking = true;
      container.classList.add('blinking');
      setTimeout(() => {
        container.classList.remove('blinking');
        isBlinking = false;
        requestAnimationFrame(updateEyes);
      }, duration);
    }

    // Random Blink interval
    function scheduleBlink() {
      const delay = 2800 + Math.random() * 3500;
      setTimeout(() => {
        blink();
        scheduleBlink();
      }, delay);
    }
    scheduleBlink();

    // Spawn Bubble Action
    function blowBubble(customSize = null, customDrift = null) {
      if (!bubbleStream) return;
      const bubble = document.createElement('div');
      bubble.className = 'fish-bubble';

      const size = customSize || (8 + Math.random() * 9);
      const driftX = customDrift !== null ? customDrift : (-25 + Math.random() * 25);
      const duration = 2.2 + Math.random() * 1.2;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.setProperty('--drift-x', `${driftX}px`);
      bubble.style.animationDuration = `${duration}s`;

      bubbleStream.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, duration * 1000);
    }

    // Periodic gentle bubble
    function scheduleBubble() {
      const delay = 3500 + Math.random() * 4000;
      setTimeout(() => {
        blowBubble();
        scheduleBubble();
      }, delay);
    }
    scheduleBubble();

    // Cute Quotes/Actions
    const cutePhrases = [
      'Blub! 🫧',
      'Splash! ✨',
      'Hello there! 🐟',
      'Keep swimming! 🌊',
      'Nice code! 💻',
      'Glub glub! ❤️'
    ];

    function showSpeech(text) {
      if (!speechBubble) return;
      speechBubble.textContent = text;
      speechBubble.classList.add('visible');
      setTimeout(() => {
        speechBubble.classList.remove('visible');
      }, 1800);
    }

    // Click Interaction (Happy Wiggle, Bubble Burst, Blushing)
    container.addEventListener('click', function () {
      if (isHappy) return;
      isHappy = true;
      container.classList.add('happy-action');

      // Blush
      if (blushLeft) blushLeft.style.opacity = '0.85';
      if (blushRight) blushRight.style.opacity = '0.85';

      // Pick a cute phrase
      const phrase = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
      showSpeech(phrase);

      // Burst of bubbles
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          blowBubble(10 + Math.random() * 8, -45 + Math.random() * 50);
        }, i * 120);
      }

      setTimeout(() => {
        container.classList.remove('happy-action');
        if (blushLeft) blushLeft.style.opacity = '0';
        if (blushRight) blushRight.style.opacity = '0';
        isHappy = false;
        requestAnimationFrame(updateEyes);
      }, 1000);
    });

    // Hover cute reaction
    container.addEventListener('mouseenter', function () {
      blowBubble(10, -10);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTinyFish);
  } else {
    initTinyFish();
  }
})();
