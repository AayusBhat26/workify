-- CreateEnum
CREATE TYPE "WorkspaceIconColor" AS ENUM ('PURPLE', 'RED', 'GREEN', 'BLUE', 'PINK', 'YELLOW', 'ORANGE', 'CYAN', 'LIME', 'EMERALD', 'INDIGO');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "color" "WorkspaceIconColor" NOT NULL DEFAULT 'BLUE';
