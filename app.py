
import os
from flask import Flask, render_template, flash, redirect, url_for # pyright: ignore[reportMissingImports]
from forms import KontakForm, MahasiswaForm

app = Flask(__name__)

# Konfigurasi Flask-WTF dan CSRF
app.config["SECRET_KEY"] = os.environ.get(
    "SECRET_KEY",
    "dev-secret-key-ganti-untuk-production"
)

# DATA MAHASISWA
mahasiswa = [
    {
        "nama": "Moch Satria Firmansyah",
        "nbi": "1482300028",
        "prodi": "Sistem dan Teknologi Informasi",
        "ipk": 3.65
    },
    {
        "nama": "Andi Pratama",
        "nbi": "1482300029",
        "prodi": "Sistem dan Teknologi Informasi",
        "ipk": 3.70
    },
    {
        "nama": "Budi Santoso",
        "nbi": "1482300030",
        "prodi": "Sistem dan Teknologi Informasi",
        "ipk": 3.45
    },
    {
        "nama": "Citra Amelia",
        "nbi": "1482300031",
        "prodi": "Sistem dan Teknologi Informasi",
        "ipk": 3.80
    },
    {
        "nama": "Dina Putri",
        "nbi": "1482300032",
        "prodi": "Sistem dan Teknologi Informasi",
        "ipk": 3.55
    }
]

total_mata_kuliah = 4

# Penyimpanan sementara pesan kontak
pesan_kontak = []


# HALAMAN PROFILE + FORM KONTAK
@app.route("/", methods=["GET", "POST"])
def index():
    kontak_form = KontakForm()

    if kontak_form.validate_on_submit():
        pesan_kontak.append({
            "nama": kontak_form.nama.data,
            "email": kontak_form.email.data,
            "pesan": kontak_form.pesan.data
        })

        flash("Pesan berhasil dikirim!", "success")
        return redirect(url_for("index"))

    return render_template(
        "profile.html",
        kontak_form=kontak_form
    )


# HALAMAN DASHBOARD + FORM TAMBAH MAHASISWA
@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    form = MahasiswaForm()

    if form.validate_on_submit():
        nbi = form.nbi.data.strip()

        # Cek apakah NBI sudah terdaftar
        if any(mhs["nbi"] == nbi for mhs in mahasiswa):
            form.nbi.errors.append("NBI sudah terdaftar")
        else:
            mahasiswa.append({
                "nama": form.nama.data.strip(),
                "nbi": nbi,
                "prodi": form.prodi.data.strip(),
                "ipk": form.ipk.data
            })

            flash("Data mahasiswa berhasil ditambahkan!", "success")
            return redirect(url_for("dashboard"))

    total_mahasiswa = len(mahasiswa)

    rata_rata_ipk = (
        sum(mhs["ipk"] for mhs in mahasiswa)
        / total_mahasiswa
    )

    return render_template(
        "dashboard.html",
        mahasiswa=mahasiswa,
        total_mahasiswa=total_mahasiswa,
        total_mata_kuliah=total_mata_kuliah,
        rata_rata_ipk=round(rata_rata_ipk, 2),
        form=form
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
