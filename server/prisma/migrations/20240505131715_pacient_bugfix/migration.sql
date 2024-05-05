/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `pacients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pacients` MODIFY `birthDate` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pacients_email_key` ON `pacients`(`email`);
