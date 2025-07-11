/*
  Warnings:

  - You are about to drop the column `confirmToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmToken",
ADD COLUMN     "confirmationToken" TEXT;
