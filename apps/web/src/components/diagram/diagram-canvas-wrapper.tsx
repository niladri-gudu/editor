"use client";

import { ReactFlowProvider } from "@xyflow/react";

import { DiagramCanvas, type DiagramCanvasProps } from "./diagram-canvas";

export function DiagramCanvasWrapper(props: DiagramCanvasProps) {
  return (
    <ReactFlowProvider>
      <DiagramCanvas {...props} />
    </ReactFlowProvider>
  );
}
