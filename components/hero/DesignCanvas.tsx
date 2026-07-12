"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Tool } from "./DesignToolbar";

/* ==========================================
   TYPES
========================================== */

type DesignCanvasProps = {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
};

type ElementType = "frame" | "shape" | "text";

type CanvasElement = {
  id: string;
  type: ElementType;

  x: number;
  y: number;

  width: number;
  height: number;

  text?: string;
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
};

/* ==========================================
   CONSTANTS
========================================== */

const MIN_DRAW_SIZE = 20;

const createId = () => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

/* ==========================================
   COMPONENT
========================================== */

export default function DesignCanvas({
  activeTool,
  onToolChange,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [elements, setElements] = useState<CanvasElement[]>(
    []
  );

  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const [startPoint, setStartPoint] =
    useState<Point | null>(null);

  const [draftElement, setDraftElement] =
    useState<CanvasElement | null>(null);

  const [dragState, setDragState] =
    useState<DragState | null>(null);

  /* ==========================================
     HELPERS
  ========================================== */

  const getCanvasPoint = useCallback(
    (
      clientX: number,
      clientY: number
    ): Point => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return {
          x: 0,
          y: 0,
        };
      }

      const rect = canvas.getBoundingClientRect();

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    []
  );

  const selectElement = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements((previousElements) =>
      previousElements.filter(
        (element) => element.id !== id
      )
    );

    setSelectedId((currentSelectedId) =>
      currentSelectedId === id
        ? null
        : currentSelectedId
    );
  }, []);

  const deleteSelectedElement = useCallback(() => {
    if (!selectedId) return;

    deleteElement(selectedId);
  }, [selectedId, deleteElement]);

  const clearAllElements = useCallback(() => {
    setElements([]);
    setSelectedId(null);

    setIsDrawing(false);
    setStartPoint(null);
    setDraftElement(null);
    setDragState(null);

    onToolChange("pointer");
  }, [onToolChange]);

  /* ==========================================
     KEYBOARD CONTROLS

     V = Pointer
     F = Frame
     R = Shape
     T = Text

     Delete / Backspace = Delete selected
     Escape = Cancel / deselect
  ========================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) {
        if (event.key === "Escape") {
          target?.blur();

          setSelectedId(null);
          onToolChange("pointer");
        }

        return;
      }

      const key = event.key.toLowerCase();

      if (key === "v") {
        onToolChange("pointer");
        return;
      }

      if (key === "f") {
        onToolChange("frame");
        return;
      }

      if (key === "r") {
        onToolChange("shape");
        return;
      }

      if (key === "t") {
        onToolChange("text");
        return;
      }

      if (
        event.key === "Delete" ||
        event.key === "Backspace"
      ) {
        if (selectedId) {
          event.preventDefault();
          deleteSelectedElement();
        }

        return;
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    deleteSelectedElement,
    onToolChange,
    selectedId,
  ]);

  /* ==========================================
     DRAWING — POINTER DOWN
  ========================================== */

  const handleCanvasPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      activeTool !== "frame" &&
      activeTool !== "shape"
    ) {
      return;
    }

    if (event.button !== 0) return;

    event.preventDefault();

    const point = getCanvasPoint(
      event.clientX,
      event.clientY
    );

    const type: ElementType =
      activeTool === "frame"
        ? "frame"
        : "shape";

    const newElement: CanvasElement = {
      id: createId(),
      type,

      x: point.x,
      y: point.y,

      width: 0,
      height: 0,
    };

    setSelectedId(null);
    setIsDrawing(true);
    setStartPoint(point);
    setDraftElement(newElement);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /* ==========================================
     DRAWING — POINTER MOVE
  ========================================== */

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

    const point = getCanvasPoint(
      event.clientX,
      event.clientY
    );

    const x = Math.min(startPoint.x, point.x);
    const y = Math.min(startPoint.y, point.y);

    const width = Math.abs(
      point.x - startPoint.x
    );

    const height = Math.abs(
      point.y - startPoint.y
    );

    setDraftElement((previousElement) => {
      if (!previousElement) return null;

      return {
        ...previousElement,
        x,
        y,
        width,
        height,
      };
    });
  };

  /* ==========================================
     DRAWING — POINTER UP
  ========================================== */

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
      setElements((previousElements) => [
        ...previousElements,
        draftElement,
      ]);

      setSelectedId(draftElement.id);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setDraftElement(null);

    /*
      Important:
      After drawing one element,
      automatically return to Pointer.
    */

    onToolChange("pointer");
  };

  /* ==========================================
     TEXT TOOL
  ========================================== */

  const handleCanvasClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (activeTool !== "text") return;

    /*
      Ignore click if it came from an existing
      canvas element or toolbar/control.
    */

    const target = event.target as HTMLElement;

    if (
      target.closest("[data-canvas-element]") ||
      target.closest("[data-canvas-control]")
    ) {
      return;
    }

    const point = getCanvasPoint(
      event.clientX,
      event.clientY
    );

    const textElement: CanvasElement = {
      id: createId(),
      type: "text",

      x: point.x,
      y: point.y,

      width: 190,
      height: 46,

      text: "Type something...",
    };

    setElements((previousElements) => [
      ...previousElements,
      textElement,
    ]);

    setSelectedId(textElement.id);

    onToolChange("pointer");
  };

  /* ==========================================
     START MOVING AN ELEMENT
  ========================================== */

  const handleElementPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    element: CanvasElement
  ) => {
    if (activeTool !== "pointer") return;

    if (event.button !== 0) return;

    /*
      Don't start moving when clicking
      delete button or editable text.
    */

    const target = event.target as HTMLElement;

    if (
      target.closest("[data-delete-control]") ||
      target.closest("[contenteditable='true']")
    ) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    selectElement(element.id);

    const point = getCanvasPoint(
      event.clientX,
      event.clientY
    );

    setDragState({
      id: element.id,

      startPointerX: point.x,
      startPointerY: point.y,

      startElementX: element.x,
      startElementY: element.y,
    });

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /* ==========================================
     MOVE ELEMENT
  ========================================== */

  const handleElementPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragState) return;

    event.stopPropagation();

    const point = getCanvasPoint(
      event.clientX,
      event.clientY
    );

    const deltaX =
      point.x - dragState.startPointerX;

    const deltaY =
      point.y - dragState.startPointerY;

    setElements((previousElements) =>
      previousElements.map((element) => {
        if (element.id !== dragState.id) {
          return element;
        }

        return {
          ...element,

          x: dragState.startElementX + deltaX,

          y: dragState.startElementY + deltaY,
        };
      })
    );
  };

  /* ==========================================
     FINISH MOVING ELEMENT
  ========================================== */

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
     UPDATE TEXT
  ========================================== */

  const updateText = (
    id: string,
    text: string
  ) => {
    setElements((previousElements) =>
      previousElements.map((element) =>
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
     ELEMENT NAME
  ========================================== */

  const getElementName = (
    element: CanvasElement
  ) => {
    if (element.type === "frame") {
      return "Frame";
    }

    if (element.type === "shape") {
      return "Rectangle";
    }

    return "Text";
  };

  /* ==========================================
     RENDER RESIZE HANDLES

     Visual-only for now.
     They intentionally do not resize the
     original portfolio or DOM content.
  ========================================== */

  const renderHandles = () => {
    const positions = [
      "-left-[4px] -top-[4px]",

      "left-1/2 -top-[4px] -translate-x-1/2",

      "-right-[4px] -top-[4px]",

      "-left-[4px] top-1/2 -translate-y-1/2",

      "-right-[4px] top-1/2 -translate-y-1/2",

      "-bottom-[4px] -left-[4px]",

      "bottom-[-4px] left-1/2 -translate-x-1/2",

      "-bottom-[4px] -right-[4px]",
    ];

    return positions.map((position, index) => (
      <span
        key={index}
        className={`
          pointer-events-none
          absolute
          z-30

          h-[8px]
          w-[8px]

          border
          border-[#8B5CF6]

          bg-white

          ${position}
        `}
      />
    ));
  };

  /* ==========================================
     RENDER CANVAS ELEMENT
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

          if (activeTool === "pointer") {
            selectElement(element.id);
          }
        }}
        className={`
          absolute

          ${
            isDraft
              ? "pointer-events-none"
              : activeTool === "pointer"
                ? "pointer-events-auto"
                : "pointer-events-none"
          }

          ${
            activeTool === "pointer" && !isDraft
              ? "cursor-none"
              : ""
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
        }}
      >

        {/* ==================================
            FRAME VISUAL
        ================================== */}

        {isFrame && (
          <div
            className="
              absolute
              inset-0

              border
              border-[#8B5CF6]

              bg-[#8B5CF6]/[0.025]
            "
          />
        )}

        {/* ==================================
            SHAPE VISUAL
        ================================== */}

        {isShape && (
          <div
            className="
              absolute
              inset-0

              rounded-[16px]

              border
              border-[#A78BFA]/80

              bg-gradient-to-br
              from-[#8B5CF6]/20
              to-[#63D2FF]/10

              shadow-[0_12px_35px_rgba(139,92,246,0.12)]

              backdrop-blur-[2px]
            "
          />
        )}

        {/* ==================================
            TEXT VISUAL
        ================================== */}

        {isText && (
          <div
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onFocus={() => {
              selectElement(element.id);
            }}
            onBlur={(event) => {
              updateText(
                element.id,
                event.currentTarget.textContent ||
                  ""
              );
            }}
            className="
              relative
              z-10

              min-h-full
              w-full

              cursor-text

              outline-none

              font-[family-name:var(--font-instrument-serif)]

              text-[28px]
              leading-[1.1]
              text-white
            "
          >
            {element.text}
          </div>
        )}

        {/* ==================================
            FIGMA LABEL
        ================================== */}

        {(isDraft || isSelected) && (
          <div
            className="
              pointer-events-none
              absolute

              -top-[22px]
              left-[-1px]

              z-40

              whitespace-nowrap

              rounded-t-[4px]

              bg-[#8B5CF6]

              px-2
              py-[3px]

              text-[9px]
              font-medium
              tracking-wide
              text-white
            "
          >
            {getElementName(element)}
          </div>
        )}

        {/* ==================================
            SELECTION BORDER
        ================================== */}

        {(isSelected || isDraft) && (
          <div
            className={`
              pointer-events-none
              absolute
              inset-0
              z-20

              border
              border-[#8B5CF6]

              ${
                isShape
                  ? "rounded-[16px]"
                  : ""
              }
            `}
          />
        )}

        {/* ==================================
            DIMENSIONS WHILE DRAWING
        ================================== */}

        {isDraft &&
          element.width > 50 &&
          element.height > 30 && (
            <div
              className="
                pointer-events-none
                absolute

                left-1/2
                top-1/2
                z-40

                -translate-x-1/2
                -translate-y-1/2

                whitespace-nowrap

                rounded-md

                border
                border-white/10

                bg-[#111118]/90

                px-2
                py-1

                text-[10px]
                font-medium
                text-white/70

                shadow-lg

                backdrop-blur-md
              "
            >
              {Math.round(element.width)} ×{" "}
              {Math.round(element.height)}
            </div>
          )}

        {/* ==================================
            RESIZE HANDLES
        ================================== */}

        {isSelected &&
          !isText &&
          renderHandles()}

        {/* ==================================
            DELETE BUTTON
        ================================== */}

        {isSelected && !isDraft && (
          <button
            type="button"
            data-delete-control
            aria-label={`Delete ${getElementName(
              element
            )}`}
            title="Delete"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              deleteElement(element.id);
            }}
            className="
              absolute
              -right-[13px]
              -top-[13px]
              z-50

              flex
              h-[26px]
              w-[26px]

              items-center
              justify-center

              rounded-full

              border
              border-white/15

              bg-[#171720]

              text-[14px]
              leading-none
              text-white/70

              shadow-[0_6px_18px_rgba(0,0,0,0.35)]

              transition-all
              duration-200

              hover:scale-110
              hover:border-[#8B5CF6]/60
              hover:bg-[#8B5CF6]
              hover:text-white
            "
          >
            ×
          </button>
        )}
      </div>
    );
  };

  /* ==========================================
     CANVAS POINTER BEHAVIOUR
  ========================================== */

  const drawingMode =
    activeTool === "frame" ||
    activeTool === "shape" ||
    activeTool === "text";

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <>
      {/* ======================================
          FULL HERO DESIGN CANVAS

          This overlay NEVER modifies the
          original hero content.

          In Pointer mode:
          - Canvas background ignores clicks.
          - Original portfolio remains usable.
          - Created elements remain interactive.

          In drawing mode:
          - Canvas captures pointer events.
      ====================================== */}

      <div
        ref={canvasRef}
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handleCanvasPointerUp}
        onClick={handleCanvasClick}
        className={`
          absolute
          inset-0

          z-40

          hidden
          lg:block

          ${
            drawingMode
              ? "pointer-events-auto"
              : "pointer-events-none"
          }
        `}
        style={{
          touchAction: drawingMode
            ? "none"
            : "auto",
        }}
        aria-label="Interactive design canvas"
      >

        {/* Existing created elements */}

        {elements.map((element) =>
          renderElement(element)
        )}

        {/* Current drawing preview */}

        {draftElement &&
          renderElement(draftElement, true)}
      </div>

      {/* ======================================
          POINTER-MODE ELEMENT LAYER

          This allows created elements to remain
          selectable while the main canvas itself
          does not block the original portfolio.
      ====================================== */}

      {!drawingMode && elements.length > 0 && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0

            z-40

            hidden
            xl:block
          "
          aria-hidden="true"
        >
          {elements.map((element) => (
            <div
              key={`pointer-${element.id}`}
              className="pointer-events-none absolute"
              style={{
                left: element.x,
                top: element.y,

                width: element.width,
                height: element.height,
              }}
            />
          ))}
        </div>
      )}

      {/* ======================================
          CLEAR ALL BUTTON

          Only appears after something has been
          created. Does not affect original hero.
      ====================================== */}

      {elements.length > 0 && (
        <button
          type="button"
          data-canvas-control
          onClick={clearAllElements}
          className="
            fixed
            bottom-6
            right-6
            z-[120]

            hidden
            lg:flex

            items-center
            gap-2

            rounded-full

            border
            border-white/10

            bg-[#171720]/90

            px-4
            py-2.5

            text-[11px]
            font-medium
            tracking-wide
            text-white/55

            shadow-[0_12px_35px_rgba(0,0,0,0.35)]

            backdrop-blur-xl

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:border-[#8B5CF6]/40
            hover:text-white/90
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#8B5CF6]
              shadow-[0_0_8px_rgba(139,92,246,0.8)]
            "
          />

          Clear canvas
        </button>
      )}
    </>
  );
}