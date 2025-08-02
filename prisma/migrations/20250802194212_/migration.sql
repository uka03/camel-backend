/*
  Warnings:

  - Made the column `authorId` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Entry" DROP CONSTRAINT "Entry_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Entry" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Entry" ADD CONSTRAINT "Entry_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
