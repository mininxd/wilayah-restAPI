/*
  Warnings:

  - You are about to drop the `wilayah_level_1_2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "wilayah_level_1_2";

-- CreateTable
CREATE TABLE "wilayah" (
    "kode" TEXT NOT NULL,
    "nama" TEXT,

    CONSTRAINT "wilayah_pkey" PRIMARY KEY ("kode")
);
