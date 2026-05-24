export interface DiagramEdge {
  id: string;

  sourceId: string;
  targetId: string;

  type: string | null;
  label: string | null;

  data: Record<string, unknown>;

  style: Record<string, unknown>;

  boardId: string;

  createdAt: string;
  updatedAt: string;
}
