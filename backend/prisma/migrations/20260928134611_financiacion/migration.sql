/*
  Warnings:

  - A unique constraint covering the columns `[nombre,provinciaId]` on the table `localidades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `provincias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre,provinciaId,localidadId]` on the table `sucursales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `provincias_nombre_key` ON `provincias`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `sucursales_nombre_provinciaId_localidadId_key` ON `sucursales`(`nombre`, `provinciaId`, `localidadId`);
