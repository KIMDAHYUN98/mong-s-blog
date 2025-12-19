import React, { useEffect, useRef, useState } from "react";

type WindowState = "normal" | "maximized" | "minimized";

export default function Window({
  title,
  zIndex,
  state,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  children,
}: {
  title: string;
  zIndex: number;
  state: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 120, y: 90 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 120, y: 90 });

  // 드래그 (normal 상태에서만)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const startDrag = (e: React.MouseEvent) => {
    if (state !== "normal") return;
    onFocus();
    setDragging(true);
    const rect = ref.current?.getBoundingClientRect();
    const baseX = rect?.left ?? pos.x;
    const baseY = rect?.top ?? pos.y;
    dragOffset.current = { x: e.clientX - baseX, y: e.clientY - baseY };
  };

  const handleToggleMax = () => {
    onFocus();
    if (state === "normal") prevPos.current = pos;
    if (state === "maximized") setPos(prevPos.current);
    onToggleMaximize();
  };

  // minimized면 아예 렌더하지 않음(=독에서 다시 열기/복원)
  if (state === "minimized") return null;

  const style =
    state === "maximized"
      ? ({
          position: "fixed",
          inset: 0,
          transform: "none",
          zIndex,
        } as React.CSSProperties)
      : ({
          position: "absolute",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          zIndex,
        } as React.CSSProperties);

  return (
    <div
      ref={ref}
      style={style}
      onMouseDown={onFocus}
      className={[
        "rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden",
        state === "maximized" ? "w-screen h-screen" : "w-[min(860px,92vw)] h-[min(560px,72vh)]",
      ].join(" ")}
    >
      {/* Titlebar */}
      <div
        onMouseDown={startDrag}
        onDoubleClick={handleToggleMax}
        className="h-11 flex items-center gap-3 px-3 border-b border-black/10 bg-white/60 select-none"
        style={{ cursor: state === "normal" ? (dragging ? "grabbing" : "grab") : "default" }}
      >
        <div className="flex gap-2 w-[72px]">
          <button
            className="w-3 h-3 rounded-full border border-black/10 bg-red-300"
            onClick={(e) => (e.stopPropagation(), onClose())}
            aria-label="close"
            title="Close"
          />
          <button
            className="w-3 h-3 rounded-full border border-black/10 bg-yellow-200"
            onClick={(e) => (e.stopPropagation(), onMinimize())}
            aria-label="minimize"
            title="Minimize"
          />
          <button
            className="w-3 h-3 rounded-full border border-black/10 bg-green-300"
            onClick={(e) => (e.stopPropagation(), handleToggleMax())}
            aria-label="maximize"
            title={state === "maximized" ? "Restore" : "Maximize"}
          />
        </div>

        <div className="flex-1 text-center text-[13px] font-semibold text-neutral-900">
          {title}
        </div>
        <div className="w-[72px]" />
      </div>

      <div className="h-[calc(100%-44px)] overflow-auto p-4">{children}</div>
    </div>
  );
}
