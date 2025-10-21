import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/:kodeProv', async (req, res) => {
  try {
    let kodeProv = req.params.kodeProv.trim()
    if (kodeProv.endsWith('.')) kodeProv = kodeProv.slice(0, -1)

    const all = await prisma.wilayah.findMany({
      where: {
        kode: { startsWith: `${kodeProv}.` },
      },
      select: { kode: true, nama: true },
      orderBy: { kode: 'asc' },
    })

    // keep only codes with one dot (e.g. "30.01", "30.71")
    const regencies = all.filter(
      (r) => (r.kode.match(/\./g) || []).length === 1
    )

    if (regencies.length === 0) {
      res.status(404).send('Data kabupaten/kota tidak ditemukan')
    } else {
      res.send(regencies)
    }
  } catch (e) {
    console.log('Prisma error (regency):', e)
    res.status(500).send('Gagal mengambil data kabupaten/kota')
  }
})

export default router