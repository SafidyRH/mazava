-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailConfirmedAt" TIMESTAMP(3),
ADD COLUMN     "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false;
