/*
  Warnings:

  - A unique constraint covering the columns `[nombre,categoriaNivel1Id]` on the table `categorias_nivel2` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `categorias_nivel2_nombre_key` ON `categorias_nivel2`;

-- CreateIndex
CREATE UNIQUE INDEX `categorias_nivel2_nombre_categoriaNivel1Id_key` ON `categorias_nivel2`(`nombre`, `categoriaNivel1Id`);
