import type { DiagramEdge, DiagramNode } from "@repo/types";

export function toFlowNodes(
  nodes: DiagramNode[],
  onLabelChange?: (nodeId: string, label: string) => void,
) {
  return nodes.map((node) => ({
    id: node.id,

    type: "editable",

    position: {
      x: node.x,
      y: node.y,
    },

    data: {
      label: node.label,

      onLabelChange,
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
