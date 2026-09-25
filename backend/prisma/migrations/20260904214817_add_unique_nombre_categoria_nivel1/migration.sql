/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `categorias_nivel1` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `categorias_nivel2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categorias_nivel1_nombre_key` ON `categorias_nivel1`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `categorias_nivel2_nombre_key` ON `categorias_nivel2`(`nombre`);
