import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const provinsi = await prisma.wilayah.findMany({
      where: {
        NOT: { kode: { contains: '.' } }
      },
      select: {
        kode: true,
        nama: true
      },
      orderBy: {
        kode: 'asc'
      }
    })
    res.send({
  status: "success",
  available_endpoints: {
    kabupaten: "/kab/:kodeProvinsi",
    kecamatan: "/kec/:kodeKabupaten",
    desa: "/desa/:kodeKecamatan"
  },
  data: provinsi 
});

  } catch (e) {
    console.log("Prisma error:", e)
    res.status(500).send("Gagal mengambil data provinsi")
  }
})

export default router