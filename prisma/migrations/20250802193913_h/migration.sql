/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Entry" ADD COLUMN     "authorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_authorId_key" ON "public"."Entry"("authorId");

-- AddForeignKey
ALTER TABLE "public"."Entry" ADD CONSTRAINT "Entry_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
