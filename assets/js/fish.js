/**
 * Tiny Fish Companion
 * Interactive animated goldfish that follows cursor direction,
 * blinks, wiggles, and autonomously performs cute actions:
 * - Eating snacks (shrimp, worms, plants)
 * - Ocean diving with a water sphere and drifting jellyfish
 * - Alien transformation with a hovering UFO tractor beam & glowing antenna
 * - Color shifting across 6 gorgeous iridescent themes
 * - Peaceful naps with floating ZZZ bubbles
 */

(function () {
  'use strict';

  function initTinyFish() {
    if (document.getElementById('tiny-fish-companion')) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'tiny-fish-companion';
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', 'Nemo: System event-loop and telemetry companion');
    container.setAttribute('title', 'Nemo 🫧 Event-loop companion: watching latency, clicks & packets');

    container.innerHTML = `
      <!-- UFO Beam overlay for alien mode -->
      <div class="fish-ufo-container" id="fish-ufo">
        <div class="fish-ufo-saucer">🛸</div>
        <div class="fish-beam-cone"></div>
      </div>

      <!-- Ocean water sphere for dive mode -->
      <div class="fish-ocean-ring" id="fish-ocean-ring"></div>

      <!-- Action FX (food, jellyfish, sparkles, zzz) -->
      <div class="fish-action-fx" id="fish-action-fx"></div>

      <!-- Bubble stream -->
      <div class="fish-bubble-stream" id="fish-bubble-stream"></div>

      <!-- Speech Bubble -->
      <div class="fish-speech-bubble" id="fish-speech">Blub! 🫧</div>

      <!-- Inner animated fish body -->
      <div class="fish-inner">
        <svg viewBox="0 0 200 160" class="fish-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Fish gradient shading with dynamic color stop IDs -->
            <radialGradient id="fishBodyGrad" cx="65%" cy="35%" r="65%">
              <stop id="bodyGradStop0" offset="0%" stop-color="#ff7f32" />
              <stop id="bodyGradStop1" offset="70%" stop-color="#ea5b19" />
              <stop id="bodyGradStop2" offset="100%" stop-color="#d44508" />
            </radialGradient>
            <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop id="finGradStop0" offset="0%" stop-color="#fbb768" />
              <stop id="finGradStop1" offset="100%" stop-color="#f58e28" />
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
            <path d="M 154 98 C 166 102 174 108 174 113" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 150 104 C 160 108 168 114 168 117" stroke="#fce0b0" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
          </g>

          <!-- Dorsal Fin (Top) -->
          <g class="fish-dorsal">
            <path d="M 72 74 C 70 56 82 38 100 36 C 114 34 126 42 134 58 C 122 62 108 65 96 70 Z" 
                  fill="url(#finGrad)" />
            <path d="M 76 68 C 80 50 92 42 100 38" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 88 68 C 94 54 104 46 112 43" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 102 66 C 108 55 116 48 124 48" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 116 64 C 122 58 128 54 132 54" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
          </g>

          <!-- Alien Antenna (pops up when in alien mode) -->
          <g id="fish-alien-antenna" class="fish-alien-antenna">
            <path d="M 148 64 C 154 44 162 26 158 14" stroke="#34d399" stroke-width="3" stroke-linecap="round" fill="none" />
            <circle cx="158" cy="14" r="5.5" fill="#10b981" />
            <circle cx="158" cy="14" r="8.5" fill="#34d399" opacity="0.45" class="alien-orb-glow" />
          </g>

          <!-- Tail Fin (Left / Wagging) -->
          <g class="fish-tail">
            <path d="M 52 90 C 38 74 24 70 18 78 C 12 86 16 96 14 104 C 12 114 26 118 36 112 C 44 108 48 102 52 98 Z" 
                  fill="url(#finGrad)" />
            <path d="M 48 91 C 36 84 26 80 20 82" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 48 94 C 36 90 26 92 18 94" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 48 97 C 38 98 28 102 20 106" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
          </g>

          <!-- Main Body -->
          <g class="fish-body-group">
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

            <!-- Blushing Cheeks -->
            <ellipse id="blush-left" cx="98" cy="95" rx="6" ry="4" fill="#ff5e7e" opacity="0" />
            <ellipse id="blush-right" cx="164" cy="95" rx="6" ry="4" fill="#ff5e7e" opacity="0" />

            <!-- EYES -->
            <!-- Left Eye -->
            <g class="fish-eye" id="eye-left-group">
              <ellipse class="eye-white" cx="108" cy="78" rx="10" ry="11" fill="#ffffff" stroke="#3d2012" stroke-width="1.5" />
              <g class="pupil-target" id="pupil-left">
                <circle cx="108" cy="78" r="6" fill="#30180e" />
                <circle cx="106" cy="76" r="2.2" fill="#ffffff" />
                <circle cx="110" cy="80.5" r="1.1" fill="#ffffff" />
              </g>
              <!-- Closed Eyelid Arc -->
              <path class="eyelid-closed" d="M 98 81 C 99 69 117 69 118 81" 
                    stroke="#3d2012" stroke-width="4.2" stroke-linecap="round" fill="none" opacity="0" />
            </g>

            <!-- Right Eye -->
            <g class="fish-eye" id="eye-right-group">
              <ellipse class="eye-white" cx="156" cy="78" rx="10" ry="11" fill="#ffffff" stroke="#3d2012" stroke-width="1.5" />
              <g class="pupil-target" id="pupil-right">
                <circle cx="156" cy="78" r="6" fill="#30180e" />
                <circle cx="154" cy="76" r="2.2" fill="#ffffff" />
                <circle cx="158" cy="80.5" r="1.1" fill="#ffffff" />
              </g>
              <!-- Closed Eyelid Arc -->
              <path class="eyelid-closed" d="M 146 81 C 147 69 165 69 166 81" 
                    stroke="#3d2012" stroke-width="4.2" stroke-linecap="round" fill="none" opacity="0" />
            </g>
          </g>

          <!-- Foreground Pectoral Fin -->
          <g class="fish-pectoral">
            <path d="M 88 104 C 84 122 100 138 112 128 C 120 120 116 102 100 96 C 92 98 89 101 88 104 Z" 
                  fill="url(#finGrad)" />
            <path d="M 94 104 C 96 114 104 122 108 126" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
            <path d="M 98 101 C 103 110 108 116 112 118" stroke="#fce0b0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
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
    const ufoContainer = document.getElementById('fish-ufo');
    const oceanRing = document.getElementById('fish-ocean-ring');
    const actionFx = document.getElementById('fish-action-fx');

    const bodyStop0 = document.getElementById('bodyGradStop0');
    const bodyStop1 = document.getElementById('bodyGradStop1');
    const bodyStop2 = document.getElementById('bodyGradStop2');
    const finStop0 = document.getElementById('finGradStop0');
    const finStop1 = document.getElementById('finGradStop1');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let isBlinking = false;
    let isBusy = false;
    let overrideTarget = null;
    let animationFrameId = null;

    // Color Theme Presets
    const COLOR_THEMES = [
      {
        name: 'orange',
        label: 'Goldfish Orange',
        speech: 'Classic goldfish style! 🍊✨',
        body: ['#ff7f32', '#ea5b19', '#d44508'],
        fin: ['#fbb768', '#f58e28'],
        shadow: 'rgba(234, 91, 25, 0.35)'
      },
      {
        name: 'ocean',
        label: 'Ocean Sapphire',
        speech: 'Ocean sapphire blue! 🌊💙',
        body: ['#38bdf8', '#0284c7', '#0369a1'],
        fin: ['#7dd3fc', '#0ea5e9'],
        shadow: 'rgba(14, 165, 233, 0.45)'
      },
      {
        name: 'emerald',
        label: 'Alien Emerald',
        speech: 'Alien neon emerald! 👽💚',
        body: ['#34d399', '#10b981', '#059669'],
        fin: ['#6ee7b7', '#059669'],
        shadow: 'rgba(16, 185, 129, 0.45)'
      },
      {
        name: 'sakura',
        label: 'Sakura Pink',
        speech: 'Cotton candy pink! 🌸💖',
        body: ['#f472b6', '#db2777', '#be185d'],
        fin: ['#fbcfe8', '#ec4899'],
        shadow: 'rgba(219, 39, 119, 0.45)'
      },
      {
        name: 'nebula',
        label: 'Cosmic Nebula',
        speech: 'Cosmic galaxy purple! 🌌💜',
        body: ['#a78bfa', '#7c3aed', '#5b21b6'],
        fin: ['#c4b5fd', '#8b5cf6'],
        shadow: 'rgba(124, 58, 237, 0.45)'
      },
      {
        name: 'gold',
        label: 'Imperial Golden Koi',
        speech: 'Imperial golden koi! 🪙👑',
        body: ['#fde047', '#eab308', '#ca8a04'],
        fin: ['#fef08a', '#facc15'],
        shadow: 'rgba(234, 179, 8, 0.45)'
      }
    ];

    let currentThemeIndex = 0;

    function applyColorTheme(themeName) {
      const theme = COLOR_THEMES.find(t => t.name === themeName) || COLOR_THEMES[0];
      currentThemeIndex = COLOR_THEMES.indexOf(theme);

      if (bodyStop0 && bodyStop1 && bodyStop2) {
        bodyStop0.setAttribute('stop-color', theme.body[0]);
        bodyStop1.setAttribute('stop-color', theme.body[1]);
        bodyStop2.setAttribute('stop-color', theme.body[2]);
      }
      if (finStop0 && finStop1) {
        finStop0.setAttribute('stop-color', theme.fin[0]);
        finStop1.setAttribute('stop-color', theme.fin[1]);
      }
      container.style.filter = `drop-shadow(0 4px 10px ${theme.shadow})`;
    }

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
      if (isBlinking || container.classList.contains('is-sleeping')) return;

      const targetX = overrideTarget ? overrideTarget.x : mouseX;
      const targetY = overrideTarget ? overrideTarget.y : mouseY;
      const maxOffset = 4.2;

      // Update Left Pupil
      const centerL = getEyeCenter(eyeLeftGroup);
      const dxL = targetX - centerL.x;
      const dyL = targetY - centerL.y;
      const distL = Math.hypot(dxL, dyL);
      const angleL = Math.atan2(dyL, dxL);
      const offsetL = Math.min(maxOffset, distL / 28);
      const pxL = Math.cos(angleL) * offsetL;
      const pyL = Math.sin(angleL) * offsetL;
      // Invert horizontal for scaleX(-1) flipped SVG
      pupilLeft.style.transform = `translate(${(-pxL).toFixed(1)}px, ${pyL.toFixed(1)}px)`;

      // Update Right Pupil
      const centerR = getEyeCenter(eyeRightGroup);
      const dxR = targetX - centerR.x;
      const dyR = targetY - centerR.y;
      const distR = Math.hypot(dxR, dyR);
      const angleR = Math.atan2(dyR, dxR);
      const offsetR = Math.min(maxOffset, distR / 28);
      const pxR = Math.cos(angleR) * offsetR;
      const pyR = Math.sin(angleR) * offsetR;
      pupilRight.style.transform = `translate(${(-pxR).toFixed(1)}px, ${pyR.toFixed(1)}px)`;
    }

    // Blink Action
    function blink(duration = 200) {
      if (isBusy || container.classList.contains('is-sleeping')) return;
      isBlinking = true;
      container.classList.add('blinking');
      setTimeout(() => {
        container.classList.remove('blinking');
        isBlinking = false;
        requestAnimationFrame(updateEyes);
      }, duration);
    }

    function scheduleBlink() {
      const delay = 3000 + Math.random() * 4000;
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
      const delay = 3500 + Math.random() * 4500;
      setTimeout(() => {
        if (!container.classList.contains('is-sleeping')) {
          blowBubble();
        }
        scheduleBubble();
      }, delay);
    }
    scheduleBubble();

    // Sparkles burst
    function spawnSparkles(count = 6) {
      if (!actionFx) return;
      const icons = ['✨', '🌟', '💖', '⭐', '💫'];
      for (let i = 0; i < count; i++) {
        const sp = document.createElement('div');
        sp.className = 'fish-sparkle-item';
        sp.textContent = icons[Math.floor(Math.random() * icons.length)];
        const popX = -35 + Math.random() * 70;
        const popY = -35 + Math.random() * 60;
        sp.style.setProperty('--pop-x', `${popX}px`);
        sp.style.setProperty('--pop-y', `${popY}px`);
        sp.style.left = `${20 + Math.random() * 25}px`;
        sp.style.top = `${15 + Math.random() * 20}px`;
        actionFx.appendChild(sp);
        setTimeout(() => sp.remove(), 1000);
      }
    }

    // Speech bubble helper
    function showSpeech(text, duration = 1800) {
      if (!speechBubble) return;
      speechBubble.textContent = text;
      speechBubble.classList.add('visible');
      setTimeout(() => {
        speechBubble.classList.remove('visible');
      }, duration);
    }

    // =========================================================================
    // Special Actions: Eat, Ocean Dive, Alien, Color Change, Nap
    // =========================================================================

    // 1. EAT SOMETHING
    function actionEat() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('is-eating');

      const snacks = [
        { icon: '🍤', name: 'tasty shrimp' },
        { icon: '🪱', name: 'little worm' },
        { icon: '🌿', name: 'fresh seaweed' },
        { icon: '🧁', name: 'sweet crumb' }
      ];
      const snack = snacks[Math.floor(Math.random() * snacks.length)];

      const foodEl = document.createElement('div');
      foodEl.className = 'fish-food-item';
      foodEl.textContent = snack.icon;
      actionFx.appendChild(foodEl);

      // Lock eyes on the snack
      const fishRect = container.getBoundingClientRect();
      overrideTarget = { x: fishRect.left - 25, y: fishRect.top + 25 };
      updateEyes();

      showSpeech(`Ooh, a ${snack.name}! ${snack.icon}`, 1200);

      // Swim and chomp
      setTimeout(() => {
        foodEl.style.transform = 'scale(0) translateY(8px)';
        foodEl.style.opacity = '0';
        spawnSparkles(4);

        if (blushLeft) blushLeft.style.opacity = '0.9';
        if (blushRight) blushRight.style.opacity = '0.9';
        showSpeech(`Nom nom nom! ${snack.icon}😋`, 1600);

        setTimeout(() => {
          foodEl.remove();
          container.classList.remove('is-eating');
          overrideTarget = null;
          if (blushLeft) blushLeft.style.opacity = '0';
          if (blushRight) blushRight.style.opacity = '0';
          blowBubble(13, -20);
          isBusy = false;
          requestAnimationFrame(updateEyes);
        }, 1200);
      }, 1000);
    }

    // 2. OCEAN DIVE
    function actionOceanDive() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('is-diving');

      if (oceanRing) oceanRing.classList.add('visible');

      // Jellyfish companion drifting past
      const jelly = document.createElement('div');
      jelly.className = 'fish-jellyfish';
      jelly.textContent = '🪼';
      actionFx.appendChild(jelly);

      // Switch to ocean sapphire palette
      applyColorTheme('ocean');

      showSpeech('Diving deep into the ocean! 🌊🤿', 2200);

      // Burst of sea bubbles
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          blowBubble(9 + Math.random() * 6, -35 + Math.random() * 40);
        }, 400 + i * 450);
      }

      setTimeout(() => {
        if (oceanRing) oceanRing.classList.remove('visible');
        container.classList.remove('is-diving');
        jelly.remove();
        showSpeech('What a wonderful dive! 🌊✨', 1800);
        isBusy = false;
        requestAnimationFrame(updateEyes);
      }, 3800);
    }

    // 3. BECOME ALIEN
    function actionAlien() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('is-alien');

      if (ufoContainer) ufoContainer.classList.add('visible');

      // Alien green glow
      applyColorTheme('emerald');

      showSpeech('Incoming UFO beam! 🛸✨', 1400);

      setTimeout(() => {
        showSpeech('Zorp blub blub! 🛸👽', 2000);
        spawnSparkles(5);
      }, 1500);

      setTimeout(() => {
        if (ufoContainer) ufoContainer.classList.remove('visible');
        container.classList.remove('is-alien');
        showSpeech('Greetings, Earthling! 👾💫', 1800);
        setTimeout(() => {
          isBusy = false;
          requestAnimationFrame(updateEyes);
        }, 1800);
      }, 4500);
    }

    // 4. CHANGE COLOR
    function actionChangeColor() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('is-color-spin');

      // Pick next color in sequence
      const nextIndex = (currentThemeIndex + 1) % COLOR_THEMES.length;
      const nextTheme = COLOR_THEMES[nextIndex];

      spawnSparkles(8);

      setTimeout(() => {
        applyColorTheme(nextTheme.name);
        showSpeech(nextTheme.speech, 2000);
      }, 400);

      setTimeout(() => {
        container.classList.remove('is-color-spin');
        isBusy = false;
        requestAnimationFrame(updateEyes);
      }, 1200);
    }

    // 5. NAP / SLEEPING
    function actionNap() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('is-sleeping');

      showSpeech('So sleepy... 🥱💤', 1400);

      // Floating ZZZ bubbles
      const zzzInterval = setInterval(() => {
        if (!container.classList.contains('is-sleeping')) {
          clearInterval(zzzInterval);
          return;
        }
        const zzz = document.createElement('div');
        zzz.className = 'fish-zzz-bubble';
        const symbols = ['z', 'Z', '💤'];
        zzz.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        actionFx.appendChild(zzz);
        setTimeout(() => zzz.remove(), 2800);
      }, 950);

      setTimeout(() => {
        wakeUp();
      }, 5200);

      function wakeUp() {
        clearInterval(zzzInterval);
        if (!container.classList.contains('is-sleeping')) return;
        container.classList.remove('is-sleeping');
        showSpeech("Zzz... Oh! I'm awake! ☀️", 1800);
        blowBubble(13, -15);
        isBusy = false;
        requestAnimationFrame(updateEyes);
      }

      // Allow click to wake up early
      const wakeHandler = function () {
        container.removeEventListener('click', wakeHandler);
        wakeUp();
      };
      container.addEventListener('click', wakeHandler, { once: true });
    }

    // Standard Happy Wiggle (Click reaction)
    function actionHappyWiggle() {
      if (isBusy) return;
      isBusy = true;
      container.classList.add('happy-action');

      if (blushLeft) blushLeft.style.opacity = '0.85';
      if (blushRight) blushRight.style.opacity = '0.85';

      const cutePhrases = [
        'Blub! All services healthy 🫧',
        'Ping: 14ms · zero packet loss ⚡',
        'Event-loop companion online! 🐟',
        'Keep swimming, keep shipping! 🌊',
        'Clean commits, clean waters 💻',
        'Garbage collection complete! ✨',
        'Observing sys.telemetry... 📡'
      ];
      const phrase = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
      showSpeech(phrase, 1800);

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
        isBusy = false;
        requestAnimationFrame(updateEyes);
      }, 1000);
    }

    // =========================================================================
    // Autonomous Scheduler
    // Randomly triggers actions on its own every 18-28 seconds
    // =========================================================================
    const specialActions = [
      actionEat,
      actionOceanDive,
      actionAlien,
      actionChangeColor,
      actionNap
    ];

    function scheduleAutonomousAction() {
      const delay = 18000 + Math.random() * 12000; // 18-30s
      setTimeout(() => {
        if (!isBusy && !document.hidden) {
          const chosen = specialActions[Math.floor(Math.random() * specialActions.length)];
          chosen();
        }
        scheduleAutonomousAction();
      }, delay);
    }
    scheduleAutonomousAction();

    // =========================================================================
    // User Interaction (Click & Hover)
    // =========================================================================
    container.addEventListener('click', function () {
      if (container.classList.contains('is-sleeping')) return; // handled by wakeHandler
      if (isBusy) return;

      // 50% chance of triggering one of the special actions immediately,
      // 50% chance of the classic joyful wiggle & quote
      if (Math.random() < 0.5) {
        const chosen = specialActions[Math.floor(Math.random() * specialActions.length)];
        chosen();
      } else {
        actionHappyWiggle();
      }
    });

    container.addEventListener('mouseenter', function () {
      if (!isBusy && !container.classList.contains('is-sleeping')) {
        blowBubble(11, -12);
      }
    });

    // Expose for testing/debugging via console or script if desired
    window.tinyFishCompanion = {
      eat: actionEat,
      dive: actionOceanDive,
      alien: actionAlien,
      changeColor: actionChangeColor,
      nap: actionNap,
      wiggle: actionHappyWiggle,
      setColor: applyColorTheme
    };
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTinyFish);
  } else {
    initTinyFish();
  }
})();
