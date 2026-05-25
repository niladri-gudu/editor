"use client";

import { useQuery } from "@tanstack/react-query";

import { BoardApi } from "@/lib/api/boards";

import { BoardsList } from "@/components/board/boards-list";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function BoardsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["boards"],

    queryFn: BoardApi.getBoards,
  });

  if (isPending) {
    return <div className="p-8">Loading boards...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">{(error as Error).message}</div>;
  }

  return (
    <ProtectedRoute>
      <main className="container mx-auto p-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Your Boards</h1>

          <p className="text-muted-foreground">
            Manage and collaborate on architecture diagrams.
          </p>
        </div>

        <BoardsList title="Owned Boards" boards={data?.ownedBoards ?? []} />

        <BoardsList
          title="Shared With You"
          boards={data?.collaborativeBoards ?? []}
        />
      </main>
    </ProtectedRoute>
  );
}
