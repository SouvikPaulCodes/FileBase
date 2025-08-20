/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_folderID_fkey";

-- AlterTable
ALTER TABLE "public"."File" ALTER COLUMN "folderID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "public"."Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
