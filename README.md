# Portfolio Personal - Puteri Najma Azzahra

Website portfolio personal modern dan elegan bertema **Dark Obsidian Mode** dengan perpaduan aksen **Bright Pink (`#ff5fac`)** dan **Warm Gold (`#d8ac6a`)**, dibangun menggunakan **React 19, TypeScript, Vite, dan Tailwind CSS**.

Portofolio ini disusun secara lengkap dan akurat berlandaskan Curriculum Vitae (CV) resmi milik **Puteri Najma Azzahra**.

---

## 🌟 Fitur Unggulan

1. **Atmosfer & Animasi Visual**:
   - Background hitam gelap (`#07070a`) dengan grid aksen modern.
   - **Floating Glowing Orbs**: 4 orb bercahaya gradasi pink & gold yang melayang dinamis dengan CSS keyframe animation.
   - **Rising Ambient Particles**: Partikel bercahaya emas & pink yang naik perlahan di atas canvas HTML5 60fps.
2. **Floating Navbar Tengah Atas**:
   - Posisi melayang `fixed top-4 md:top-6 left-1/2 -translate-x-1/2`.
   - Efek kaca blur (*glassmorphism*) dipadu bayangan cahaya neon pink terang (`shadow-nav-glow`).
   - Tautan navigasi aktif (*scroll spy*), tombol aksi cepat *"Let's Connect"*, dan menu mobile yang responsif.
3. **Hero Section dengan Dynamic Typewriter**:
   - Nama besar **PUTERI NAJMA AZZAHRA**.
   - Efek mengetik bergantian secara dinamis:
     - *"Business Enthusiast"*
     - *"Aspiring Entrepreneur"*
     - *"Digital Marketing Analyst"*
     - *"Strategic Thinker"*
   - Tombol CTA bercahaya pink (*Explore Portfolio*) & gold (*Get in Touch*).
   - Chip kredensial resmi Google Certified.
4. **About Me Section**:
   - Foto profil profesional dengan animated *shimmer border*.
   - Profil profesional sesuai CV: fokus pada Business Intelligence, AI, dan Stakeholder Management.
   - Timeline **Riwayat Pendidikan**:
     - SMAN 14 Jakarta (Tahun Lulus: 2025)
     - SMP Al Masoem Bandung (Tahun Lulus: 2022)
     - SDN Kramat Jati 24 Jakarta (Tahun Lulus: 2019)
   - Timeline **Pengalaman & Kegiatan**:
     - Pembawa Acara & Pembicara | Kegiatan Sosialisasi Sekolah (Tingkat SMP, Jakarta Timur)
     - Sekretaris | Tim Basket Putri (Administrasi, perizinan, & operasional tim)
     - Peserta | Kegiatan Kesenian (Lomba Paduan Suara)
   - **Statistik Interaktif (Count-Up Animation)** saat masuk ke viewport.
5. **Portfolio Section (3 Tab Interaktif)**:
   - **Projects**: Studi kasus implementasi BI Dashboard, AI Workflow Automation, Stakeholder RACI Matrix, dan Public Speaking Roadshow (dilengkapi modal pop-up detail).
   - **Certificates**:
     - Google Business Intelligence Professional Certificate (Google / Coursera - Juli 2026)
     - Google AI Professional Certificate (Google / Coursera - Juni 2026)
     - Google Stakeholder Management Specialization (Google / Coursera - Juni 2026)
   - **Tools & Skill**:
     - Keahlian Bisnis & Data (BI, Data Modeling, Dashboard, RACI)
     - Keahlian Teknologi AI (AI Fundamentals, AI for Data Analysis, AI Prompting, App Building)
     - Komunikasi & Interpersonal (Komunikasi Bisnis, Public Speaking, Negosiasi, Perizinan)
     - Soft Skills (Team Leadership, Disiplin, Manajemen Waktu, Problem Solving, Adaptabilitas)
     - Perangkat Lunak / Sistem: SAP (Systems, Applications, and Products)
6. **Section Kontak & Footer**:
   - Kontak langsung: Telepon/WhatsApp (`0812-9765-8009`), Email (`puterinajma41@gmail.com`), Instagram (`@puteryna_`), dan Lokasi (Jakarta, Indonesia).
   - Formulir pesan interaktif dengan efek perayaan **Confetti** dan notifikasi Toast mengambang.

---

## 📁 Struktur Direktori Lengkap Proyek

```
d:\PUY\
├── .gitignore               # Konfigurasi ignore file git
├── index.html               # Entry point HTML dengan Google Fonts
├── package.json             # Dependensi React, Vite, Tailwind, Lucide, Confetti
├── postcss.config.js        # Konfigurasi PostCSS untuk Tailwind
├── tailwind.config.js       # Konfigurasi warna tema, glow, & font Tailwind
├── tsconfig.json            # Root TypeScript config
├── tsconfig.app.json        # TypeScript config untuk aplikasi client
├── tsconfig.node.json       # TypeScript config untuk Vite node runner
├── vite.config.ts           # Konfigurasi Vite bundler
├── README.md                # Dokumentasi proyek
└── src/
    ├── App.tsx              # Komponen utama penyusun halaman
    ├── main.tsx             # Entry point bootstrap React 19
    ├── index.css            # Styling custom Tailwind & animasi CSS keyframe
    ├── data/
    │   └── portfolioData.ts # Sumber data terstruktur dari CV Puteri Najma Azzahra
    └── components/
        ├── BackgroundEffects.tsx # Animasi partikel canvas naik & glowing orbs
        ├── Navbar.tsx            # Floating navbar tengah atas dengan pink glow
        ├── Hero.tsx              # Hero section & dynamic typewriter
        ├── About.tsx             # Profil, pendidikan, pengalaman, count-up stats
        ├── Portfolio.tsx         # Tab switcher (Projects, Certificates, Skills)
        ├── ProjectModal.tsx      # Modal popup detail studi kasus
        ├── Contact.tsx           # Form kontak, detail WA/Email/IG, & confetti
        └── Footer.tsx            # Footer elegan
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 2. Menjalankan Server Development Lokal
Untuk menjalankan server lokal dengan fitur Hot Module Replacement (HMR):
```bash
npm run dev
```
Buka URL lokal yang muncul di terminal (biasanya `http://localhost:5173`) pada browser Anda.

### 3. Membangun Versi Produksi (Production Build)
Untuk melakukan kompilasi dan optimasi bundle:
```bash
npm run build
```
Hasil build siap rilis akan tersimpan di dalam direktori `dist/`.

### 4. Pratinjau Build Produksi
Untuk melihat pratinjau hasil build:
```bash
npm run preview
```
