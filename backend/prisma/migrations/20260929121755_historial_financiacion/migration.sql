-- CreateTable
CREATE TABLE `simulaciones_financiacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DECIMAL(12, 2) NOT NULL,
    `montoTotal` DECIMAL(12, 2) NOT NULL,
    `montoCuota` DECIMAL(12, 2) NOT NULL,
    `cantidadCuotas` INTEGER NOT NULL,
    `tasaFinanciacion` DECIMAL(5, 2) NOT NULL,
    `tarjetaId` INTEGER NOT NULL,
    `bancoId` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `simulaciones_financiacion` ADD CONSTRAINT `simulaciones_financiacion_tarjetaId_fkey` FOREIGN KEY (`tarjetaId`) REFERENCES `tarjetas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulaciones_financiacion` ADD CONSTRAINT `simulaciones_financiacion_bancoId_fkey` FOREIGN KEY (`bancoId`) REFERENCES `bancos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulaciones_financiacion` ADD CONSTRAINT `simulaciones_financiacion_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `planes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
