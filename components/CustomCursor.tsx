"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const animationRef = useRef<number | null>(null);
  const touchTimeoutRef = useRef<number | null>(null);
  const touchActiveRef = useRef(false);

  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [visible, setVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [desktopEnabled, setDesktopEnabled] = useState(false);
  const [touchActive, setTouchActive] = useState(false);
  const [hiddenBySection, setHiddenBySection] = useState(false);

  useEffect(() => {
    const cursorVisibilityObserver = new MutationObserver(() => {
      setHiddenBySection(
        document.body.hasAttribute("data-hide-global-cursor")
      );
    });

    cursorVisibilityObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-hide-global-cursor"],
    });

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const updateDesktopEnabled = () => {
      const shouldEnable = pointerQuery.matches || coarseQuery.matches;

      setDesktopEnabled(shouldEnable);

      if (shouldEnable) {
        document.documentElement.style.setProperty(
          "cursor",
          "none",
          "important"
        );

        document.body.style.setProperty(
          "cursor",
          "none",
          "important"
        );

        document.body.classList.add("custom-cursor-active");

        if (coarseQuery.matches && !pointerQuery.matches) {
          setVisible(true);
        }
      } else if (!touchActiveRef.current) {
        document.documentElement.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");
        document.body.classList.remove("custom-cursor-active");
      }
    };

    const clearTouchTimeout = () => {
      if (touchTimeoutRef.current !== null) {
        window.clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
    };

    const scheduleHideTouchCursor = () => {
      clearTouchTimeout();

      touchTimeoutRef.current = window.setTimeout(() => {
        setVisible(false);
        setTouchActive(false);
        touchActiveRef.current = false;
      }, 250);
    };

    const updatePosition = (
      clientX: number,
      clientY: number,
      offsetX = 0,
      offsetY = 0
    ) => {
      targetRef.current = {
        x: clientX + offsetX,
        y: clientY + offsetY,
      };

      setVisible(true);
      clearTouchTimeout();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const pointerType = event.pointerType;

      if (pointerType === "mouse" && pointerQuery.matches) {
        updatePosition(event.clientX, event.clientY);

        const target = event.target as HTMLElement | null;

        const isInteractive = Boolean(
          target?.closest(
            `a, button, [role="button"], input, textarea, select, summary, [data-cursor="pointer"]`
          )
        );

        setIsClickable(isInteractive);

        return;
      }

      if (pointerType === "touch" || pointerType === "pen") {
        setTouchActive(true);
        touchActiveRef.current = true;
        updatePosition(event.clientX, event.clientY, 16, -16);
        setIsClickable(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        touchActiveRef.current = true;
        setTouchActive(true);
        updatePosition(event.clientX, event.clientY, 16, -16);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        scheduleHideTouchCursor();
      }
    };

    const handlePointerCancel = handlePointerUp;

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && pointerQuery.matches) {
        setVisible(false);
        setIsClickable(false);
      }
    };

    const handleWindowBlur = () => {
      setVisible(false);
      setIsClickable(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    updateDesktopEnabled();

    pointerQuery.addEventListener?.("change", updateDesktopEnabled);
    coarseQuery.addEventListener?.("change", updateDesktopEnabled);

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const speed = 0.55;

      const nextX =
        current.x + (target.x - current.x) * speed;
      const nextY =
        current.y + (target.y - current.y) * speed;

      currentRef.current = {
        x: nextX,
        y: nextY,
      };

      setPosition({
        x: nextX,
        y: nextY,
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cursorVisibilityObserver.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);

      pointerQuery.removeEventListener?.(
        "change",
        updateDesktopEnabled
      );
      coarseQuery.removeEventListener?.(
        "change",
        updateDesktopEnabled
      );

      clearTouchTimeout();

      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!desktopEnabled && !touchActive) return null;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]

        transition-opacity
        duration-150
      "
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: visible && !hiddenBySection ? 1 : 0,
        willChange: "transform",
      }}
    >
      {/* =================================
          FIGMA-STYLE PURPLE CURSOR
      ================================= */}

      <svg
        width={isClickable ? 34 : 30}
        height={isClickable ? 34 : 30}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          -translate-x-[3px]
          -translate-y-[3px]

          drop-shadow-[0_4px_10px_rgba(139,92,246,0.35)]

          transition-all
          duration-200
        "
      >
        <path
          d="M5 3.5L25.5 16.2L16.4 18.5L12.2 27.5L5 3.5Z"
          fill="#8B5CF6"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      {/* =================================
          CLICKABLE ELEMENT INDICATOR
      ================================= */}

      {isClickable && (
        <div
          className="
            absolute
            left-[1px]
            top-[1px]

            h-8
            w-8

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            border
            border-[#8B5CF6]/40

            bg-[#8B5CF6]/5

            animate-pulse
          "
        />
      )}
    </div>
  );
}