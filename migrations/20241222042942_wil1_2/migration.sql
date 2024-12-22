-- CreateTable
CREATE TABLE "wilayah_level_1_2" (
    "kode" TEXT NOT NULL,
    "nama" TEXT,
    "ibukota" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "elv" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tz" INTEGER,
    "luas" DOUBLE PRECISION,
    "penduduk" BIGINT,
    "paths" TEXT,
    "status" INTEGER,

    CONSTRAINT "wilayah_level_1_2_pkey" PRIMARY KEY ("kode")
);
