/**
 * ==========================================================================
 * GOOGLE APPS SCRIPT - BUKU TAMU & REKAP KEHADIRAN (UNDANGAN PERNIKAHAN)
 * The Wedding of Astri & Riyan
 * ==========================================================================
 * 
 * CARA MEMASANG (HANYA 2 MENIT):
 * 1. Buka https://sheets.google.com lalu buat Spreadsheet baru.
 *    Beri judul spreadsheet, misalnya: "Buku Tamu Pernikahan Astri & Riyan".
 * 
 * 2. Di menu atas spreadsheet, klik:
 *    Extensions (Ekstensi) -> Apps Script
 * 
 * 3. Hapus semua kode default di editor Apps Script, lalu COPY & PASTE
 *    seluruh isi kode di bawah ini ke editor tersebut.
 * 
 * 4. Klik ikon Save (Simpan / Ctrl + S).
 * 
 * 5. Klik tombol "Deploy" (di pojok kanan atas) -> Pilih "New deployment" (Penerapan baru).
 *    - Pada ikon gerigi (Select type), pilih "Web app".
 *    - Description: Buku Tamu Undangan
 *    - Execute as: "Me" (email Anda)
 *    - Who has access: "Anyone" (PENTING: Pilih "Anyone" / "Siapa saja")
 *    - Klik "Deploy".
 * 
 * 6. Beri izin akses (Authorize access):
 *    - Pilih akun Google Anda.
 *    - Jika muncul peringatan "Google hasn't verified this app", klik "Advanced" (Lanjutan)
 *      lalu klik "Go to Untitled project (unsafe)".
 *    - Klik "Allow" (Izinkan).
 * 
 * 7. Salin (Copy) "Web app URL" yang muncul (berakhiran /exec).
 *    Contoh URL: https://script.google.com/macros/s/AKfycbyxxxxxxx/exec
 * 
 * 8. Buka file `script.js` di website undangan Anda, lalu tempelkan (paste)
 *    URL tersebut ke variabel `GOOGLE_SHEET_URL`.
 * 
 * Selesai! Semua ucapan otomatis tersimpan di Google Sheet Anda dan muncul di website.
 * ==========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat baris header jika spreadsheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Waktu Kirim", "Nama Tamu", "Ucapan & Doa", "Kehadiran", "Jumlah Hadir"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#F5EFEB");
    }
    
    // Parse data dari request (mendukung format JSON dan URL-encoded)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    // Format Waktu Indonesia Barat (WIB)
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    var kehadiranText = (data.kehadiran == "1" || data.kehadiran == "Hadir") ? "Hadir" : "Tidak Hadir";
    var jumlahText = kehadiranText === "Hadir" ? (data.jumlah || "1") + " Orang" : "0 Orang";
    
    // Masukkan data baru ke baris paling bawah spreadsheet
    sheet.appendRow([
      formattedDate,
      data.nama || "Tamu Undangan",
      data.ucapan || "-",
      kehadiranText,
      jumlahText
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil disimpan ke Google Sheet"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var wishes = [];
    
    // Jika ada data (baris ke-2 dst, karena baris ke-1 adalah judul kolom)
    if (rows.length > 1) {
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row[1]) { // Pastikan kolom Nama tidak kosong
          var isHadir = (String(row[3]).toLowerCase().indexOf("hadir") !== -1 && String(row[3]).toLowerCase().indexOf("tidak") === -1) || row[3] == "1";
          
          // Masukkan ke array dengan urutan terbaru di atas
          wishes.unshift({
            id: i,
            time: row[0] ? String(row[0]) : "Baru saja",
            nama: String(row[1]),
            ucapan: String(row[2]),
            kehadiran: isHadir ? "1" : "0",
            jumlah: String(row[4] || "1").replace(/[^0-9]/g, '') || "1"
          });
        }
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(wishes))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
