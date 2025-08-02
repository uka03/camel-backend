/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'editor', 'reader');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "roles" "public"."Role"[],
ALTER COLUMN "name" SET NOT NULL;
