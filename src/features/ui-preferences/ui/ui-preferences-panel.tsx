"use client";

import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { setTaskView, toggleSidebar } from "@/features/ui-preferences/model/ui-preferences-slice";

export function UiPreferencesPanel() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, taskView } = useAppSelector((state) => state.uiPreferences);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm">Компактный Sidebar</p>
          <p className="text-xs text-muted-foreground">Локальная настройка интерфейса</p>
        </div>
        <button
          aria-pressed={sidebarCollapsed}
          className="rounded-lg border px-3 py-2 text-xs transition hover:bg-white/5 aria-pressed:border-cyan-300/50 aria-pressed:text-cyan-200"
          onClick={() => dispatch(toggleSidebar())}
        >
          {sidebarCollapsed ? "Включён" : "Выключен"}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm">Представление задач</p>
        <div className="flex gap-2">
          <button
            aria-pressed={taskView === "list"}
            className="flex-1 rounded-lg border px-3 py-2 text-xs transition hover:bg-white/5 aria-pressed:border-cyan-300/50 aria-pressed:text-cyan-200"
            onClick={() => dispatch(setTaskView("list"))}
          >
            Список
          </button>
          <button
            aria-pressed={taskView === "kanban"}
            className="flex-1 rounded-lg border px-3 py-2 text-xs transition hover:bg-white/5 aria-pressed:border-cyan-300/50 aria-pressed:text-cyan-200"
            onClick={() => dispatch(setTaskView("kanban"))}
          >
            Kanban
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Текущее представление: {taskView}</p>
    </div>
  );
}
