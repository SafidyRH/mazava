/*
  Warnings:

  - You are about to drop the column `confirmationToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmationToken",
ADD COLUMN     "confirmToken" TEXT;
