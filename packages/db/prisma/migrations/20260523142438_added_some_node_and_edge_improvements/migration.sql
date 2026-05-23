-- AlterTable
ALTER TABLE "DiagramEdge" ADD COLUMN     "label" TEXT,
ADD COLUMN     "style" JSONB DEFAULT '{}',
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "DiagramNode" ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "style" JSONB DEFAULT '{}',
ADD COLUMN     "width" DOUBLE PRECISION;
