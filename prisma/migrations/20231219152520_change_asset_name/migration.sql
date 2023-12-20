/*
  Warnings:

  - You are about to drop the `AssetsLabels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AssetsLabelsToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AssetsLabelsToService" DROP CONSTRAINT "_AssetsLabelsToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssetsLabelsToService" DROP CONSTRAINT "_AssetsLabelsToService_B_fkey";

-- DropTable
DROP TABLE "AssetsLabels";

-- DropTable
DROP TABLE "_AssetsLabelsToService";

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceToSubcategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_name_key" ON "Subcategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceToSubcategory_AB_unique" ON "_ServiceToSubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceToSubcategory_B_index" ON "_ServiceToSubcategory"("B");

-- AddForeignKey
ALTER TABLE "_ServiceToSubcategory" ADD CONSTRAINT "_ServiceToSubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToSubcategory" ADD CONSTRAINT "_ServiceToSubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
