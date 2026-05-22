/*
  Warnings:

  - A unique constraint covering the columns `[trackingToken]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - The required column `trackingToken` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_AddressId_fkey`;

-- DropIndex
DROP INDEX `Order_AddressId_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Cart` MODIFY `sessionId` VARCHAR(191) NULL,
    MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `customerType` ENUM('PARTICULIER', 'ENTREPRISE') NOT NULL,
    ADD COLUMN `deliveryTime` DATETIME(3) NULL,
    ADD COLUMN `guestCity` VARCHAR(255) NULL,
    ADD COLUMN `guestCompanyName` VARCHAR(255) NULL,
    ADD COLUMN `guestEmail` VARCHAR(255) NULL,
    ADD COLUMN `guestName` VARCHAR(255) NULL,
    ADD COLUMN `guestPhone` VARCHAR(255) NULL,
    ADD COLUMN `guestResponsable` VARCHAR(255) NULL,
    ADD COLUMN `guestSurname` VARCHAR(255) NULL,
    ADD COLUMN `trackingToken` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NULL,
    MODIFY `AddressId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `companyName` VARCHAR(255) NULL,
    ADD COLUMN `responsable` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_trackingToken_key` ON `Order`(`trackingToken`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_AddressId_fkey` FOREIGN KEY (`AddressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
