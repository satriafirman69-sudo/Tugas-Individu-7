// ==========================================
// TUGAS INDIVIDU 2
// DOM DAN WEBSITE INTERAKTIF
// ==========================================


// ==========================================
// 1. ARRAY OF OBJECT
// ==========================================

let dataNilai = [
    {
        no: 1,
        mataKuliah: "Pengembang Berbasis Web",
        nilai: "A",
        bobot: 4.00
    },
    {
        no: 2,
        mataKuliah: "Manajemen Keamanan Siber",
        nilai: "B+",
        bobot: 3.50
    },
    {
        no: 3,
        mataKuliah: "Sistem Enterprise",
        nilai: "A-",
        bobot: 3.75
    },
    {
        no: 4,
        mataKuliah: "Manajemen Sistem Informasi",
        nilai: "B",
        bobot: 3.00
    }
];


// ==========================================
// 2. OBJECT BOBOT NILAI
// ==========================================

const bobotNilai = {
    "A": 4.00,
    "A-": 3.75,
    "B+": 3.50,
    "B": 3.00,
    "B-": 2.75,
    "C+": 2.50,
    "C": 2.00,
    "D": 1.00,
    "E": 0.00
};


// ==========================================
// 3. MENGAMBIL ELEMEN HTML
// ==========================================

const tbodyNilai = document.getElementById("data-nilai");
const inputCari = document.getElementById("cari-nilai");
const formNilai = document.getElementById("form-nilai");
const inputNama = document.getElementById("nama-mk");
const inputNilai = document.getElementById("nilai-mk");
const pesanForm = document.getElementById("pesan-form");
const rataRata = document.getElementById("rata-rata");


// ==========================================
// 4. FUNCTION MENGHITUNG RATA-RATA
// ==========================================

function hitungRataRata() {
    if (dataNilai.length === 0) {
        return 0;
    }

    const total = dataNilai.reduce(function(jumlah, data) {
        return jumlah + data.bobot;
    }, 0);

    return total / dataNilai.length;
}


// ==========================================
// 5. MENAMPILKAN RATA-RATA
// ==========================================

function tampilkanRataRata() {
    const hasil = hitungRataRata();
    rataRata.textContent = hasil.toFixed(2);
}


// ==========================================
// 6. FUNCTION MENAMPILKAN DATA DENGAN DOM (createElement)
// ==========================================

function tampilkanData(data) {
    // Menghapus isi tabel sebelumnya
    tbodyNilai.replaceChildren();

    // Jika data kosong
    if (data.length === 0) {
        const baris = document.createElement("tr");
        const kolom = document.createElement("td");
        kolom.colSpan = 4;
        kolom.textContent = "Data tidak ditemukan.";
        kolom.classList.add("text-center");
        baris.appendChild(kolom);
        tbodyNilai.appendChild(baris);
        return;
    }

    // Menampilkan data array ke tabel
    data.forEach(function(item, index) {
        const baris = document.createElement("tr");

        const kolomNo = document.createElement("td");
        kolomNo.textContent = index + 1;

        const kolomNama = document.createElement("td");
        kolomNama.textContent = item.mataKuliah;

        const kolomNilai = document.createElement("td");
        kolomNilai.textContent = item.nilai;

        const kolomAksi = document.createElement("td");
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.type = "button";
        tombolHapus.classList.add("btn", "btn-danger", "btn-sm");

        // Event listener tombol hapus
        tombolHapus.addEventListener("click", function() {
            hapusData(item.no);
        });

        kolomAksi.appendChild(tombolHapus);

        baris.appendChild(kolomNo);
        baris.appendChild(kolomNama);
        baris.appendChild(kolomNilai);
        baris.appendChild(kolomAksi);

        tbodyNilai.appendChild(baris);
    });
}


// ==========================================
// 7. FUNCTION FILTER DATA
// ==========================================

function filterData(kataKunci) {
    const kata = kataKunci.toLowerCase().trim();
    return dataNilai.filter(function(item) {
        return (
            item.mataKuliah.toLowerCase().includes(kata) ||
            item.nilai.toLowerCase().includes(kata)
        );
    });
}


// ==========================================
// 8. EVENT INTERAKSI 1: PENCARIAN DATA
// ==========================================

inputCari.addEventListener("input", function() {
    const kataKunci = inputCari.value;
    const hasilPencarian = filterData(kataKunci);
    tampilkanData(hasilPencarian);
});


