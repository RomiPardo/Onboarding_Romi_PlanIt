-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('PRESENT', 'CATERING', 'MERCHANDISING', 'EVENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "image" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "points" INTEGER NOT NULL DEFAULT 0,
    "serviceId" TEXT,
    "contactNumber" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'No se ha ingresado una descripción',
    "price" INTEGER NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aditionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "serviceId" TEXT,

    CONSTRAINT "aditionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "providers_name_key" ON "providers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aditionals_name_key" ON "aditionals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceToUser_AB_unique" ON "_ServiceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceToUser_B_index" ON "_ServiceToUser"("B");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aditionals" ADD CONSTRAINT "aditionals_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToUser" ADD CONSTRAINT "_ServiceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToUser" ADD CONSTRAINT "_ServiceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
