function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

async function loadPiutang() {
  const tbody = document.getElementById("piutang-table-body");

  const { data: piutangList, error } = await supabase
    .from("piutang")
    .select("*, anggota(nama)");

  if (error) {
    tbody.innerHTML = `<tr><td colspan="4">Gagal memuat: ${error.message}</td></tr>`;
    return;
  }

  if (!piutangList || piutangList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Belum ada data piutang.</td></tr>`;
    return;
  }

  let rows = "";

  for (const p of piutangList) {
    const { data: bayarList } = await supabase
      .from("piutang_pembayaran")
      .select("jumlah_bayar")
      .eq("piutang_id", p.id);

    const totalBayar = (bayarList || []).reduce(
      (sum, b) => sum + Number(b.jumlah_bayar || 0),
      0
    );
    const sisa = Number(p.total_piutang) - totalBayar;

    rows += `
      <tr>
        <td>${p.anggota?.nama ?? "(Tanpa nama)"}</td>
        <td class="text-right">${formatRupiah(p.total_piutang)}</td>
        <td class="text-right text-green">${formatRupiah(totalBayar)}</td>
        <td class="text-right ${sisa > 0 ? "text-red" : ""}">${formatRupiah(sisa)}</td>
      </tr>
    `;
  }

  tbody.innerHTML = rows;
}

loadPiutang();
