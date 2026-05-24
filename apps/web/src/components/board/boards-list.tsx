"use client";

import { BoardCard } from "./board-card";

import type { Board } from "@repo/types";

interface BoardsListProps {
  title: string;
  boards: Board[];
}

export function BoardsList({ title, boards }: BoardsListProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      {boards.length === 0 ? (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          No boards found
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </section>
  );
}
