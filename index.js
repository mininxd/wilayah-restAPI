import express from 'express';
const app = express();
app.use(express.json());
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


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
      res.send("No data found");
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
      res.send("No data found");
    }
  } catch (e) {
    res.send(e + "err");
  }
});


app.listen(3000, () => {
 console.log(`server running :3000`);
});
