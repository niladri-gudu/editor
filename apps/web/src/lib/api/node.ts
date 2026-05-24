import { api } from "./axios";

export class NodeApi {
  static async updateNodePosition(nodeId: string, x: number, y: number) {
    const response = await api.patch(`/nodes/${nodeId}`, {
      x,
      y,
    });

    return response.data;
  }
}
