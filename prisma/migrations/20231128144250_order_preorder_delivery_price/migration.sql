-- AlterTable
ALTER TABLE "aditionals" ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "preOrderId" TEXT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "deliveryPrice" INTEGER NOT NULL DEFAULT 100;

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "creditCardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "rut" TEXT,
    "socialReason" TEXT,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "direction" TEXT NOT NULL,
    "sorprise" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "logo" TEXT,
    "tryAgain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preOrders" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "preOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_number_key" ON "cards"("number");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aditionals" ADD CONSTRAINT "aditionals_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aditionals" ADD CONSTRAINT "aditionals_preOrderId_fkey" FOREIGN KEY ("preOrderId") REFERENCES "preOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preOrders" ADD CONSTRAINT "preOrders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preOrders" ADD CONSTRAINT "preOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
