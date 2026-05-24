"use client";

import Link from "next/link";
import type { Board } from "@repo/types";

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="block rounded-lg border p-4 transition hover:bg-muted"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{board.title}</h3>

        {board.description && (
          <p className="text-sm text-muted-foreground">{board.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{board.visibility}</span>

          <span>{board.owner.email}</span>
        </div>
      </div>
    </Link>
  );
}
