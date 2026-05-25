import type { DiagramEdge, DiagramNode } from "@repo/types";

export function toFlowNodes(
  nodes: DiagramNode[],
  onLabelChange?: (nodeId: string, label: string) => void,
  onResize?: (nodeId: string, width: number, height: number) => void,
  onResizeEnd?: (nodeId: string, width: number, height: number) => void,
) {
  return nodes.map((node) => ({
    id: node.id,

    type: "editable",

    position: {
      x: node.x,
      y: node.y,
    },

    width: node.width ?? 180,
    height: node.height ?? 60,

    data: {
      label: node.label,

      width: node.width ?? 180,
      height: node.height ?? 60,

      onLabelChange,
      onResize,
      onResizeEnd,
    },
  }));
}

export function toFlowEdges(edges: DiagramEdge[]) {
  return edges.map((edge) => ({
    id: edge.id,

    source: edge.sourceId,

    target: edge.targetId,

    label: edge.label,
  }));
}
