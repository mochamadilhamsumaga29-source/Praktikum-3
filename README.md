# Praktikum 3: Tabel Perkalian dan Daftar Mata Kuliah

## Deskripsi & Tujuan
Praktikum ini bertujuan untuk menerapkan konsep struktur perulangan (*loops*) dalam JavaScript untuk menghasilkan elemen HTML secara dinamis dan otomatis berdasarkan masukan angka numerik serta struktur data kompleks (*array of objects*), meliputi:
1. Menggunakan perulangan `for` untuk membentuk deret baris tabel matematika perkalian secara otomatis.
2. Menggunakan perulangan modern `for...of` untuk melakukan iterasi (*traversing*) pada kumpulan data objek (*array of objects*).
3. Melakukan manipulasi DOM dengan menyusun string HTML secara bertahap dan menampilkannya menggunakan properti `innerHTML`.
4. Mengakumulasi nilai angka secara dinamis (penghitungan total SKS pada Kartu Rencana Studi).

---

## Struktur Berkas
- **`index.html`**: Halaman antarmuka yang memuat input angka perkalian, tombol eksekusi, penampung tabel perkalian (`#tabelKali`), penampung tabel KRS (`#tabelMK`), serta paragraf total SKS (`#totalSks`).
- **`script.js`**: Berkas logika JavaScript yang menangani perulangan pembentukan tabel perkalian dan pemrosesan data mata kuliah.
- **`README.md`**: Dokumentasi praktikum berisi pembahasan kode terperinci serta jawaban atas pertanyaan analisis.

---

## Pembahasan Kode

### 1. Antarmuka dan Penataan Gaya (`index.html`)
- Menggunakan tabel standar HTML dengan gaya `border-collapse: collapse;` agar garis tabel menyatu rapi.
- Header tabel (`<th>`) diberi warna biru gelap `#1e3a8a` dengan teks putih.
- Terdapat elemen input `<input type="number" id="angka" value="7" min="1" max="20">` untuk menentukan angka perkalian yang diinginkan (rentang 1 hingga 20) dengan tombol `<button id="buat">Tampilkan</button>`.
- Dua tabel kosong: `<table id="tabelKali"></table>` dan `<table id="tabelMK"></table>`, yang seluruh isi barisnya (`<tr>`, `<td>`) akan digenerasikan murni secara dinamis oleh JavaScript.

### 2. Logika Pemrograman JavaScript (`script.js`)

#### A. Bagian A: Tabel Perkalian dengan Perulangan `for`
```javascript
// Bagian A: tabel perkalian dengan for
function buatTabelPerkalian(n) {
    let isi = "<tr><th>Operasi</th><th>Hasil</th></tr>";
    for (let i = 1; i <= 10; i++) {
        isi += `<tr><td>${n} × ${i}</td><td>${n * i}</td></tr>`;
    }
    document.getElementById("tabelKali").innerHTML = isi;
}

document.getElementById("buat").addEventListener("click", function () {
    buatTabelPerkalian(Number(document.getElementById("angka").value));
});

buatTabelPerkalian(7); // tampilan awal
```
- **Inisialisasi Header Tabel**: Variabel string `isi` diawali dengan baris judul kolom `<th>Operasi</th>` dan `<th>Hasil</th>`.
- **Perulangan `for`**:
  - `let i = 1`: Nilai awal pengali dimulai dari angka 1.
  - `i <= 10`: Batas perulangan hingga perkalian ke-10.
  - `i++`: Nilai penghitung bertambah satu pada setiap akhir putaran.
- **Penyusunan Baris Dinamis**: Pada tiap iterasi, string `isi` digabungkan (`+=`) dengan tag `<tr>` yang memuat perhitungan `${n} × ${i}` dan hasil perkalian `${n * i}` secara langsung.
- **Pembaruan DOM**: Seluruh string HTML yang telah lengkap dimasukkan ke dalam elemen tabel melalui properti `innerHTML`.

#### B. Bagian B: Array of Objects dengan Perulangan `for...of`
```javascript
// Bagian B: array of object dengan for...of
const mataKuliah = [
    { kode: "IF201", nama: "Pemrograman Web", sks: 3 },
    { kode: "IF202", nama: "Basis Data", sks: 3 },
    { kode: "IF203", nama: "Sistem Operasi", sks: 3 },
    { kode: "IF204", nama: "Statistika", sks: 2 }
];

let baris = "<tr><th>No</th><th>Kode</th><th>Mata Kuliah</th><th>SKS</th></tr>";
let total = 0;
let no = 1;

for (const mk of mataKuliah) {
    baris += `<tr><td>${no}</td><td>${mk.kode}</td><td>${mk.nama}</td><td>${mk.sks}</td></tr>`;
    total += mk.sks;
    no++;
}

document.getElementById("tabelMK").innerHTML = baris;
document.getElementById("totalSks").textContent = `Total SKS: ${total}`;
```
- **Struktur Data `Array of Objects`**:
  Setiap item dalam array `mataKuliah` merupakan objek yang merepresentasikan satu baris data dengan tiga properti: `kode`, `nama`, dan `sks`.
- **Perulangan `for (const mk of mataKuliah)`**:
  Sintaks modern ES6 untuk membaca setiap objek mata kuliah secara langsung tanpa perlu mengelola indeks array secara manual.
