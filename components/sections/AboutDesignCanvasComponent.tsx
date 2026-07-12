"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Tool } from "../hero/DesignToolbar";

type ElementType =
  | "frame"
  | "shape"
  | "text"
  | "process";

type CanvasElement = {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  title?: string;
  meta?: string;
  rotation?: number;
  deletable?: boolean;
};

type Point = {
  x: number;
  y: number;
};

type DragState = {
  id: string;
  startPointerX: number;
  startPointerY: number;
  startElementX: number;
  startElementY: number;
  elementWidth: number;
  elementHeight: number;
};

type AboutDesignCanvasProps = {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
};

const MIN_DRAW_SIZE = 18;

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const defaultProcessElements: CanvasElement[] = [
  {
    id: "process-research",
    type: "process",
    x: 22,
    y: 54,
    width: 150,
    height: 64,
    title: "Research",
    meta: "01 · understand",
    rotation: -2,
    deletable: false,
  },
  {
    id: "process-messy-ideas",
    type: "process",
    x: 455,
    y: 46,
    width: 150,
    height: 64,
    title: "Messy ideas",
    meta: "02 · explore",
    rotation: 2,
    deletable: false,
  },
  {
    id: "process-wireframes",
    type: "process",
    x: 125,
    y: 265,
    width: 150,
    height: 64,
    title: "Wireframes",
    meta: "03 · structure",
    rotation: 1,
    deletable: false,
  },
  {
    id: "process-final-interface",
    type: "process",
    x: 475,
    y: 258,
    width: 150,
    height: 64,
    title: "Final interface",
    meta: "04 · refine",
    rotation: -1,
    deletable: false,
  },
];

