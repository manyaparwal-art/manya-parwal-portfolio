"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import DesignToolbar from "./DesignToolbar";
import CursorHint from "./CursorHint";

import type { Tool } from "./DesignToolbar";

type HeroImageProps = {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  isActive?: boolean;
};

type Position = {
  x: number;
  y: number;
};

type FrameRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function HeroImage({
  activeTool,
  onToolChange,
  isActive = true,
}: HeroImageProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);

  const REAL_IMAGE = "/images/manya.png";
  const SKETCH_IMAGE = "/images/manya-sketch.png";

  const [isHovered, setIsHovered] = useState(false);
  const [isFrameSelected, setIsFrameSelected] = useState(false);
  const [isDrawingFrame, setIsDrawingFrame] = useState(false);
  const [frameOrigin, setFrameOrigin] = useState<Position | null>(null);
  const [frameRect, setFrameRect] = useState<FrameRect | null>(null);

  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 50,
    y: 50,
  });

  const [smoothPosition, setSmoothPosition] = useState<Position>({
    x: 50,
    y: 50,
  });

  const targetPositionRef = useRef<Position>({
    x: 50,
    y: 50,
  });

  const currentPositionRef = useRef<Position>({
    x: 50,
    y: 50,
  });

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const current = currentPositionRef.current;
      const target = targetPositionRef.current;

      const ease = 0.16;

      const nextX =
        current.x + (target.x - current.x) * ease;

      const nextY =
        current.y + (target.y - current.y) * ease;

      currentPositionRef.current = {
        x: nextX,
        y: nextY,
      };

      setSmoothPosition({
        x: nextX,
        y: nextY,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      setIsHovered(false);
      setIsFrameSelected(false);
      setIsDrawingFrame(false);
      setFrameOrigin(null);
      setFrameRect(null);
    }
  }, [isActive]);

  const getPositionFromEvent = (
    event: { clientX: number; clientY: number }
  ) => {
    const element = imageRef.current;

    if (!element) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    return {
      x: clampedX,
      y: clampedY,
    } satisfies Position;
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    document.body.setAttribute("data-hide-global-cursor", "true");
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const nextPosition = getPositionFromEvent(event);

    if (!nextPosition) return;

    targetPositionRef.current = nextPosition;

    setCursorPosition(nextPosition);

    if (activeTool === "frame" && isDrawingFrame && frameOrigin) {
      const left = Math.min(frameOrigin.x, nextPosition.x);
      const top = Math.min(frameOrigin.y, nextPosition.y);
      const width = Math.abs(nextPosition.x - frameOrigin.x);
      const height = Math.abs(nextPosition.y - frameOrigin.y);

      setFrameRect({
        x: left,
        y: top,
        width,
        height,
      });
      setIsFrameSelected(true);
      return;
    }

    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
     document.body.removeAttribute("data-hide-global-cursor");
  };
