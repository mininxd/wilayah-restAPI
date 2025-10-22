import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/:kodeKec', async (req, res) => {
  try {
    let kodeKec = req.params.kodeKec.trim()

    // remove trailing dot, if any
    if (kodeKec.endsWith('.')) kodeKec = kodeKec.slice(0, -1)

    // get all wilayah starting with this kabupaten code
    const all = await prisma.wilayah.findMany({
      where: {
        kode: { startsWith: `${kodeKec}.` },
      },
      select: { kode: true, nama: true },
      orderBy: { kode: 'asc' },
    }) 

    // keep only kecamatan-level (exactly two dots)
    const distric = all;

  res.send(all)
  } catch (e) {
    console.log('Prisma error (subdistrict):', e)
    res.status(500).send('Gagal mengambil data desa')
  }
})

export default router