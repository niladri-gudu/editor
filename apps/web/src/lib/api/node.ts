import { api } from "./axios";

export class NodeApi {
  static async createNode(
    boardId: string,
    data: {
      type: string;
      label: string;
      x: number;
      y: number;
    },
  ) {
    const response = await api.post(`/boards/${boardId}/nodes`, data);

    return response.data.data;
  }

  static async updateNodePosition(nodeId: string, x: number, y: number) {
    const response = await api.patch(`/nodes/${nodeId}`, {
      x,
      y,
    });

    return response.data;
  }

  static async updateNodeLabel(nodeId: string, label: string) {
    const response = await api.patch(`/nodes/${nodeId}`, {
      label,
    });

    return response.data.data;
  }

  static async updateNodeSize(nodeId: string, width: number, height: number) {
    const response = await api.patch(`/nodes/${nodeId}`, {
      width,
      height,
    });

    return response.data.data;
  }

  static async deleteNode(nodeId: string) {
    const response = await api.delete(`/nodes/${nodeId}`);

    return response.data;
  }
}
