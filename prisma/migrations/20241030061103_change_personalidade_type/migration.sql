/*
  Warnings:

  - The `personalidade` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "personalidade",
ADD COLUMN     "personalidade" TEXT[];
