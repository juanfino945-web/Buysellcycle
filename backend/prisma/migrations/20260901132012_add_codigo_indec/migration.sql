/*
  Warnings:

  - A unique constraint covering the columns `[codigoIndec]` on the table `localidades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoIndec]` on the table `provincias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoIndec` to the `localidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoIndec` to the `provincias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `localidades` ADD COLUMN `codigoIndec` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `provincias` ADD COLUMN `codigoIndec` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `localidades_codigoIndec_key` ON `localidades`(`codigoIndec`);

-- CreateIndex
CREATE UNIQUE INDEX `provincias_codigoIndec_key` ON `provincias`(`codigoIndec`);
