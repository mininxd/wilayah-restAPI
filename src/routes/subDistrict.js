import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/:kodeKab', async (req, res) => {
  try {
    let kodeKab = req.params.kodeKab.trim()
    if (kodeKab.endsWith('.')) kodeKab = kodeKab.slice(0, -1)

    const all = await prisma.wilayah.findMany({
      where: {
        kode: { startsWith: `${kodeKab}.` },
      },
      select: { kode: true, nama: true },
      orderBy: { kode: 'asc' },
    })

    // keep only kecamatan-level (exactly two dots)
    const subdistricts = all.filter(
      (r) => (r.kode.match(/\./g) || []).length === 2
    )

    if (subdistricts.length === 0) {
      res.status(404).send('Data kecamatan tidak ditemukan')
    } else {
      let obj = [];
      for(let i = 0; i < subdistricts.length; i++) {
      obj.push({
        kode: subdistricts[i].kode,
        kode_2: subdistricts[i].kode.replaceAll(".", ""),
        nama: subdistricts[i].nama
      })
      }
      res.send(obj);
    }
  } catch (e) {
    console.log('Prisma error (subdistrict):', e)
    res.status(500).send('Gagal mengambil data kecamatan')
  }
})

export default router