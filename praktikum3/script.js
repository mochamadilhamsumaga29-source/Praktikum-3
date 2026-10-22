
 // Bagian A: Tabel perkalian dengan for
function buatTabelperkalian(n) {
    let isi = "<tr><th>Operasi</th><th>Hasil</th></tr>";

    let i = 1;
    while (i <= 10) {
        isi += `<tr><td>${n} x ${i}</td><td>${n * i}</td></tr>`;
        i++;
    }

    document.getElementById("tabelkali").innerHTML = isi;
}
document.getElementById("buat").addEventListener("click", function () {
    buatTabelperkalian(Number(document.getElementById("angka").value));
})
buatTabelperkalian(7)

// Bagian B: Array of object dengan for...of
const mataKuliah = [
    { kode: "IF201", nama: "Pemrograman Web", sks: 3 },
    { kode: "IF202", nama: "Basis Data", sks: 3 },
    { kode: "IF203", nama: "Sistem Operasi", sks: 3 },
    { kode: "IF204", nama: "Statistika", sks: 2 },
    { kode: "IF205", nama: "DKV", sks: 3 },
    { kode: "IF206", nama: "Mtk Distrik", sks: 2 }
];

let baris = "<tr><th>No</th><th>Kode</th><th>Mata Kuliah</th><th>SKS</th></tr>";
let total = 0;
let no = 1;

for (const mk of mataKuliah) {
    baris += `<tr><td>${no}</td><td>${mk.kode}</td>
        <td>${mk.nama}</td><td>${mk.sks}</td></tr>`;
    total += mk.sks;
    no++;
}

document.getElementById("tabelMK").innerHTML = baris;
document.getElementById("totalSks").textContent = `Total SKS: ${total}`;