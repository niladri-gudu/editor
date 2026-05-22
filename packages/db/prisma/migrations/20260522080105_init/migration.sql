/*
  Warnings:

  - You are about to drop the column `source` on the `DiagramEdge` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `DiagramEdge` table. All the data in the column will be lost.
  - Added the required column `sourceId` to the `DiagramEdge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `DiagramEdge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DiagramEdge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DiagramNode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoardRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "BoardVisibility" AS ENUM ('PRIVATE', 'SHARED', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramEdge" DROP CONSTRAINT "DiagramEdge_boardId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramNode" DROP CONSTRAINT "DiagramNode_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "description" TEXT,
ADD COLUMN     "visibility" "BoardVisibility" NOT NULL DEFAULT 'PRIVATE';

-- AlterTable
ALTER TABLE "DiagramEdge" DROP COLUMN "source",
DROP COLUMN "target",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" JSONB DEFAULT '{}',
ADD COLUMN     "sourceId" TEXT NOT NULL,
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DiagramNode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" JSONB DEFAULT '{}',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "BoardRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "Collaborator_boardId_idx" ON "Collaborator"("boardId");

-- CreateIndex
CREATE INDEX "Collaborator_userId_idx" ON "Collaborator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_userId_boardId_key" ON "Collaborator"("userId", "boardId");

-- CreateIndex
CREATE INDEX "Board_ownerId_idx" ON "Board"("ownerId");

-- CreateIndex
CREATE INDEX "DiagramEdge_boardId_idx" ON "DiagramEdge"("boardId");

-- CreateIndex
CREATE INDEX "DiagramEdge_sourceId_idx" ON "DiagramEdge"("sourceId");

-- CreateIndex
CREATE INDEX "DiagramEdge_targetId_idx" ON "DiagramEdge"("targetId");

-- CreateIndex
CREATE INDEX "DiagramNode_boardId_idx" ON "DiagramNode"("boardId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramNode" ADD CONSTRAINT "DiagramNode_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramEdge" ADD CONSTRAINT "DiagramEdge_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "DiagramNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramEdge" ADD CONSTRAINT "DiagramEdge_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "DiagramNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramEdge" ADD CONSTRAINT "DiagramEdge_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
