import { Router } from 'express';
const router = Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


router.get('/', (req, res) => {
  res.send({"/:kode":"kode adm2"})
})
router.get('/:kode', async (req, res) => {
  const admDots = (str) => (str.match(/\./g) || []).length;
  if(admDots(req.params.kode) === 1) {
try {
  const koordinat = await prisma.wilayah_level_1_2.findMany({
      where: { 
        kode: req.params.kode,
      },
      select: {
  kode: true,
  nama: true,
  ibukota: true,
  lat: true,
  lng: true,
  elv: true,
  tz: true,
  luas: true,
  penduduk: true,
  paths: true,
  status: true
      }
    });
  res.send({
    kode: koordinat[0].kode,
    nama: koordinat[0].nama,
    ibukota: koordinat[0].ibukota,
    lat: koordinat[0].lat,
    lon: koordinat[0].lng,
    elv: koordinat[0].elv,
    tz: koordinat[0].tz,
    luas: koordinat[0].luas,
    path: koordinat[0].paths,
    });
} catch(e) {
  res.send(e)
}
} else {
  res.send("Data tidak ditemukan")
}
});

export default router;
