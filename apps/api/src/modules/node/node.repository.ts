import { prisma } from "@repo/db";

export class NodeRepository {
  static createNode = (
    boardId: string,
    data: {
      type: string;
      label: string;
      x: number;
      y: number;
      width?: number;
      height?: number;
      data?: object;
      style?: object;
    },
  ) => {
    return prisma.diagramNode.create({
      data: {
        boardId,
        ...data,
      },
    });
  };

  static findNodeById = (nodeId: string) => {
    return prisma.diagramNode.findUnique({
      where: { id: nodeId },
    });
  };

  static findNodesByBoard = (boardId: string) => {
    return prisma.diagramNode.findMany({
      where: { boardId },
      orderBy: {
        createdAt: "asc",
      },
    });
  };

  static updateNode = (
    nodeId: string,
    data: {
      type?: string;
      label?: string;
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      data?: object;
      style?: object;
    },
  ) => {
    return prisma.diagramNode.update({
      where: { id: nodeId },
      data,
    });
  };

  static deleteNode = (nodeId: string) => {
    return prisma.diagramNode.delete({
      where: { id: nodeId },
    });
  };
}
