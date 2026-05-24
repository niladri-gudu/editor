export type BoardVisibility =
  | "PRIVATE"
  | "SHARED"
  | "PUBLIC";

export interface BoardOwner {
  id: string;
  email: string;
}

export interface Collaborator {
  id: string;
  email: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
}

export interface Board {
  id: string;

  title: string;

  description: string | null;

  visibility: BoardVisibility;

  ownerId: string;

  createdAt: string;
  updatedAt: string;

  owner: BoardOwner;
}