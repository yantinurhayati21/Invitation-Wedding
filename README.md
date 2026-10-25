# 💍 Undangan Pernikahan Digital - The Wedding of Astri & Riyan (Mahogany Luxury Edition)

Website undangan pernikahan digital (*online wedding invitation*) bertema **Mahogany Luxury** yang hangat, estetik, dan elegan untuk **Astri Dianti & Riyan Febriana Fawzi**.

---

## 🌟 Fitur Unggulan

1. **Tema Mahogany Luxury & Editorial Modern**:
   - Palet warna kaya kayu mahoni (*deep mahogany* `#2A1410`), *terracotta*, dan kilau aksen emas (*gold foil* `#C99661`).
   - Bingkai lengkungan arsitektur modern (*Bohemian / Moroccan Arch*) bergaris ganda emas.
   - Tipografi mewah: **Cinzel**, **Pinyon Script**, dan **Cormorant Garamond**.
   - Animasi partikel debu kilau emas (*ambient golden sparkles*) yang melayang anggun di latar belakang.
   - Segel lilin emas (*wax seal*) monogram **A & R** yang berkedip halus pada cover.

2. **Cover Amplop Interaktif (Nama Tamu Dinamis)**:
   - Nama tamu otomatis menyesuaikan tautan URL, misal: `?kpd=Yanti+Nurhayati` atau `?kpd=Bapak+Budi+Sekeluarga`.
   - Tombol **"Buka Undangan"** dengan transisi lembut yang membuka kunci halaman dan langsung memutar musik latar (*background music*).

3. **Informasi Mempelai & Akad/Resepsi Lengkap**:
   - **Mempelai Wanita**: Astri Dianti (Putri pertama dari Bapak Dadi & Ibu Tati).
   - **Mempelai Pria**: Riyan Febriana Fawzi (Putra kedua dari Bapak Ayat Surdrajat & Ibu Erna Hasanah (Almh)).
   - **Akad Nikah**: Minggu, 13 Desember 2026, 08:00 WIB - Selesai di Dusun Kiaralawang RT 1/RW 2, Kec. Kawali, Kab. Ciamis.
   - **Resepsi**: Minggu, 13 Desember 2026, 11:00 WIB - Selesai di Dusun Kiaralawang RT 1/RW 2, Kec. Kawali, Kab. Ciamis.
   - Terintegrasi langsung dengan **Google Maps** dan tombol **"Simpan ke Google Calendar"**.

4. **Amplop Digital - Kartu ATM BRI Mewah**:
   - Tampilan kartu bank bertekstur mahoni gelap dengan chip emas *EMV*:
     - **Bank**: **BRI**
     - **Nomor Rekening**: `7458 0101 1891 537`
     - **Atas Nama**: **ASTRI DIANTI**
     - Tombol **"Salin Nomor Rekening BRI"** instan dengan feedback notifikasi.
   - Catatan ramah nomor rekening mempelai pria menyusul.
   - Modal pop-up alamat pengiriman kado fisik dengan tombol salin alamat.

5. **Integrasi Google Sheets (Buku Tamu Online Real-Time)**:
   - Setiap ucapan dan konfirmasi kehadiran yang dikirim oleh tamu di berbagai HP dapat **langsung otomatis tersimpan ke Google Spreadsheet Anda** dan **muncul ke semua orang**.
   - Dilengkapi file panduan siap pakai: [`google-apps-script.js`](file:///c:/Invitation-Wedding/google-apps-script.js).

---

## 📊 Cara Menyambungkan Buku Tamu ke Google Sheets (2 Menit)

1. Buka [Google Sheets](https://sheets.google.com) lalu buat Spreadsheet baru (beri judul misal: *Buku Tamu Astri & Riyan*).
2. Di menu atas, klik **Extensions (Ekstensi)** ➡️ **Apps Script**.
3. Buka file [**`google-apps-script.js`**](file:///c:/Invitation-Wedding/google-apps-script.js) di proyek ini, copy seluruh kodenya, lalu paste ke editor Google Apps Script tersebut.
4. Klik tombol **Save** (ikon disket / Ctrl + S).
5. Klik tombol **Deploy** (biru di pojok kanan atas) ➡️ **New deployment**:
   - Select type: **Web app**
   - Execute as: **Me (email Anda)**
   - Who has access: **Anyone** (*PENTING: pilih Anyone / Siapa saja*)
   - Klik **Deploy**.
6. Klik **Authorize access** ➡️ pilih akun Google Anda ➡️ klik **Advanced** ➡️ **Go to Untitled project (unsafe)** ➡️ klik **Allow**.
7. Salin **Web app URL** yang muncul (yang berakhiran `/exec`).
8. Buka file [**`script.js`**](file:///c:/Invitation-Wedding/script.js), tempelkan URL tersebut pada baris:
   ```javascript
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyxxxxxxx/exec";
   ```
Selesai! Sekarang semua tamu yang mengisi ucapan akan langsung masuk ke spreadsheet Anda dan muncul di semua perangkat tamu lain.

---

## 🧪 Menjalankan Secara Lokal

Buka terminal di folder `C:\Invitation-Wedding`:
```powershell
python -m http.server 3000
```
Lalu buka di browser:  
[http://localhost:3000/?kpd=Yanti+Nurhayati](http://localhost:3000/?kpd=Yanti+Nurhayati)

---

## 🚀 Deploy ke Vercel (Saat Anda Siap)

Proyek ini sudah dilengkapi konfigurasi `vercel.json` dan `package.json`.

```bash
git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO.git
git push -u origin main
```
Lalu sambungkan repository tersebut di dashboard [Vercel.com](https://vercel.com) untuk deploy gratis instan!
