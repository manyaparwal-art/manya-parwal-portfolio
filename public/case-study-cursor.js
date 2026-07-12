(() => {
  if (window.__caseStudyCursorInitialized) return;
  window.__caseStudyCursorInitialized = true;

  const coarseQuery = window.matchMedia('(pointer: coarse)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], [data-cursor="pointer"]';

  const cursor = document.createElement('div');
  cursor.className = 'case-study-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L27 16L15 18L10 28L3 3Z" fill="#8B5CF6" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
  `;
  document.documentElement.appendChild(cursor);

  const ring = document.createElement('div');
  ring.className = 'case-study-cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.documentElement.appendChild(ring);

  const style = document.createElement('style');
  style.textContent = `
    body.case-study-cursor-active { cursor: none !important; }
    .case-study-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 2147483647;
      opacity: 0;
      transition: transform 0.16s ease, opacity 0.16s ease;
      will-change: transform;
    }
    .case-study-cursor svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 4px 10px rgba(139, 92, 246, 0.28));
    }
    .case-study-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 999px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 2147483646;
      opacity: 0;
      transition: transform 0.16s ease, opacity 0.16s ease, width 0.16s ease, height 0.16s ease;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.03);
    }
    .case-study-cursor.is-interactive, .case-study-cursor-ring.is-interactive {
      transform: translate(-50%, -50%) scale(1.08);
    }
    .case-study-cursor.is-down {
      transform: translate(-50%, -50%) scale(0.88);
    }
    @media (pointer: coarse) {
      .case-study-cursor {
        width: 22px;
        height: 22px;
      }
      .case-study-cursor-ring {
        width: 28px;
        height: 28px;
      }
    }
  `;
  document.documentElement.appendChild(style);

  document.body.classList.add('case-study-cursor-active');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let frame = 0;
  let visible = false;
  let activeInteractive = false;
  let pointerEnabled = !coarseQuery.matches && !reducedMotionQuery.matches;

  const setVisible = (value) => {
    visible = value;
    cursor.style.opacity = value ? '1' : '0';
    ring.style.opacity = value ? '0.95' : '0';
  };

  const updateInteractive = (event) => {
    const target = event.target;
    const interactive = Boolean(target && target.closest && target.closest(interactiveSelector));
    activeInteractive = interactive;
    cursor.classList.toggle('is-interactive', interactive);
    ring.classList.toggle('is-interactive', interactive);
  };

  const onMove = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    setVisible(true);
    updateInteractive(event);
  };

  const animate = () => {
    const ease = 0.2;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    ring.style.left = `${currentX}px`;
    ring.style.top = `${currentY}px`;
    frame = window.requestAnimationFrame(animate);
  };

  const resetInteractive = () => {
    activeInteractive = false;
    cursor.classList.remove('is-interactive');
    ring.classList.remove('is-interactive');
  };

  const handlePointerLeave = () => setVisible(false);
  const handlePointerDown = () => cursor.classList.add('is-down');
  const handlePointerUp = () => cursor.classList.remove('is-down');
  const handleBlur = () => {
    setVisible(false);
    resetInteractive();
  };

  const setEnabled = () => {
    pointerEnabled = !coarseQuery.matches && !reducedMotionQuery.matches;
    if (!pointerEnabled) {
      setVisible(false);
      cursor.style.display = 'none';
      ring.style.display = 'none';
      return;
    }
    cursor.style.display = 'block';
    ring.style.display = 'block';
  };

  setEnabled();
  if (pointerEnabled) {
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('mouseover', updateInteractive, true);
    document.addEventListener('mouseout', (event) => {
      if (event.target && event.relatedTarget && event.target.contains && event.target.contains(event.relatedTarget)) return;
      resetInteractive();
    }, true);
    frame = window.requestAnimationFrame(animate);
  }

  coarseQuery.addEventListener?.('change', setEnabled);
  reducedMotionQuery.addEventListener?.('change', setEnabled);
})();
