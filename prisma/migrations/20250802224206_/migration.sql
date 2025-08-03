/*
  Warnings:

  - Made the column `categoryId` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Entry" DROP CONSTRAINT "Entry_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Entry" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Entry" ADD CONSTRAINT "Entry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