- **Akumulator Nilai**:
  - `total += mk.sks;`: Menjumlahkan bobot SKS setiap mata kuliah ke variabel akumulator `total`.
  - `no++`: Menaikkan nomor urut baris secara otomatis.
- **Penyajian Data**:
  Data baris tabel ditampilkan ke `#tabelMK` melalui `innerHTML`, dan total SKS ditampilkan ke elemen `#totalSks` melalui `textContent`.

---

## Jawaban dan Penjelasan Pertanyaan Analisis

### Pertanyaan 1
> **Ubah perulangan Bagian A menjadi `while`. Tuliskan kodenya.**

#### Jawaban Kode:
```javascript
function buatTabelPerkalian(n) {
    let isi = "<tr><th>Operasi</th><th>Hasil</th></tr>";
    
    // 1. Inisialisasi variabel penghitung (counter) sebelum loop
    let i = 1;

    // 2. Kondisi evaluasi batas perulangan
    while (i <= 10) {
        const hasil = n * i;
        const kelasGenap = hasil % 2 === 0 ? ' class="genap"' : '';
        isi += `<tr${kelasGenap}><td>${n} × ${i}</td><td>${hasil}</td></tr>`;
        
        // 3. Increment counter agar tidak menghasilkan infinite loop
        i++;
    }

    document.getElementById("tabelKali").innerHTML = isi;
}
```

#### Penjelasan:
- Pada perulangan `for`, inisialisasi (`let i = 1`), kondisi (`i <= 10`), dan increment (`i++`) berada dalam satu baris deklarasi header.
- Pada perulangan `while`, ketiga komponen tersebut dipisahkan:
  1. **Inisialisasi**: Dilakukan sebelum perulangan dimulai (`let i = 1;`).
  2. **Kondisi Evaluasi**: Dievaluasi pada awal setiap iterasi (`while (i <= 10)`).
  3. **Increment**: Wajib ditambahkan secara eksplisit di dalam blok perulangan (`i++;`) agar nilai `i` bertambah bertahap dan kondisi akhirnya bernilai `false`. Jika increment terlewat, akan terjadi *infinite loop* yang membuat browser macet (*freeze*).

---

### Pertanyaan 2
> **Modifikasi tabel perkalian agar baris dengan hasil genap diberi latar abu-abu.**

#### Jawaban Implementasi:
1. **Penambahan Gaya CSS pada `index.html`**:
   ```css
   .genap {
       background-color: #e2e8f0; /* Warna latar abu-abu */
   }
   ```

2. **Logika Seleksi Kondisi pada JavaScript (`script.js`)**:
   ```javascript
   for (let i = 1; i <= 10; i++) {
       const hasil = n * i;
       
       // Periksa apakah hasil merupakan bilangan genap menggunakan modulus (%)
       const kelasGenap = (hasil % 2 === 0) ? ' class="genap"' : '';
       
       isi += `<tr${kelasGenap}><td>${n} × ${i}</td><td>${hasil}</td></tr>`;
   }
   ```

#### Penjelasan:
- Menggunakan operator modulus (`%`), yaitu operator sisa hasil bagi. Suatu bilangan dikatakan genap jika habis dibagi 2 (`hasil % 2 === 0`).
- Menggunakan *ternary operator*: jika genap, disisipkan atribut `class="genap"` ke dalam elemen `<tr>`, sedangkan jika ganjil disisipkan string kosong `""`.
- Seluruh baris tabel dengan kelas `.genap` otomatis memiliki warna latar abu-abu sesuai CSS.

---

### Pertanyaan 3
> **Mengapa menambah data di array lebih baik daripada menulis baris `<tr>` satu per satu di HTML?**

#### Penjelasan:
1. **Pemisahan Logika Data dan Tampilan (*Separation of Concerns*)**:
   Array berfungsi sebagai lapisan data (*data layer*), sedangkan HTML berfungsi murni sebagai lapisan tampilan (*presentation layer*). Pengembang dapat mengelola, menambah, memfilter, atau menghapus data tanpa perlu menyentuh markup tata letak HTML.
2. **Kalkulasi dan Otomatisasi Dinamis (*Dynamic Automation*)**:
   Informasi terikat seperti penomoran urut (`no++`) dan kalkulasi agregat (seperti akumulasi `total += mk.sks`) dihitung secara otomatis dan presisi oleh program. Jika ditulis manual satu per satu di HTML, setiap perubahan data mengharuskan nomor urut dan total SKS dihitung ulang secara manual, yang sangat rentan kesalahan (*human error*).
3. **Skalabilitas dan Pemeliharaan (*Scalability & Maintainability*)**:
   Jika data bertambah dari 4 mata kuliah menjadi ratusan data, kode perulangan JavaScript yang digunakan tetap sama tanpa perlu baris kode tambahan. Pola ini sesuai dengan arsitektur pengembangan web modern, di mana data biasanya diambil secara dinamis dari API server/database (format JSON) dan dirender ke halaman secara otomatis.
4. **Penerapan Prinsip DRY (*Don't Repeat Yourself*)**:
   Mencegah penulisan tag-tag HTML berulang secara redundan (`<tr>`, `<td>`), sehingga ukuran berkas kode jauh lebih ringkas, rapi, dan mudah dirawat.
