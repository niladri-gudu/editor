"use client";

import {
  MousePointer2,
  Square,
  Database,
  Type,
  ArrowRight,
} from "lucide-react";

import { ToolButton } from "./tool-button";

import { useEditorStore, type EditorTool } from "@/lib/editor/editor-store";

const tools: {
  tool: EditorTool;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    tool: "select",
    label: "Select",
    icon: <MousePointer2 size={18} />,
  },
  {
    tool: "rectangle",
    label: "Rectangle",
    icon: <Square size={18} />,
  },
  {
    tool: "database",
    label: "Database",
    icon: <Database size={18} />,
  },
  {
    tool: "text",
    label: "Text",
    icon: <Type size={18} />,
  },
  {
    tool: "arrow",
    label: "Arrow",
    icon: <ArrowRight size={18} />,
  },
];

export function Toolbar() {
  const activeTool = useEditorStore((state) => state.activeTool);

  const setActiveTool = useEditorStore((state) => state.setActiveTool);

  return (
    <div className="fixed left-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 rounded-xl border bg-background p-2 shadow-lg">
      {tools.map((tool) => (
        <ToolButton
          key={tool.tool}
          label={tool.label}
          icon={tool.icon}
          active={activeTool === tool.tool}
          onClick={() => setActiveTool(tool.tool)}
        />
      ))}
    </div>
  );
}
