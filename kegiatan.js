function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

async function loadKegiatan() {
  const container = document.getElementById("kegiatan-container");

  const { data: kegiatanList, error } = await supabase
    .from("kegiatan")
    .select("*")
    .order("tanggal", { ascending: false });

  if (error) {
    container.innerHTML = `Gagal memuat: ${error.message}`;
    return;
  }

  if (!kegiatanList || kegiatanList.length === 0) {
    container.innerHTML = "Belum ada kegiatan.";
    return;
  }

  let html = "";

  for (const keg of kegiatanList) {
    const { data: details } = await supabase
      .from("kegiatan_detail")
      .select("*")
      .eq("kegiatan_id", keg.id);

    let total = 0;
    let rowsHtml = "";

    (details || []).forEach((d) => {
      total += Number(d.jumlah || 0);
      rowsHtml += `
        <tr>
          <td>${d.keterangan ?? ""}</td>
          <td class="text-right">${d.qty ?? ""}</td>
          <td class="text-right">${formatRupiah(d.harga_satuan)}</td>
          <td class="text-right">${formatRupiah(d.jumlah)}</td>
        </tr>
      `;
    });

    html += `
      <section>
        <h2>${keg.kode ? keg.kode + " - " : ""}${keg.nama_kegiatan}</h2>
        <p class="date">${keg.tanggal ?? ""}</p>
        ${
          rowsHtml
            ? `<table>
                <thead>
                  <tr>
                    <th>Keterangan</th>
                    <th class="text-right">QTY</th>
                    <th class="text-right">Harga Satuan</th>
                    <th class="text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
                <tfoot>
                  <tr>
                    <th colspan="3" class="text-right">Total Pengeluaran</th>
                    <th class="text-right">${formatRupiah(total)}</th>
                  </tr>
                </tfoot>
              </table>`
            : `<p>Belum ada rincian belanja.</p>`
        }
      </section>
    `;
  }

  container.innerHTML = html;
}

loadKegiatan();
