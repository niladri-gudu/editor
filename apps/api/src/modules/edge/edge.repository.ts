import { prisma } from "@repo/db";

export class EdgeRepository {
  static createEdge = (
    boardId: string,
    data: {
      sourceId: string;
      targetId: string;
      type?: string;
      label?: string;
      data?: object;
      style?: object;
    },
  ) => {
    return prisma.diagramEdge.create({
      data: {
        boardId,
        ...data,
      },
    });
  };

  static findEdgeById = (edgeId: string) => {
    return prisma.diagramEdge.findUnique({
      where: {
        id: edgeId,
      },
    });
  };

  static findEdgesByBoard = (boardId: string) => {
    return prisma.diagramEdge.findMany({
      where: {
        boardId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  };

  static updateEdge = (
    edgeId: string,
    data: {
      type?: string;
      label?: string;
      data?: object;
      style?: object;
    },
  ) => {
    return prisma.diagramEdge.update({
      where: {
        id: edgeId,
      },
      data,
    });
  };

  static deleteEdge = (edgeId: string) => {
    return prisma.diagramEdge.delete({
      where: {
        id: edgeId,
      },
    });
  };
}