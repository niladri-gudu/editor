"use client";

import { create } from "zustand";

export type EditorTool = "select" | "rectangle" | "database" | "text" | "arrow";

interface EditorState {
  activeTool: EditorTool;

  setActiveTool: (tool: EditorTool) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeTool: "select",

  setActiveTool: (tool) =>
    set({
      activeTool: tool,
    }),
}));
