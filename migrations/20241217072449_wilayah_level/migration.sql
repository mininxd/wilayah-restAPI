-- CreateTable
CREATE TABLE "wilayah_level_1_2" (
    "kode" TEXT NOT NULL,
    "nama" TEXT,
    "ibukota" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "elv" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "tz" INTEGER,
    "path" TEXT,
    "status" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "wilayah_level_1_2_kode_key" ON "wilayah_level_1_2"("kode");
