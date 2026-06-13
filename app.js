// Format angka jadi Rupiah
function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

// ====== RINGKASAN KAS ======
async function loadRingkasanKas() {
  const { data, error } = await supabase
    .from("kas_transaksi")
    .select("jenis, jumlah");

  if (error) {
    console.error(error);
    return;
  }

  let totalMasuk = 0;
  let totalKeluar = 0;

  data.forEach((row) => {
    if (row.jenis === "masuk") totalMasuk += Number(row.jumlah);
    if (row.jenis === "keluar") totalKeluar += Number(row.jumlah);
  });

  const saldo = totalMasuk - totalKeluar;

  document.getElementById("total-masuk").textContent = formatRupiah(totalMasuk);
  document.getElementById("total-keluar").textContent = formatRupiah(totalKeluar);
  document.getElementById("saldo-akhir").textContent = formatRupiah(saldo);
}

// ====== PENGUMUMAN ======
async function loadPengumuman() {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .order("tanggal", { ascending: false })
    .limit(5);

  const container = document.getElementById("pengumuman-list");

  if (error) {
    container.textContent = "Gagal memuat pengumuman.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    container.textContent = "Belum ada pengumuman.";
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="item">
      <h4>${item.judul}</h4>
      <p class="date">${item.tanggal ?? ""}</p>
      <p>${item.isi ?? ""}</p>
    </div>
  `).join("");
}

// ====== KEGIATAN ======
async function loadKegiatan() {
  const { data, error } = await supabase
    .from("kegiatan")
    .select("*")
    .order("tanggal", { ascending: false })
    .limit(5);

  const container = document.getElementById("kegiatan-list");

  if (error) {
    container.textContent = "Gagal memuat kegiatan.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    container.textContent = "Belum ada kegiatan.";
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="item">
      <h4>${item.kode ? item.kode + " - " : ""}${item.nama_kegiatan}</h4>
      <p class="date">${item.tanggal ?? ""}</p>
    </div>
  `).join("");
}

// Jalankan semua saat halaman dimuat
loadRingkasanKas();
loadPengumuman();
loadKegiatan();
