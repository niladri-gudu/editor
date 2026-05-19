export type NodeType =
  | "service"
  | "database"
  | "queue"
  | "cache"
  | "gateway";

export interface DiagramNode {
  id: string;
  type: NodeType;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
}

export interface Board {
  id: string;
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}