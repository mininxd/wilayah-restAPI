import express from 'express';
import coordinates from './src/routes/coordinates.js';
import province from './src/routes/province.js';
import regency from './src/routes/regency.js';
import subDistrict from './src/routes/subDistrict.js';
import distric from './src/routes/distric.js';
const app = express();
app.use(express.json());
app.use('/koordinat', coordinates);
app.use('/prov', province);
app.use('/kab', regency);
app.use('/kec', subDistrict);
app.use('/des', distric);
app.use('/desa', distric);

import axios from 'axios';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send({
    'info':'data sesuai permendagri tahun 2019',
    '/kode/:kode_wilayah':'mendapatkan nama wilayah',
    '/koordinat':'Mendapatkan informasi koordinat administrasi level 2 meliputi (kode, nama, ibukota, lat, long, elv, tz, luas, path)'
  })
})

app.get('/:kode', async (req, res) => {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { 
        kode: req.params.kode,
      },
      select: {
        kode: true,
        nama: true,
      },
    });

    if (wilayah && wilayah.length > 0) {
      console.log(wilayah[0].nama);
      res.send(wilayah[0].nama);
    } else {
      console.log(wilayah[0].nama);
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    console.log(e);
    res.send("Data tidak ditemukan");
  }
});

app.listen(3000, () => {
  console.log(`server running :3000`);
});