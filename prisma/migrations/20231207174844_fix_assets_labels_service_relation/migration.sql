/*
  Warnings:

  - You are about to drop the column `serviceId` on the `AssetsLabels` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssetsLabels" DROP CONSTRAINT "AssetsLabels_serviceId_fkey";

-- AlterTable
ALTER TABLE "AssetsLabels" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "_AssetsLabelsToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetsLabelsToService_AB_unique" ON "_AssetsLabelsToService"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetsLabelsToService_B_index" ON "_AssetsLabelsToService"("B");

-- AddForeignKey
ALTER TABLE "_AssetsLabelsToService" ADD CONSTRAINT "_AssetsLabelsToService_A_fkey" FOREIGN KEY ("A") REFERENCES "AssetsLabels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetsLabelsToService" ADD CONSTRAINT "_AssetsLabelsToService_B_fkey" FOREIGN KEY ("B") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
