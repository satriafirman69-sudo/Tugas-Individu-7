
from flask_wtf import FlaskForm # pyright: ignore[reportMissingImports]

from wtforms import ( # pyright: ignore[reportMissingModuleSource]
    StringField,
    TextAreaField,
    FloatField,
    SubmitField
)

from wtforms.validators import ( # pyright: ignore[reportMissingModuleSource]
    DataRequired,
    Email,
    Length,
    NumberRange
)


# FORM KONTAK
class KontakForm(FlaskForm):

    nama = StringField(
        "Nama",
        validators=[
            DataRequired(message="Nama wajib diisi"),
            Length(
                min=3,
                max=50,
                message="Nama harus 3-50 karakter"
            )
        ]
    )

    email = StringField(
        "Email",
        validators=[
            DataRequired(message="Email wajib diisi"),
            Email(message="Format email tidak valid")
        ]
    )

    pesan = TextAreaField(
        "Pesan",
        validators=[
            DataRequired(message="Pesan wajib diisi"),
            Length(
                min=10,
                max=500,
                message="Pesan harus 10-500 karakter"
            )
        ]
    )

    submit = SubmitField("Kirim Pesan")


# FORM TAMBAH MAHASISWA
class MahasiswaForm(FlaskForm):

    nama = StringField(
        "Nama Mahasiswa",
        validators=[
            DataRequired(message="Nama wajib diisi"),
            Length(
                min=3,
                max=50,
                message="Nama harus 3-50 karakter"
            )
        ]
    )

    nbi = StringField(
        "NBI",
        validators=[
            DataRequired(message="NBI wajib diisi"),
            Length(
                min=10,
                max=10,
                message="NBI harus 10 karakter"
            )
        ]
    )

    prodi = StringField(
        "Program Studi",
        validators=[
            DataRequired(message="Program studi wajib diisi")
        ]
    )

    ipk = FloatField(
        "IPK",
        validators=[
            DataRequired(message="IPK wajib diisi"),
            NumberRange(
                min=0,
                max=4,
                message="IPK harus antara 0 sampai 4"
            )
        ]
    )

    submit = SubmitField("Tambah Mahasiswa")
