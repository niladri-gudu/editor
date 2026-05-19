import { DiagramNode, DiagramEdge } from "./index.js";

export interface ServerToClientEvents {
  nodeUpdated: (node: DiagramNode) => void;
  edgeUpdated: (edge: DiagramEdge) => void;
}

export interface ClientToServerEvents {
  updateNode: (node: DiagramNode) => void;
  updateEdge: (edge: DiagramEdge) => void;
}
