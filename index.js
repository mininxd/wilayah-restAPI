import express from 'express';
import coordinates from './coordinates.js';
const app = express();
app.use(express.json());
app.use('/koordinat', coordinates);

import axios from 'axios';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', (req, res) => {
res.send({
'info':'data sesuai permendagri tahun 2019',
'/:nama_wilayah':'mendapatkan kode wilayah (Kecamatan & Desa)',
'/adm2/:nama_wilayah':'mendapatkan kode wilayah (Provinsi & Kabupaten)',
'/kode/:kode_wilayah':'mendapatkan nama wilayah',
'/lokasi':'Mendapatkan info lokasi lengkap (adm1, adm2, adm3, adm4, prov, kab, kec, desa, lat, long, timezone)',
'/koordinat':'Mendapatkan informasi koordinat administrasi level 2 meliputi (kode, nama, ibukota, lat, long, elv, tz, luas, path)'
	})
})
app.get('/lokasi', async (req, res) => {
  res.send({
    "/:nama_wilayah":"pakailah nama desa atau kode adm4 untuk lebih akurat"
  })
});

app.get('/:wilayah', async (req, res) => {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { 
        nama: req.params.wilayah,
      },
      select: {
        kode: true,
        nama: true,
      }
    });

    if (wilayah && wilayah.length > 0) {
      res.send(wilayah[0].kode);
    } else {
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    res.send("Data tidak ditemukan");
  }
});
app.get('/adm2/:wilayah', async (req, res) => {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { 
        nama: req.params.wilayah.toUpperCase(),
      },
      select: {
        kode: true,
        nama: true,
      }
    });

    if (wilayah && wilayah.length > 0) {
      res.send(wilayah[0].kode);
    } else {
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    res.send("Data tidak ditemukan");
  }
});

app.get('/lokasi/:wilayah', async (req, res) => {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { 
        OR: [
          {nama: req.params.wilayah},
          {kode: req.params.wilayah},
      ]
      },
      select: {
        kode: true,
        nama: true,
      }
    });

    if (wilayah && wilayah.length > 0) {
      let {data} = await axios.get(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${wilayah[0].kode}`);
      res.send(data.lokasi)
    } else {
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    res.send("Data tidak ditemukan");
  }
});
app.get('/kode/:kode', async (req, res) => {
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
      res.send(wilayah[0].nama);
    } else {
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    res.send("Data tidak ditemukan");
  }
});


app.listen(3000, () => {
 console.log(`server running :3000`);
});
