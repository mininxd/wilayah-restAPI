import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/:query', async (req, res) => {
  const { query } = req.params;

  if (!query) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing search query',
    });
  }

  try {
    const desa = await prisma.wilayah.findMany({
      where: {
        nama: {
          contains: query,
          mode: 'insensitive',
        },
        kode: {
          contains: '.',
        },
      },
      orderBy: {
        kode: 'asc',
      },
      take: 25,
    });

    const validDesa = desa.filter((d) => d.kode.split('.').length === 4);

    if (validDesa.length === 0) {
      return res.json([]);
    }

    const parentCodes = new Set();
    validDesa.forEach((d) => {
      const [kodeProv, kodeKab, kodeKec] = d.kode.split('.');
      parentCodes.add(kodeProv);
      parentCodes.add(`${kodeProv}.${kodeKab}`);
      parentCodes.add(`${kodeProv}.${kodeKab}.${kodeKec}`);
    });

    const parents = await prisma.wilayah.findMany({
      where: {
        kode: {
          in: Array.from(parentCodes),
        },
      },
    });

    const parentMap = new Map(parents.map((p) => [p.kode, p.nama]));

    const results = validDesa.map((d) => {
      const [kodeProv, kodeKab, kodeKec] = d.kode.split('.');
      const provNama = parentMap.get(kodeProv) || '';
      const kabNama = parentMap.get(`${kodeProv}.${kodeKab}`) || '';
      const kecNama = parentMap.get(`${kodeProv}.${kodeKab}.${kodeKec}`) || '';

      return {
        kode: d.kode,
        kode_2: d.kode.replace(/\./g, ''),
        nama: `${provNama}, ${kabNama}, ${kecNama}, ${d.nama}`,
        provinsi: provNama,
        kota: kabNama,
        kecamatan: kecNama,
        desa: d.nama,
      };
    });

    res.json(results);
  } catch (e) {
    console.log('Prisma error:', e);
    res.status(500).send('Gagal mengambil data');
  }
});

export default router;
