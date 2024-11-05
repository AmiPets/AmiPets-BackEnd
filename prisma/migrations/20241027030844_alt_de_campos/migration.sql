/*
  Warnings:

  - You are about to drop the column `adocaoId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pet_adocaoId_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "adocaoId",
ALTER COLUMN "status" SET DEFAULT '0';
