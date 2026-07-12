"use client";

export type Tool = "pointer" | "frame" | "shape" | "text";

type DesignToolbarProps = {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
};

export default function DesignToolbar({
  activeTool,
  onToolChange,
}: DesignToolbarProps) {
  const tools: {
    id: Tool;
    label: string;
    shortcut: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "pointer",
      label: "Move",
      shortcut: "V",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 3.5L18.5 12L12.5 13.5L9.5 19.5L5 3.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      id: "frame",
      label: "Frame",
      shortcut: "F",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 8V5H8M16 5H19V8M19 16V19H16M8 19H5V16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      id: "shape",
      label: "Shape",
      shortcut: "R",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ),
    },

    {
      id: "text",
      label: "Text",
      shortcut: "T",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 6H17M12 6V18"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const handleToolClick = (tool: Tool) => {
    /*
      If the currently active drawing tool is clicked again,
      return safely to pointer mode.
    */

    if (activeTool === tool && tool !== "pointer") {
      onToolChange("pointer");
      return;
    }

    onToolChange(tool);
  };

  return (
    <div
      className="
        hidden
        lg:flex

        absolute
        -right-[54px]
        top-[18px]
        md:-right-[62px]
        md:top-[24px]
        xl:-right-[72px]
        xl:top-[30px]
        z-[100]

        flex-col
        items-center
        gap-1

        rounded-[16px]
        border
        border-white/10

        bg-[#171720]/90
        p-1.5

        shadow-[0_14px_40px_rgba(0,0,0,0.35),0_0_30px_rgba(139,92,246,0.08)]

        backdrop-blur-xl
      "
      aria-label="Design tools"
      role="toolbar"
    >
      {tools.map((tool) => {
        const isActive = activeTool === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            aria-label={`${tool.label} tool`}
            aria-pressed={isActive}
            title={`${tool.label} (${tool.shortcut})`}
            onClick={() => handleToolClick(tool.id)}
            className={`
              group/tool
              relative

              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-[10px]

              outline-none

              transition-all
              duration-200
              ease-out

              focus-visible:ring-2
              focus-visible:ring-[#8B5CF6]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#171720]

              ${
                isActive
                  ? `
                      scale-[1.03]
                      bg-[#8B5CF6]
                      text-white
                      shadow-[0_6px_18px_rgba(139,92,246,0.32)]
                    `
                  : `
                      text-white/45
                      hover:bg-white/[0.06]
                      hover:text-white/90
                    `
              }
            `}
          >
            {tool.icon}

            {/* ================================
                TOOLTIP
            ================================= */}

            <span
              className="
                pointer-events-none
                absolute
                right-[calc(100%+10px)]
                top-1/2
                z-[110]

                flex
                -translate-y-1/2
                translate-x-1
                items-center
                gap-2

                whitespace-nowrap

                rounded-md
                border
                border-white/10

                bg-[#111118]
                px-2
                py-1

                text-[10px]
                font-medium
                tracking-wide
                text-white/70

                opacity-0

                shadow-lg

                transition-all
                duration-200

                group-hover/tool:translate-x-0
                group-hover/tool:opacity-100
              "
            >
              <span>{tool.label}</span>

              <span className="text-white/30">
                {tool.shortcut}
              </span>
            </span>

            {/* ================================
                ACTIVE TOOL INDICATOR
            ================================= */}

            {isActive && (
              <span
                className="
                  pointer-events-none
                  absolute
                  -right-[4px]
                  top-1/2

                  h-1.5
                  w-1.5

                  -translate-y-1/2

                  rounded-full

                  bg-white

                  shadow-[0_0_8px_rgba(255,255,255,0.8)]
                "
              />
            )}
          </button>
        );
      })}

      {/* ================================
          SEPARATOR
      ================================= */}

      <div className="my-1 h-px w-6 bg-white/10" />

      {/* ================================
          STATUS DOT
      ================================= */}

      <div
        className="
          my-1
          h-1.5
          w-1.5
          rounded-full

          bg-[#8B5CF6]

          shadow-[0_0_8px_rgba(139,92,246,0.8)]
        "
        aria-hidden="true"
      />
    </div>
  );
}