/*
  Warnings:

  - You are about to drop the column `sorprise` on the `orders` table. All the data in the column will be lost.
  - Added the required column `firstNameClient` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastNameClient` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "sorprise",
ADD COLUMN     "firstNameClient" TEXT NOT NULL,
ADD COLUMN     "lastNameClient" TEXT NOT NULL,
ADD COLUMN     "surprise" BOOLEAN NOT NULL DEFAULT false;
