function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

async function loadKas() {
  const { data, error } = await supabase
    .from("kas_transaksi")
    .select("*")
    .order("tanggal", { ascending: true });

  const tbody = document.getElementById("kas-table-body");

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5">Gagal memuat data: ${error.message}</td></tr>`;
    return;
  }

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">Belum ada transaksi.</td></tr>`;
    return;
  }

  let saldo = 0;
  let rows = "";

  data.forEach((row) => {
    const debet = row.jenis === "masuk" ? Number(row.jumlah) : 0;
    const kredit = row.jenis === "keluar" ? Number(row.jumlah) : 0;
    saldo += debet - kredit;

    rows += `
      <tr>
        <td>${row.tanggal ?? ""}</td>
        <td>${row.keterangan ?? ""}</td>
        <td class="text-right text-green">${debet ? formatRupiah(debet) : ""}</td>
        <td class="text-right text-red">${kredit ? formatRupiah(kredit) : ""}</td>
        <td class="text-right"><strong>${formatRupiah(saldo)}</strong></td>
      </tr>
    `;
  });

  tbody.innerHTML = rows;
}

loadKas();
