-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponível',
    "tamanho" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "adocaoId" INTEGER,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adotante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Adotante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" SERIAL NOT NULL,
    "dataAdocao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adotanteId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_adocaoId_key" ON "Pet"("adocaoId");

-- CreateIndex
CREATE INDEX "Pet_status_idx" ON "Pet"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_petId_key" ON "Adocao"("petId");

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
