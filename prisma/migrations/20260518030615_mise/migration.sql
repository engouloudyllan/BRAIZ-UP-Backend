/*
  Warnings:

  - The values [PENDING,PREPARING,DELIVERED,CANCELLED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `arrondissement` to the `ShippingZone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `confirmedAt` DATETIME(3) NULL,
    ADD COLUMN `deliveredAt` DATETIME(3) NULL,
    ADD COLUMN `paidAt` DATETIME(3) NULL,
    ADD COLUMN `preparingAt` DATETIME(3) NULL,
    ADD COLUMN `readyAt` DATETIME(3) NULL,
    MODIFY `status` ENUM('EN_PRECOMMANDE', 'EN_COURS_DE_PREPARATION', 'PRÊTE', 'EN_LIVRAISON', 'LIVRÉE', 'ANNULÉE') NOT NULL;

-- AlterTable
ALTER TABLE `ShippingZone` ADD COLUMN `arrondissement` VARCHAR(255) NOT NULL;
