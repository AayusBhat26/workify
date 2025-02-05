/*
  Warnings:

  - The values [PERSONAL_USE] on the enum `UseCase` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UseCase_new" AS ENUM ('WORK', 'STUDY', 'PERSONAL');
ALTER TABLE "User" ALTER COLUMN "usecase" TYPE "UseCase_new" USING ("usecase"::text::"UseCase_new");
ALTER TYPE "UseCase" RENAME TO "UseCase_old";
ALTER TYPE "UseCase_new" RENAME TO "UseCase";
DROP TYPE "UseCase_old";
COMMIT;
