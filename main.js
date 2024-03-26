let barang = [];
let sisaUang = 0;

function tambahBarang() {
    const namaBarang = document.getElementById('itemName').value;
    const hargaBarang = parseFloat(document.getElementById('itemPrice').value);

    if (namaBarang && !isNaN(hargaBarang) && hargaBarang > 0) {
    barang.push({ nama: namaBarang, harga: hargaBarang });
    tampilkanBarang();
    hitungTotal();
    updateSisaUang();
    bersihkanInput();
    } else {
    alert('Mohon masukkan nama barang dan harga yang valid.');
    }
}

function tampilkanBarang() {
    const tabelBody = document.querySelector('#daftarBelanja tbody');
    tabelBody.innerHTML = '';

    barang.forEach((item, index) => {
    const baris = tabelBody.insertRow();
    const sel1 = baris.insertCell(0);
    const sel2 = baris.insertCell(1);
    const sel3 = baris.insertCell(2);

    sel1.textContent = item.nama;
    sel2.textContent = `Rp ${formatRupiah(item.harga)}`;
    sel3.innerHTML = `<button onclick="hapusBarang(${index})">Hapus</button>`;
    });
}

function hapusBarang(index) {
    barang.splice(index, 1);
    tampilkanBarang();
    hitungTotal();
    updateSisaUang();
}

function hitungTotal() {
    const totalElement = document.getElementById('total');
    const totalLabel = document.getElementById('totalLabel');
    const total = barang.reduce((sum, item) => sum + item.harga, 0);

    if (total > 0) {
    totalLabel.style.display = 'block';
    totalElement.textContent = `Rp ${formatRupiah(total)}`;
  } else {
    totalLabel.style.display = 'none';
  }

  return total;
}

function updateSisaUang() {
  const totalUang = parseFloat(document.getElementById('totalUang').value);
  const totalLabel = document.getElementById('totalLabel');

  if (!isNaN(totalUang) && totalUang >= 0) {
    sisaUang = totalUang - hitungTotal();
    // Tidak ada elemen "Remaining" yang akan ditampilkan
  }
}

function bersihkanInput() {
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
}

function bayar() {
  const totalUangElement = document.getElementById('totalUang');
  const totalLabel = document.getElementById('totalLabel');

  const totalUang = parseFloat(totalUangElement.value);

  if (!isNaN(totalUang) && totalUang >= 0) {
    const totalBelanja = hitungTotal();

    if (totalUang >= totalBelanja) {
      // Hitung sisa kembalian dari totalBelanja dan totalUang
      sisaUang = totalUang - totalBelanja;

      // Hapus semua barang setelah pembayaran selesai
      barang = [];
      tampilkanBarang();

      // Hapus nilai dari input Total Uang setelah pembayaran
      totalUangElement.value = '';

      // Sembunyikan total setelah pembayaran
      totalLabel.style.display = 'none';

      // Tampilkan alert dengan ucapan terima kasih dan sisa kembalian (jika ada)
      let pesanKembalian = sisaUang > 0 ? ` Sisa kembalian: Rp ${formatRupiah(sisaUang)}` : '';
      alert(`Terima kasih telah berbelanja!${pesanKembalian}`);
    } else {
      alert('Duit pembayaran kurang. Mohon masukkan uang yang cukup.');
    }
  } else {
    // Tampilkan pesan kesalahan jika input Total Uang tidak valid
    alert('Input tidak valid');
  }
}

function formatRupiah(angka) {
  var reverse = angka.toString().split('').reverse().join('');
  var ribuan = reverse.match(/\d{1,3}/g);
  var formatted = ribuan.join('.').split('').reverse().join('');
  return formatted;
}