-- CreateTable
CREATE TABLE `tarjetas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CREDITO', 'DEBITO') NOT NULL,
    `archivado` BOOLEAN NOT NULL DEFAULT false,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bancos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `archivado` BOOLEAN NOT NULL DEFAULT false,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tarjetaId` INTEGER NOT NULL,
    `bancoId` INTEGER NOT NULL,
    `cantidadCuotas` INTEGER NOT NULL,
    `tasaFinanciacion` DECIMAL(5, 2) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `archivado` BOOLEAN NOT NULL DEFAULT false,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `planes_tarjetaId_bancoId_cantidadCuotas_key`(`tarjetaId`, `bancoId`, `cantidadCuotas`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `planes` ADD CONSTRAINT `planes_tarjetaId_fkey` FOREIGN KEY (`tarjetaId`) REFERENCES `tarjetas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `planes` ADD CONSTRAINT `planes_bancoId_fkey` FOREIGN KEY (`bancoId`) REFERENCES `bancos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
