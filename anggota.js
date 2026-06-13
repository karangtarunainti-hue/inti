async function loadAnggota() {
  const tbody = document.getElementById("anggota-table-body");

  const { data, error } = await supabase
    .from("anggota")
    .select("*")
    .order("nama", { ascending: true });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="4">Gagal memuat: ${error.message}</td></tr>`;
    return;
  }

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Belum ada data anggota.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(a => `
    <tr>
      <td>${a.nama ?? ""}</td>
      <td>${a.jabatan ?? "-"}</td>
      <td>${a.no_hp ?? "-"}</td>
      <td>${a.alamat ?? "-"}</td>
    </tr>
  `).join("");
}

loadAnggota();
