/*
  Warnings:

  - You are about to drop the `aditionals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aditionals" DROP CONSTRAINT "aditionals_orderId_fkey";

-- DropForeignKey
ALTER TABLE "aditionals" DROP CONSTRAINT "aditionals_serviceId_fkey";

-- DropTable
DROP TABLE "aditionals";

-- CreateTable
CREATE TABLE "additionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "serviceId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "additionals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "additionals_name_key" ON "additionals"("name");

-- AddForeignKey
ALTER TABLE "additionals" ADD CONSTRAINT "additionals_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additionals" ADD CONSTRAINT "additionals_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
