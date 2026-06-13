# Dashboard Karang Taruna Inti

Website dashboard sederhana untuk Karang Taruna Inti, Dk. Duwet Sewu, Ds. Baleasri.
Menggunakan: **Supabase** (database) + **GitHub** (penyimpanan kode) + **Netlify** (hosting).

---

## LANGKAH 1 — Isi Kunci Supabase

Buka file `config.js`, ganti baris ini:

```js
const SUPABASE_ANON_KEY = "ISI_DENGAN_ANON_PUBLIC_KEY_KAMU";
```

Ambil nilai `anon public key` dari:
**Supabase Dashboard > Settings > API > Project API keys > anon public**

---

## LANGKAH 2 — Matikan RLS (Row Level Security) sementara

Karena belum ada login, kita izinkan dulu semua orang membaca data:

1. Buka **Supabase > Table Editor**
2. Untuk setiap tabel (anggota, kas_transaksi, kegiatan, kegiatan_detail, piutang, piutang_pembayaran, pengumuman):
   - Klik tabelnya
   - Klik tombol **RLS** di kanan atas
   - Pastikan **RLS dinonaktifkan** (toggle off) — kalau aktif, data tidak akan tampil di website

> Catatan: nanti kalau sudah pakai login admin, RLS bisa diaktifkan lagi dengan aturan yang sesuai.

---

## LANGKAH 3 — Upload ke GitHub

1. Buka https://github.com, klik **New repository**
   - Nama: `karang-taruna-dashboard`
   - Pilih **Public** atau **Private**
   - Klik **Create repository**
2. Di halaman repo baru, klik **uploading an existing file**
3. Drag & drop SEMUA file di folder ini (index.html, style.css, app.js, config.js, kas.html, kas.js, kegiatan.html, kegiatan.js, piutang.html, piutang.js, anggota.html, anggota.js)
4. Klik **Commit changes**

---

## LANGKAH 4 — Deploy ke Netlify

1. Buka https://app.netlify.com
2. Klik **Add new site > Import an existing project**
3. Pilih **GitHub**, lalu pilih repo `karang-taruna-dashboard`
4. Biarkan kosong pengaturan build (karena ini website statis biasa)
5. Klik **Deploy site**
6. Tunggu beberapa menit, lalu Netlify akan memberi link seperti:
   `https://nama-acak-123.netlify.app`

Website kamu sudah online! Setiap kali kamu update file di GitHub, Netlify otomatis update website.

---

## LANGKAH 5 — Cara Mengisi Data

Untuk sekarang (belum ada form input di website), isi data lewat:
**Supabase > Table Editor > pilih tabel > Insert row**

Urutan pengisian yang disarankan:
1. `anggota` — data anggota dulu
2. `kegiatan` — buat dulu kegiatannya (misal "Halal Bihalal Ramadhan")
3. `kegiatan_detail` — isi rincian belanja, pilih `kegiatan_id` sesuai kegiatan di atas
4. `kas_transaksi` — catat transaksi kas (jenis: "masuk" atau "keluar")
5. `piutang` — pilih `anggota_id`, isi total piutang
6. `piutang_pembayaran` — isi cicilan per bulan, pilih `piutang_id`
7. `pengumuman` — isi pengumuman untuk ditampilkan di beranda

---

## Struktur Halaman

- `index.html` — Beranda (ringkasan saldo, pengumuman, kegiatan terbaru)
- `kas.html` — Buku kas lengkap dengan saldo berjalan
- `kegiatan.html` — Daftar kegiatan + rincian belanja tiap kegiatan
- `piutang.html` — Status piutang/kas terutang anggota
- `anggota.html` — Daftar anggota

---

## Langkah Selanjutnya (Opsional)

- Tambah form input langsung di website (tanpa harus buka Supabase)
- Tambah login admin untuk yang boleh edit data
- Tambah halaman galeri foto kegiatan
