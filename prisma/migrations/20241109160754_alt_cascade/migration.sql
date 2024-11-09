-- DropForeignKey
ALTER TABLE "Adocao" DROP CONSTRAINT "Adocao_adotanteId_fkey";

-- DropForeignKey
ALTER TABLE "Adocao" DROP CONSTRAINT "Adocao_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "foto" TEXT;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
