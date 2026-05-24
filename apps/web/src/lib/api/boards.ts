import { api } from "./axios";

import type {
  ApiResponse,
  Board,
  DiagramResponse,
  BoardVisibility,
} from "@repo/types";

export interface CreateBoardPayload {
  title: string;
  description?: string;
  visibility?: BoardVisibility;
}

export interface UpdateBoardPayload {
  title?: string;
  description?: string;
  visibility?: BoardVisibility;
}

export class BoardApi {
  static async getBoards() {
    const response = await api.get<
      ApiResponse<{
        ownedBoards: Board[];
        collaborativeBoards: Board[];
      }>
    >("/boards");

    return response.data.data;
  }

  static async getBoard(boardId: string) {
    const response = await api.get<ApiResponse<Board>>(`/boards/${boardId}`);

    return response.data.data;
  }

  static async getDiagram(boardId: string) {
    const response = await api.get<ApiResponse<DiagramResponse>>(
      `/boards/${boardId}/diagram`,
    );

    return response.data.data;
  }

  static async createBoard(payload: CreateBoardPayload) {
    const response = await api.post<ApiResponse<Board>>("/boards", payload);

    return response.data.data;
  }

  static async updateBoard(boardId: string, payload: UpdateBoardPayload) {
    const response = await api.patch<ApiResponse<Board>>(
      `/boards/${boardId}`,
      payload,
    );

    return response.data.data;
  }

  static async deleteBoard(boardId: string) {
    const response = await api.delete(`/boards/${boardId}`);

    return response.data;
  }
}
