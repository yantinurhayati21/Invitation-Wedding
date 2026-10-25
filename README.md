# 💍 Undangan Pernikahan Digital - The Wedding of Rian & Evi

Website undangan pernikahan online (digital wedding invitation) yang elegan, modern, dan responsif. Didesain terinspirasi dari template **Indoinvite (Pandora Classic)** dengan palet warna rose gold / champagne hangat, animasi floral bergoyang, audio background, galeri foto lightbox, amplop digital, countdown, serta sistem RSVP & ucapan langsung.

---

## ✨ Fitur Utama

1. **Cover Amplop Interaktif (Buka Undangan)**:
   - Dilengkapi ornamen floral di sudut-sudut dengan animasi mengayun lembut (*swaying leaves*).
   - Menampilkan nama tamu undangan secara otomatis dari link URL parameter (misal: `?kpd=Yanti+Nurhayati` atau `?to=Nama+Tamu`).
   - Tombol **"Buka Undangan"** yang membuka kunci halaman secara halus dan otomatis memutar musik latar (*background music*).

2. **Countdown Timer & Simpan ke Kalender**:
   - Hitung mundur live waktu (Hari, Jam, Menit, Detik) menuju hari H pernikahan.
   - Tombol **"Save To Calendar"** yang langsung menghubungkan ke Google Calendar dengan detail acara yang sudah terisi otomatis.

3. **Kutipan Suci Al-Qur'an**:
   - Surah Ar-Rum ayat 21 dalam tulisan kaligrafi Arab yang indah, terjemahan bahasa Indonesia, dan kartu kaca transparan (*frosted glass*).

4. **Profil Mempelai (Bride & Groom)**:
   - Foto mempelai pria dan wanita dalam bingkai lingkaran emas floral dekoratif.
   - Informasi lengkap nama, orang tua, dan alamat asal kedua mempelai.
   - Tautan langsung ke profil Instagram kedua mempelai.

5. **Rangkaian Acara (Save The Date)**:
   - Kartu acara Resepsi Pernikahan dan Ngunduh Mantu lengkap dengan tanggal, jam, dan lokasi.
   - Tombol **"Maps Lokasi Acara"** terintegrasi ke Google Maps.

6. **Galeri Foto (Our Gallery)**:
   - Tampilan foto grid responsif.
   - Dilengkapi fitur **Lightbox Zoom Modal** saat foto diklik untuk melihat dalam ukuran penuh (*fullscreen*).

7. **Buku Tamu & Konfirmasi Kehadiran (RSVP)**:
   - Formulir konfirmasi kehadiran (Hadir / Tidak Hadir) dan jumlah tamu yang datang.
   - Kotak ucapan dan doa restu.
   - Menyimpan ucapan secara real-time ke *LocalStorage*, sehingga ucapan baru langsung muncul di bagian atas buku tamu.
   - Sudah terisi *seed data* ucapan asli dari sahabat dan keluarga.

8. **Notifikasi Toast Mengambang (Floating Toast Wishes)**:
   - Setiap beberapa detik, ucapan selamat dari tamu akan muncul secara otomatis di sudut kiri bawah layar layaknya di Indoinvite asli.

9. **Titip Hadiah & Kado Digital (Cashless)**:
   - Nomor rekening / e-wallet DANA untuk kedua mempelai.
   - Tombol **"Salin Nomor"** dengan feedback animasi "Tersalin!".
   - Fitur **"Kirim Kado Fisik"** yang menampilkan modal alamat pengiriman lengkap beserta tombol salin alamat dan konfirmasi WhatsApp.

10. **Sticky Bottom Navigation & Pemutar Musik**:
    - Navigasi melayang di bawah layar untuk berpindah cepat ke Beranda, Mempelai, Acara, Galeri, dan Ucapan.
    - Tombol kontrol audio dengan ikon piringan hitam (*vinyl disc*) yang berputar saat musik diputar dan berhenti saat dijeda.

---

## 🚀 Cara Menjalankan Secara Lokal

Anda tidak memerlukan server khusus. Karena dibuat murni dengan **HTML5, CSS3, dan Vanilla JavaScript**, Anda cukup:
1. Buka file `index.html` langsung di browser Anda (Google Chrome, Edge, Safari, Firefox), ATAU
2. Jika menggunakan VS Code, klik kanan `index.html` lalu pilih **Open with Live Server**, ATAU
3. Jalankan server lokal sederhana lewat terminal:
   ```bash
   npx serve .
   ```
   Lalu buka URL `http://localhost:3000` di browser.

### Menguji Nama Tamu Undangan
Cukup tambahkan query `?kpd=` di belakang URL:
```
http://localhost:3000/?kpd=Yanti+Nurhayati
http://localhost:3000/?kpd=Bapak+Budi+Sekeluarga
```

---

## 🌐 Cara Deploy ke Vercel (Gratis & Cepat)

Proyek ini sudah dilengkapi dengan file `vercel.json` dan `package.json` sehingga dapat langsung dideploy ke Vercel tanpa konfigurasi tambahan apa pun.

### Opsi 1: Lewat GitHub (Sangat Disarankan)
1. Buat repository baru di akun GitHub Anda (misal: `undangan-rian-evi`).
2. Masukkan file proyek ini ke dalam git repository Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit wedding invitation"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/undangan-rian-evi.git
   git push -u origin main
   ```
3. Buka situs [Vercel.com](https://vercel.com) dan login/daftar.
4. Klik tombol **"Add New..."** -> **"Project"**.
5. Pilih repository GitHub Anda, lalu klik **"Deploy"**.
6. Dalam hitungan detik (~15-30 detik), website undangan Anda sudah aktif dengan domain gratis seperti:
   `https://undangan-rian-evi.vercel.app`

### Opsi 2: Lewat Vercel CLI (Langsung dari Terminal)
1. Buka PowerShell atau Terminal di direktori proyek ini (`c:\Invitation-Wedding`).
2. Jalankan perintah:
   ```bash
   npx vercel
   ```
3. Ikuti petunjuk singkat di layar (tekan Enter untuk pilihan default).
4. Untuk deploy ke production:
   ```bash
   npx vercel --prod
   ```

---

## 🎨 Cara Kustomisasi Data Acara

Semua data pernikahan dapat Anda sesuaikan dengan mudah:

| Elemen | Lokasi Pengubahan |
| :--- | :--- |
| **Nama Mempelai & Judul** | Buka `index.html`, cari teks `Evi & Rian` atau `The Wedding of Rian & Evi`. |
| **Tanggal & Jam Acara** | Buka `index.html` (bagian `#acara`) dan `script.js` (pada fungsi `initCountdownTimer`). |
| **Nomor Rekening / DANA** | Buka `index.html` di bagian `#hadiah` dan ganti nomor `081224714665` atau `081322756820`. |
| **Alamat Pengiriman Kado** | Buka `index.html` di modal `#kadoModal` (cari teks `#fullAddress`). |
| **Lagu / Musik Latar** | Buka `index.html`, ganti tag `<source src="...">` pada elemen `<audio id="weddingMusic">` dengan tautan file audio MP3/MP4 pilihan Anda. |
| **Foto-foto Galeri & Sampul** | Ganti URL gambar pada tag `<img>` atau `style="background-image: url(...)"` di `index.html`. |

---

## 📄 Lisensi
Hak Cipta &copy; 2025. Dibuat dengan cinta untuk pernikahan Rian & Evi. Bebas digunakan dan dimodifikasi.