export default function AboutDesignCanvas({
  activeTool,
  onToolChange,
}: AboutDesignCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [elements, setElements] = useState<CanvasElement[]>(
    defaultProcessElements
  );

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [isDrawing, setIsDrawing] =
    useState(false);

  const [startPoint, setStartPoint] =
    useState<Point | null>(null);

  const [draftElement, setDraftElement] =
    useState<CanvasElement | null>(null);

  const [dragState, setDragState] =
    useState<DragState | null>(null);

  /* ==========================================
     HELPERS
  ========================================== */

  const clamp = (
    value: number,
    min: number,
    max: number
  ) => {
    return Math.min(Math.max(value, min), max);
  };

  const getCanvasSize = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: container.clientWidth,
      height: container.clientHeight,
    };
  }, []);

  const getPoint = useCallback(
    (
      clientX: number,
      clientY: number
    ): Point => {
      const container = containerRef.current;

      if (!container) {
        return {
          x: 0,
          y: 0,
        };
      }

      const rect =
        container.getBoundingClientRect();

      return {
        x: clamp(
          clientX - rect.left,
          0,
          rect.width
        ),
        y: clamp(
          clientY - rect.top,
          0,
          rect.height
        ),
      };
    },
    []
  );

  /* ==========================================
     KEYBOARD CONTROLS
  ========================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const activeElement =
        document.activeElement as HTMLElement | null;

      const isEditingText =
        activeElement?.getAttribute(
          "contenteditable"
        ) === "true";

      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedId &&
        !isEditingText
      ) {
        const selectedElement =
          elements.find(
            (element) =>
              element.id === selectedId
          );

        if (
          selectedElement &&
          selectedElement.deletable !== false
        ) {
          setElements((previous) =>
            previous.filter(
              (element) =>
                element.id !== selectedId
            )
          );

          setSelectedId(null);
        }
      }

      if (event.key === "Escape") {
        setIsDrawing(false);
        setStartPoint(null);
        setDraftElement(null);
        setDragState(null);
        setSelectedId(null);

        onToolChange("pointer");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedId,
    elements,
    onToolChange,
  ]);

  /* ==========================================
     DRAW FRAME / SHAPE
  ========================================== */

  const handleCanvasPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    /*
      POINTER:
      clicking empty canvas deselects.
    */

    if (activeTool === "pointer") {
      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          "[data-canvas-element]"
        )
      ) {
        setSelectedId(null);
      }

      return;
    }

    if (
      activeTool !== "frame" &&
      activeTool !== "shape"
    ) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "[data-canvas-element]"
      ) ||
      target.closest(
        "[data-canvas-control]"
      )
    ) {
      return;
    }

    event.preventDefault();

    const point = getPoint(
      event.clientX,
      event.clientY
    );

    const newElement: CanvasElement = {
      id: createId(),
      type:
        activeTool === "frame"
          ? "frame"
          : "shape",
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
      deletable: true,
    };

    setSelectedId(null);
    setIsDrawing(true);
    setStartPoint(point);
    setDraftElement(newElement);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handleCanvasPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      !isDrawing ||
      !startPoint ||
      !draftElement
    ) {
      return;
    }

    const point = getPoint(
      event.clientX,
      event.clientY
    );

    setDraftElement({
      ...draftElement,
      x: Math.min(
        startPoint.x,
        point.x
      ),
      y: Math.min(
        startPoint.y,
        point.y
      ),
      width: Math.abs(
        point.x - startPoint.x
      ),
      height: Math.abs(
        point.y - startPoint.y
      ),
    });
  };

  const handleCanvasPointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDrawing) return;

    event.preventDefault();

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    if (
      draftElement &&
      draftElement.width >= MIN_DRAW_SIZE &&
      draftElement.height >= MIN_DRAW_SIZE
    ) {
      setElements((previous) => [
        ...previous,
        draftElement,
      ]);

      setSelectedId(draftElement.id);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setDraftElement(null);

    onToolChange("pointer");
  };

  /* ==========================================
     CREATE TEXT
  ========================================== */

  const handleCanvasClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (activeTool !== "text") return;

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "[data-canvas-element]"
      ) ||
      target.closest(
        "[data-canvas-control]"
      )
    ) {
      return;
    }

    const point = getPoint(
      event.clientX,
      event.clientY
    );

    const { width, height } =
      getCanvasSize();

    const textWidth = Math.min(
      160,
      Math.max(80, width)
    );

    const textHeight = 38;

    const textElement: CanvasElement = {
      id: createId(),
      type: "text",
      x: clamp(
        point.x,
        0,
        Math.max(
          0,
          width - textWidth
        )
      ),
      y: clamp(
        point.y,
        0,
        Math.max(
          0,
          height - textHeight
        )
      ),
      width: textWidth,
      height: textHeight,
      text: "Edit text",
      deletable: true,
    };

    setElements((previous) => [
      ...previous,
      textElement,
    ]);

    setSelectedId(textElement.id);

    onToolChange("pointer");
  };

  /* ==========================================
     DRAG ELEMENT
  ========================================== */

  const handleElementPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    element: CanvasElement
  ) => {
    if (activeTool !== "pointer") return;
    if (event.button !== 0) return;

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "[data-delete-control]"
      ) ||
      target.closest(
        "[contenteditable='true']"
      )
    ) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    setSelectedId(element.id);

    const point = getPoint(
      event.clientX,
      event.clientY
    );

    setDragState({
      id: element.id,
      startPointerX: point.x,
      startPointerY: point.y,
      startElementX: element.x,
      startElementY: element.y,
      elementWidth: element.width,
      elementHeight: element.height,
    });

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handleElementPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragState) return;

    event.stopPropagation();

    const point = getPoint(
      event.clientX,
      event.clientY
    );

    const deltaX =
      point.x -
      dragState.startPointerX;

    const deltaY =
      point.y -
      dragState.startPointerY;

    const { width, height } =
      getCanvasSize();

    const nextX = clamp(
      dragState.startElementX + deltaX,
      0,
      Math.max(
        0,
        width -
          dragState.elementWidth
      )
    );

    const nextY = clamp(
      dragState.startElementY + deltaY,
      0,
      Math.max(
        0,
        height -
          dragState.elementHeight
      )
    );

    setElements((previous) =>
      previous.map((element) =>
        element.id === dragState.id
          ? {
              ...element,
              x: nextX,
              y: nextY,
            }
          : element
      )
    );
  };

  const handleElementPointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragState) return;

    event.stopPropagation();

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    setDragState(null);
  };

  /* ==========================================
     TEXT UPDATE
  ========================================== */

  const updateText = (
    id: string,
    text: string
  ) => {
    setElements((previous) =>
      previous.map((element) =>
        element.id === id
          ? {
              ...element,
              text,
            }
          : element
      )
    );
  };

  /* ==========================================
     DELETE
  ========================================== */

  const deleteElement = (
    id: string
  ) => {
    const element =
      elements.find(
        (item) => item.id === id
      );

    if (
      !element ||
      element.deletable === false
    ) {
      return;
    }

    setElements((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    setSelectedId(null);
  };

  /* ==========================================
     RENDER ELEMENT
  ========================================== */

  const renderElement = (
    element: CanvasElement,
    isDraft = false
  ) => {
    const isSelected =
      selectedId === element.id;

    const isFrame =
      element.type === "frame";

    const isShape =
      element.type === "shape";

    const isText =
      element.type === "text";

    const isProcess =
      element.type === "process";

    const elementLabel =
      isProcess
        ? element.title || "Frame"
        : isFrame
          ? "Frame"
          : isShape
            ? "Rectangle"
            : "Text";

    return (
      <div
        key={element.id}
        data-canvas-element
        onPointerDown={
          isDraft
            ? undefined
            : (event) =>
                handleElementPointerDown(
                  event,
                  element
                )
        }
        onPointerMove={
          isDraft
            ? undefined
            : handleElementPointerMove
        }
        onPointerUp={
          isDraft
            ? undefined
            : handleElementPointerUp
        }
        onClick={(event) => {
          if (isDraft) return;

          event.stopPropagation();

          if (
            activeTool === "pointer"
          ) {
            setSelectedId(element.id);
          }
        }}
        className={`
          absolute
          ${
            isDraft
              ? "pointer-events-none"
              : activeTool === "pointer"
                ? "pointer-events-auto cursor-move"
                : "pointer-events-none"
          }
        `}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          zIndex:
            isSelected || isDraft
              ? 80
              : 60,
          touchAction: "none",
          transform: isProcess
            ? `rotate(${element.rotation || 0}deg)`
            : undefined,
        }}
      >
        {/* PROCESS CARD */}

        {isProcess && (
          <div
            className={`
              absolute
              inset-0

              rounded-xl
              border

              bg-[#17171f]/95

              px-4
              py-3

              shadow-xl

              transition-colors
              duration-200

              ${
                isSelected
                  ? "border-[#8B5CF6]"
                  : "border-white/10 hover:border-[#8B5CF6]/40"
              }
            `}
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B5CF6]">
              {element.meta}
            </p>

            <p className="mt-1.5 text-sm font-medium text-white">
              {element.title}
            </p>
          </div>
        )}

        {/* FRAME */}

        {isFrame && (
          <div className="absolute inset-0 border border-[#8B5CF6] bg-[#8B5CF6]/[0.025]" />
        )}

        {/* SHAPE */}

        {isShape && (
          <div className="absolute inset-0 rounded-[12px] border border-[#A78BFA]/80 bg-gradient-to-br from-[#8B5CF6]/20 to-[#63D2FF]/10 shadow-[0_8px_30px_rgba(139,92,246,0.08)]" />
        )}

        {/* TEXT */}

        {isText && (
          <div
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onFocus={() => {
              setSelectedId(element.id);
            }}
            onBlur={(event) => {
              updateText(
                element.id,
                event.currentTarget
                  .textContent || ""
              );
            }}
            className="relative z-10 min-h-full w-full cursor-text outline-none text-[14px] text-white font-[family-name:var(--font-instrument-serif)]"
          >
            {element.text}
          </div>
        )}

        {/* SELECTION LABEL */}

        {(isDraft || isSelected) && (
          <div className="pointer-events-none absolute -top-[20px] left-[-1px] z-40 whitespace-nowrap rounded-t-[4px] bg-[#8B5CF6] px-2 py-[3px] text-[9px] font-medium text-white">
            {elementLabel}
          </div>
        )}

        {/* SELECTION BORDER */}

        {(isDraft || isSelected) && (
          <div className="pointer-events-none absolute inset-0 z-20 border border-[#8B5CF6]" />
        )}

        {/* FIGMA HANDLES */}

        {isSelected && (
          <>
            <span className="pointer-events-none absolute -left-[4px] -top-[4px] z-30 h-[7px] w-[7px] bg-white ring-1 ring-[#8B5CF6]" />

            <span className="pointer-events-none absolute -right-[4px] -top-[4px] z-30 h-[7px] w-[7px] bg-white ring-1 ring-[#8B5CF6]" />

            <span className="pointer-events-none absolute -bottom-[4px] -left-[4px] z-30 h-[7px] w-[7px] bg-white ring-1 ring-[#8B5CF6]" />

            <span className="pointer-events-none absolute -bottom-[4px] -right-[4px] z-30 h-[7px] w-[7px] bg-white ring-1 ring-[#8B5CF6]" />
          </>
        )}

        {/* DELETE BUTTON — only for user-created elements */}

        {isSelected &&
          element.deletable !== false && (
            <button
              type="button"
              data-delete-control
              aria-label={`Delete ${elementLabel}`}
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                deleteElement(element.id);
              }}
              className="absolute -right-[13px] -top-[13px] z-50 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/15 bg-[#171720] text-[14px] text-white/70 shadow-lg transition-all duration-200 hover:scale-110 hover:border-[#8B5CF6]/60 hover:text-white"
            >
              ×
            </button>
          )}
      </div>
    );
  };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <div
      className="relative h-full w-full"
      aria-label="About mini design canvas wrapper"
    >
      <div
        ref={containerRef}
        onPointerDown={
          handleCanvasPointerDown
        }
        onPointerMove={
          handleCanvasPointerMove
        }
        onPointerUp={
          handleCanvasPointerUp
        }
        onClick={handleCanvasClick}
        className="absolute inset-0 z-10 overflow-hidden pointer-events-auto"
        style={{
          touchAction:
            activeTool === "frame" ||
            activeTool === "shape" ||
            activeTool === "text"
              ? "none"
              : "auto",
        }}
      >
        {elements.map((element) =>
          renderElement(element)
        )}

        {draftElement &&
          renderElement(
            draftElement,
            true
          )}
      </div>
    </div>
  );
}