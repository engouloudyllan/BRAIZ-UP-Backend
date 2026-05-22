/*
  Warnings:

  - A unique constraint covering the columns `[codeTicket]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeTicket` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `codeTicket` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_codeTicket_key` ON `Order`(`codeTicket`);
