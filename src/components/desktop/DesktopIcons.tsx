import React from "react";
import type { DesktopApp, AppId } from "../../types/app";

export default function DesktopIcons({
  apps,
  onOpen,
}: {
  apps: DesktopApp[];
  onOpen: (id: AppId) => void;
}) {
  return (
    <div className="absolute top-[72px] left-5 grid gap-3">
      {apps.map((a) => (
        <div
          key={a.id}
          onDoubleClick={() => onOpen(a.id)}
          className="w-[92px] px-2 py-3 rounded-2xl bg-white/50 border border-black/10 hover:bg-white/70 select-none text-center cursor-default"
        >
          <div className="text-2xl">{a.icon}</div>
          <div className="mt-1 text-xs font-medium text-neutral-900">{a.title}</div>
          <div className="text-[10px] text-neutral-500 mt-0.5">dbl-click</div>
        </div>
      ))}
    </div>
  );
}
