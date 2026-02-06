import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/:kodeKec', async (req, res) => {
  try {
    let kodeKec = req.params.kodeKec.trim()
    if (kodeKec.endsWith('.')) kodeKec = kodeKec.slice(0, -1)

    const distric = await prisma.wilayah.findMany({
      where: {
        kode: { startsWith: `${kodeKec}.` },
      },
      select: { kode: true, nama: true },
      orderBy: { kode: 'asc' },
    }) 

  let obj = [];
      for(let i = 0; i < distric.length; i++) {
      obj.push({
        kode: distric[i].kode,
        kode_2: distric[i].kode.replaceAll(".", ""),
        nama: distric[i].nama
      })
      }
      res.send(obj);
  } catch (e) {
    console.log('Prisma error (subdistrict):', e)
    res.status(500).send('Gagal mengambil data desa')
  }
})

export default router