import express from 'express';
const app = express();
app.use(express.json());
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


app.get('/', (req, res) => {
res.send({
'/:nama_wilayah':'mendapatkan kode wilayah',
'/kode/:kode_wilayah':'mendapatkan nama wilayah'
	})
})

app.get('/:wilayah', async (req, res) => {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { 
        nama: req.params.wilayah,
      },
      select: {
        kode: true,
        nama: true,
      },
    });

    if (wilayah && wilayah.length > 0) {
      res.send(wilayah[0].kode);
    } else {
      res.send("Data tidak ditemukan");
    }
  } catch (e) {
    res.send(e + "err");
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
    res.send(e + "err");
  }
});


app.listen(3000, () => {
 console.log(`server running :3000`);
});