useEffect(() => {
  return () => {
    document.body.removeAttribute("data-hide-global-cursor");
  };
}, []);
  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    if (activeTool !== "frame") return;

    const nextPosition = getPositionFromEvent(event);

    if (!nextPosition) return;

    setFrameOrigin(nextPosition);
    setFrameRect({
      x: nextPosition.x,
      y: nextPosition.y,
      width: 0,
      height: 0,
    });
    setIsDrawingFrame(true);
    setIsFrameSelected(true);
    setIsHovered(false);
  };

  const handlePointerUp = () => {
    if (activeTool !== "frame") return;

    setIsDrawingFrame(false);
    onToolChange("pointer");
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    if (activeTool === "frame") {
      setFrameOrigin(null);
      setFrameRect(null);
      setIsFrameSelected(true);
      onToolChange("pointer");
      return;
    }

    if (activeTool === "pointer") {
      setIsFrameSelected((previous) => !previous);
    }
  };

  const showSelectionFrame =
    isHovered || isFrameSelected || Boolean(frameRect);

  const revealOpacity = isHovered ? 1 : 0;

  const handles = [
    "-left-[5px] -top-[5px]",
    "left-1/2 -top-[5px] -translate-x-1/2",
    "-right-[5px] -top-[5px]",
    "-left-[5px] top-1/2 -translate-y-1/2",
    "-right-[5px] top-1/2 -translate-y-1/2",
    "-bottom-[5px] -left-[5px]",
    "bottom-[-5px] left-1/2 -translate-x-1/2",
    "-bottom-[5px] -right-[5px]",
  ];

  return (
    <div
      className={`relative mx-auto flex w-full items-center justify-center transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        isActive
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-6 scale-[0.98] opacity-0 blur-[5px]"
      }`}
    >
      <div className="relative flex items-center justify-center">

        <div
          ref={imageRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={handlePointerEnter}
          onMouseMove={(event) => {
            const nextPosition = getPositionFromEvent(event);
            if (!nextPosition) return;

            targetPositionRef.current = nextPosition;
            setCursorPosition(nextPosition);
            setIsHovered(true);
          }}
          onMouseLeave={handlePointerLeave}
          onClick={handleImageClick}
          className="group relative isolate h-[420px] w-[270px] cursor-none overflow-visible sm:h-[500px] sm:w-[320px] md:h-[570px] md:w-[365px] lg:h-[500px] lg:w-[320px] xl:h-[600px] xl:w-[385px] 2xl:h-[660px] 2xl:w-[425px]"
          style={{
            touchAction: "none",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-t-[180px] rounded-b-[18px] border border-white/[0.12] bg-[#1B1D24] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

            <Image
              src={REAL_IMAGE}
              alt="Manya Parwal"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 270px, (max-width: 768px) 320px, (max-width: 1024px) 365px, (max-width: 1280px) 320px, (max-width: 1536px) 385px, 425px"
              className="pointer-events-none select-none object-cover object-top"
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
              style={{
                opacity: revealOpacity,
                clipPath: `circle(${isHovered ? 95 : 0}px at ${smoothPosition.x}% ${smoothPosition.y}%)`,
                WebkitClipPath: `circle(${isHovered ? 95 : 0}px at ${smoothPosition.x}% ${smoothPosition.y}%)`,
              }}
            >
              <Image
                src={SKETCH_IMAGE}
                alt=""
                aria-hidden="true"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 270px, (max-width: 768px) 320px, (max-width: 1024px) 365px, (max-width: 1280px) 320px, (max-width: 1536px) 385px, 425px"
                className="pointer-events-none select-none object-cover object-top"
                draggable={false}
              />
            </div>

            <div
              className="pointer-events-none absolute z-20 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.14] shadow-[0_0_35px_rgba(139,92,246,0.08)] transition-opacity duration-300"
              style={{
                left: `${smoothPosition.x}%`,
                top: `${smoothPosition.y}%`,
                opacity: revealOpacity,
              }}
            />
          </div>

          {frameRect && (
            <div
              className="pointer-events-none absolute z-30 rounded-[16px] border border-dashed border-[#8B5CF6]/80 bg-[#8B5CF6]/10"
              style={{
                left: `${frameRect.x}%`,
                top: `${frameRect.y}%`,
                width: `${Math.max(frameRect.width, 6)}%`,
                height: `${Math.max(frameRect.height, 6)}%`,
                transform: "translate(-0.5px, -0.5px)",
              }}
            />
          )}

          <div
            className={`pointer-events-none absolute inset-0 z-30 rounded-t-[180px] rounded-b-[18px] border border-[#8B5CF6] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
              showSelectionFrame
                ? "scale-100 opacity-100"
                : "scale-[0.99] opacity-0"
            }`}
          />

          <div
            className={`pointer-events-none absolute -top-[25px] left-0 z-40 rounded-t-[5px] bg-[#8B5CF6] px-2 py-1 text-[9px] font-medium tracking-[0.04em] text-white transition-all duration-300 ${
              showSelectionFrame
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            Manya / Hero Image
          </div>

          {handles.map((position, index) => (
            <span
              key={index}
              className={`pointer-events-none absolute z-40 h-[9px] w-[9px] border border-[#8B5CF6] bg-white transition-all duration-300 ${position} ${
                showSelectionFrame
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              }`}
            />
          ))}

          <div
            className="pointer-events-none absolute z-50 transition-opacity duration-150"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              opacity: isHovered ? 1 : 0,
              transform: "translate(-3px, -3px)",
            }}
          >
            <svg
              width="28"
              height="34"
              viewBox="0 0 28 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L24 17L14 19L10 30L2 2Z"
                fill="#8B5CF6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="absolute left-full top-0 z-50 ml-4 hidden lg:block">
          <DesignToolbar
            activeTool={activeTool}
            onToolChange={onToolChange}
          />
        </div>

        <CursorHint />
      </div>

      <style jsx>{`
        @media (hover: none), (pointer: coarse) {
          .group {
            cursor: auto;
          }
        }
      `}</style>
    </div>
  );
}