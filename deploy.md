# Deploy
untuk kamu yang advanced users, dan mempunyai atau butuh request banyak, disarankan untuk mendeploy restAPI sendiri, karena restAPI ini bisa kena limit.


metode untuk mendeploy restAPI ini diperlukan [Supabase](https://supabase.com), [Vercel](https://vercel.app), dan untuk ORMnya saya pakai [Prisma](https://www.prisma.io)


saya pakai supabase karena bisa import file csv, yang ada di folder `/db/base.csv` Source:[kodewilayah/permendagri-72-2019](https://github.com/kodewilayah/permendagri-72-2019/blob/main/dist/base.csv)

### Setup Supabase
Buatlah database lalu membuat tabel dengan berikut :
|kode (VARCHAR primaryKey)|nama (VARCHAR)|
|-------------------------|--------------|

Setelah tabelnya jadi,
upload `base.csv` ke table tersebut

### Setup Prisma.Client
bagian setup prisma ini cukup edit `.env` saja yang sudah saya sediakan pada .env.example,
untuk mendapatkan DATABASE_URL dan DIRECT_URL kamu bisa cari di Supabase, pada tombol `Connect` diatas tabel

### Tips
kalau kamu mau git push jangan di ikutkan file `.env`nya, walau file pada repository sudah dihapus jejaknya masih tetinggal pada commit terakhir, karena kamu tidak perlu file `.env` pada github, karena variable ini bisa kamu taruh di vercel nantinya,

setelah kamu deploy ke vercel, atur bagian variablesnya pada menu settings, nah disini kamu bisa upload file `.env` tersebut, nyalakan `"sensitive"` saat upload, biar data kamu aman


<hr>

_Saya ngetik ini lebih capek daripada ngodingnya_ xD