// ==========================================
// 9. EVENT INTERAKSI 2 (FITUR JQUERY): 
// TOGGLE TABEL DENGAN EFEK SLIDE ANIMASI
// ==========================================

$(document).ready(function() {
    $("#tombol-tabel").on("click", function() {
        // Menggunakan slideToggle khas jQuery untuk efek animasi
        $("#container-tabel").slideToggle(300, function() {
            const tersembunyi = $(this).is(":hidden");
            if (tersembunyi) {
                $("#tombol-tabel").text("Tampilkan Tabel Nilai");
            } else {
                $("#tombol-tabel").text("Sembunyikan Tabel Nilai");
            }
        });
    });

    // EVENT INTERAKSI 3 (FITUR JQUERY): TOGGLE DETAIL PROFIL
    $("#tombol-profil").on("click", function() {
        $("#detail-profil").toggleClass("d-none").slideDown(300);
        const tersembunyi = $("#detail-profil").hasClass("d-none");
        if (tersembunyi) {
            $("#tombol-profil").text("Lihat Detail Profil");
        } else {
            $("#tombol-profil").text("Sembunyikan Detail Profil");
        }
    });
});


// ==========================================
// 10. FUNCTION MENAMPILKAN PESAN FORM
// ==========================================

function tampilkanPesan(pesan, berhasil) {
    pesanForm.textContent = pesan;
    pesanForm.classList.remove("text-success", "text-danger");

    if (berhasil) {
        pesanForm.classList.add("text-success");
    } else {
        pesanForm.classList.add("text-danger");
    }
}


// ==========================================
// 11. EVENT INTERAKSI 4: FORM & VALIDASI
// ==========================================

formNilai.addEventListener("submit", function(event) {
    // Mencegah reload halaman
    event.preventDefault();

    const nama = inputNama.value.trim();
    const nilai = inputNilai.value;

    inputNama.classList.remove("is-invalid");
    inputNilai.classList.remove("is-invalid");

    // VALIDASI NAMA
    if (nama.length < 3) {
        inputNama.classList.add("is-invalid");
        tampilkanPesan("Nama mata kuliah minimal 3 karakter.", false);
        inputNama.focus();
        return;
    }

    // VALIDASI NILAI
    if (!Object.prototype.hasOwnProperty.call(bobotNilai, nilai)) {
        inputNilai.classList.add("is-invalid");
        tampilkanPesan("Silakan pilih nilai mata kuliah.", false);
        inputNilai.focus();
        return;
    }

    // VALIDASI DUPLIKAT
    const sudahAda = dataNilai.some(function(item) {
        return item.mataKuliah.toLowerCase() === nama.toLowerCase();
    });

    if (sudahAda) {
        inputNama.classList.add("is-invalid");
        tampilkanPesan("Mata kuliah sudah terdaftar.", false);
        inputNama.focus();
        return;
    }

    // MEMBUAT OBJECT BARU
    const nomorBaru = dataNilai.reduce(function(terbesar, item) {
        return Math.max(terbesar, item.no);
    }, 0) + 1;

    const dataBaru = {
        no: nomorBaru,
        mataKuliah: nama,
        nilai: nilai,
        bobot: bobotNilai[nilai]
    };

    dataNilai.push(dataBaru);

    // REFRESH TABEL & RATA-RATA
    inputCari.value = "";
    tampilkanData(dataNilai);
    tampilkanRataRata();

    formNilai.reset();
    tampilkanPesan("Data mata kuliah berhasil ditambahkan!", true);
});


// ==========================================
// 12. EVENT INTERAKSI 5: HAPUS DATA
// ==========================================

function hapusData(nomor) {
    const dataDihapus = dataNilai.find(function(item) {
        return item.no === nomor;
    });

    if (!dataDihapus) return;

    const konfirmasi = confirm(
        "Apakah Anda yakin ingin menghapus " + dataDihapus.mataKuliah + "?"
    );

    if (!konfirmasi) return;

    dataNilai = dataNilai.filter(function(item) {
        return item.no !== nomor;
    });

    tampilkanData(filterData(inputCari.value));
    tampilkanRataRata();
    tampilkanPesan("Data mata kuliah berhasil dihapus.", true);
}


// ==========================================
// 13. MENAMPILKAN DATA AWAL
// ==========================================

tampilkanData(dataNilai);
tampilkanRataRata();
console.log("Website berhasil dijalankan!");