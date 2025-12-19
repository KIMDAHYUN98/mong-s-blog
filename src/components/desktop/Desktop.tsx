import React, { useMemo, useState } from "react";
import type { AppId, DesktopApp } from "../../types/app";
import Window from "./Window";
import Dock from "./Dock";
import DesktopIcons from "./DesktopIcons";
import AboutScreen from "../../screens/AboutScreen";
import ProjectsScreen from "../../screens/ProjectsScreen";

type WindowState = "normal" | "maximized" | "minimized";

type OpenWindow = {
  id: AppId;
  title: string;
  z: number;
  state: WindowState;
};

const APPS: DesktopApp[] = [
  { id: "about", title: "About", icon: "👤" },
  { id: "projects", title: "Projects", icon: "🗂️" },
];

export default function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zTop, setZTop] = useState(10);
  const [activeId, setActiveId] = useState<AppId | null>(null);

  const bumpZ = () => {
    const next = zTop + 1;
    setZTop(next);
    return next;
  };

  const openOrRestore = (id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      const nextZ = bumpZ();
      setActiveId(id);

      if (existing) {
        // minimized -> restore
        return prev.map((w) =>
          w.id === id ? { ...w, z: nextZ, state: w.state === "minimized" ? "normal" : w.state } : w
        );
      }
      const app = APPS.find((a) => a.id === id)!;
      return [...prev, { id, title: app.title, z: nextZ, state: "normal" }];
    });
  };

  const closeApp = (id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  };

  const focusApp = (id: AppId) => {
    const nextZ = bumpZ();
    setActiveId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: nextZ } : w)));
  };

  const minimizeApp = (id: AppId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, state: "minimized" } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  };

  const toggleMaximize = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, state: w.state === "maximized" ? "normal" : "maximized" }
          : w
      )
    );
  };

  const renderContent = (id: AppId) => {
    if (id === "about") return <AboutScreen />;
    if (id === "projects") return <ProjectsScreen />;
    return null;
  };

  const sorted = useMemo(() => [...windows].sort((a, b) => a.z - b.z), [windows]);

  const openIds = useMemo(() => new Set(windows.map((w) => w.id)), [windows]);
  const minimizedIds = useMemo(
    () => new Set(windows.filter((w) => w.state === "minimized").map((w) => w.id)),
    [windows]
  );

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,#f3f4f6_40%,#e5e7eb_100%)]">
      {/* Menu bar */}
      <div className="sticky top-0 z-[9999] flex items-center justify-between px-4 py-2 backdrop-blur bg-white/60 border-b border-black/10">
        <div className="text-sm font-semibold">mong's blog</div>
        <div className="text-sm text-neutral-700">⌚</div>
      </div>

      {/* Desktop icons */}
      <DesktopIcons apps={APPS} onOpen={openOrRestore} />

      {/* Windows */}
      {sorted.map((w) => (
        <Window
          key={w.id}
          title={w.title}
          zIndex={w.z}
          state={w.state}
          onClose={() => closeApp(w.id)}
          onMinimize={() => minimizeApp(w.id)}
          onToggleMaximize={() => toggleMaximize(w.id)}
          onFocus={() => focusApp(w.id)}
        >
          {renderContent(w.id)}
        </Window>
      ))}

      {/* Dock */}
      <Dock
        apps={APPS}
        onOpen={openOrRestore}
        openIds={openIds}
        minimizedIds={minimizedIds}
        activeId={activeId}
      />
    </div>
  );
}
