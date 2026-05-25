"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BoardApi } from "@/lib/api/boards";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Toolbar } from "@/components/diagram/toolbar";
import { DiagramCanvasWrapper } from "@/components/diagram/diagram-canvas-wrapper";

export default function BoardPage() {
  const params = useParams();

  const boardId = params.boardId as string;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["diagram", boardId],
    queryFn: () => BoardApi.getDiagram(boardId),
  });

  if (isPending) {
    return <div className="p-8">Loading diagram...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">{(error as Error).message}</div>;
  }

  return (
    <ProtectedRoute>
      <main className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{data.board.title}</h1>

          <p className="text-muted-foreground">{data.board.description}</p>
        </div>

        <Toolbar />

        <DiagramCanvasWrapper
          boardId={boardId}
          nodes={data.nodes}
          edges={data.edges}
        />
      </main>
    </ProtectedRoute>
  );
}
