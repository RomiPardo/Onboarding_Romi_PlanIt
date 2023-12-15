/*
  Warnings:

  - You are about to drop the column `preOrderId` on the `aditionals` table. All the data in the column will be lost.
  - You are about to drop the `preOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aditionals" DROP CONSTRAINT "aditionals_preOrderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "preOrders" DROP CONSTRAINT "preOrders_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "preOrders" DROP CONSTRAINT "preOrders_userId_fkey";

-- AlterTable
ALTER TABLE "aditionals" DROP COLUMN "preOrderId";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "preOrders";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
