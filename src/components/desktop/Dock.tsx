import React from "react";
import type { DesktopApp, AppId } from "../../types/app";

export default function Dock({
  apps,
  onOpen,
  openIds,
  minimizedIds,
  activeId,
}: {
  apps: DesktopApp[];
  onOpen: (id: AppId) => void;
  openIds: Set<AppId>;
  minimizedIds: Set<AppId>;
  activeId: AppId | null;
}) {
  return (
    <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-2xl bg-white/65 backdrop-blur border border-black/10">
      {apps.map((a) => {
        const isOpen = openIds.has(a.id);
        const isMin = minimizedIds.has(a.id);
        const isActive = activeId === a.id;

        return (
          <button
            key={a.id}
            onClick={() => onOpen(a.id)}
            title={a.title}
            className={[
              "relative px-3 py-2 rounded-2xl transition",
              isActive ? "bg-white shadow-sm border border-black/10" : "hover:bg-white/80",
            ].join(" ")}
          >
            <span className="block text-lg leading-none">{a.icon}</span>
            <span className="block text-[11px] mt-1 text-neutral-900">{a.title}</span>

            {/* 열려있으면 점 */}
            {isOpen ? (
              <span
                className={[
                  "absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rounded-full border border-black/10",
                  isMin ? "bg-neutral-300" : "bg-neutral-900",
                ].join(" ")}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
