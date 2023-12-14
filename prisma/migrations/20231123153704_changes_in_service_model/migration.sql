/*
  Warnings:

  - The `image` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[],
ALTER COLUMN "description" SET DEFAULT 'No hay descripción';
