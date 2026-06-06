# Vogueir Fashion - E-Commerce Landing Page

Vogueir adalah platform landing page fashion modern yang elegan dan responsif, dirancang untuk memberikan pengalaman berbelanja kelas premium. Proyek ini menonjolkan estetika minimalis dengan animasi yang halus untuk meningkatkan interaksi pengguna.

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi mutakhir dalam ekosistem pengembangan web:

*   **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
*   **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animasi:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) & ScrollTrigger untuk interaksi scroll yang dinamis.
*   **Animasi UI:** [Framer Motion](https://www.framer.com/motion/) untuk transisi komponen dan gesture.
*   **Autentikasi:** [Better Auth](https://www.better-auth.com/) untuk manajemen login dan registrasi pengguna.
*   **Font:** Google Fonts (Playfair Display untuk heading dan Inter untuk body).

## ✨ Fitur Utama

1.  **Landing Page Dinamis:** Hero section yang menarik, kategori produk, koleksi terbaru, dan testimoni brand.
2.  **Sistem Animasi:** Penggunaan GSAP untuk efek *fade-up*, staggering pada grid produk, dan transisi halus antar elemen saat di-scroll.
3.  **Panel Autentikasi Modern:** UI Login & Sign Up yang menyatu dalam satu panel sliding dengan transisi visual yang canggih.
4.  **Halaman Koleksi & About:** Layout bento dan grid yang menampilkan visi brand dan katalog koleksi secara profesional.
5.  **Halaman Kontak & FAQ:** Formulir kontak fungsional (simulasi) dan sistem FAQ berbasis akordeon.
6.  **Responsif:** Dioptimalkan sepenuhnya untuk perangkat mobile, tablet, dan desktop.

## 📂 Struktur Folder

*   `/app`: Berisi rute utama aplikasi (Landing, About, Collection, Contact).
*   `/components`: Komponen UI yang dapat digunakan kembali (Navbar, AuthPanel, Footer).
*   `/hooks`: Hook kustom seperti `useGsapAnimations` untuk mengelola logika GSAP.
*   `/lib`: Konfigurasi library pihak ketiga (seperti `auth-client.ts`).
*   `/public`: Aset statis seperti gambar dan logo.

## 🛠️ Cara Penggunaan

### 1. Clone Repositori
```bash
git clone https://github.com/username/fashion-commerce-landing-page.git
cd fashion-commerce-landing-page
```

### 2. Instalasi Dependensi
Pastikan Anda sudah menginstal Node.js. Kemudian jalankan:
```bash
npm install
# atau
yarn install
```

### 3. Pengaturan Environment
Buat file `.env.local` di root folder dan tambahkan konfigurasi yang diperlukan untuk Better Auth (jika ada database yang dihubungkan).

### 4. Jalankan Server Pengembangan
```bash
npm run dev
# atau
yarn dev
```
Buka http://localhost:3000 di browser Anda untuk melihat hasilnya.

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

## 🎨 Kustomisasi

*   **Warna & Tema:** Anda dapat mengubah palet warna utama di `tailwind.config.ts` atau langsung pada style inline di file `page.tsx`.
*   **Data Produk:** Data produk saat ini bersifat statis di dalam file halaman. Anda bisa memindahkannya ke headless CMS atau API di masa mendatang.

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan portofolio.

---
Dibuat dengan ❤️ oleh [Nama Anda/Vogueir Team]