# Evi Samira Jakarta Timur — Website Lokal

Website statis responsif untuk tahap desain/review lokal. Tidak memerlukan Node.js maupun hosting.

## Menjalankan secara lokal

### Cara tercepat — tanpa server

Buka file `index.html` dengan browser (klik dua kali file tersebut atau pilih **Open With → Chrome/Safari**). Seluruh navigasi dan formulir tetap berjalan karena website ini tidak bergantung pada backend.

### Dengan localhost

Klik dua kali `START-WEBSITE.command` di Finder. Jika macOS menampilkan peringatan keamanan, pilih file tersebut lewat klik kanan lalu **Open**.

Atau, di Terminal pada folder proyek, jalankan perintah berikut (Ruby tersedia bawaan pada macOS):

```bash
ruby server.rb
```

Kemudian buka `http://localhost:4173` pada browser.

Apabila port `4173` sudah dipakai, jalankan pada port lain, misalnya:

```bash
PORT=4174 ruby server.rb
```

Untuk menghentikan server, tekan `Ctrl+C` di terminal yang menjalankannya.

## Struktur proyek

- `index.html` — kerangka aplikasi
- `styles.css` — desain responsif, warna, dan layout
- `data.js` — konfigurasi brand, WhatsApp, data paket, artikel, FAQ, dan testimoni
- `app.js` — komponen halaman, navigasi, CTA WhatsApp, serta form minat
- `server.rb` — server lokal sederhana (bind ke `127.0.0.1` saja)

## Data resmi

Semua paket dan jadwal pada versi ini diberi penanda **contoh/dummy** dan belum terhubung ke Samira Travel. Perbarui objek `packages` pada `data.js`, atau gantikan sumber tersebut dengan integrasi API resmi ketika tersedia.

## Logo

Logo resmi yang diberikan pengguna digunakan sebagai aset lokal pada `assets/samira-logo.png` dan sudah tampil di header serta footer.
