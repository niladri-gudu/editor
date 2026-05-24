import type { Board, Collaborator } from "../board/index.js";

import type { DiagramNode } from "../node/index.js";

import type { DiagramEdge } from "../edge/index.js";

export interface DiagramResponse {
  board: Board;

  collaborators: Collaborator[];

  nodes: DiagramNode[];

  edges: DiagramEdge[];
}
