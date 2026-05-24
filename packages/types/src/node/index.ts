export interface DiagramNode {
  id: string;

  type: string;

  label: string;

  x: number;
  y: number;

  width: number;
  height: number;

  data: Record<string, unknown>;

  style: Record<string, unknown>;

  boardId: string;

  createdAt: string;
  updatedAt: string;
}
