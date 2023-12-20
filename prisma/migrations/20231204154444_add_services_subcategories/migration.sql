-- CreateTable
CREATE TABLE "AssetsLabels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceId" TEXT,

    CONSTRAINT "AssetsLabels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssetsLabels_name_key" ON "AssetsLabels"("name");

-- AddForeignKey
ALTER TABLE "AssetsLabels" ADD CONSTRAINT "AssetsLabels_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
