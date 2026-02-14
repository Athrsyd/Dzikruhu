 # Dzikruhu - Aplikasi Muslim
      
      ![Muslim App](https://img.shields.io/badge/Muslim%20App-Islamic%20Application-green)
      ![React](https://img.shields.io/badge/React-19.2.0-blue)
      ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
      
      **Dzikruhu** adalah aplikasi Muslim berbasis web yang dirancang khusus untuk perangkat mobile. Aplikasi ini menyediakan berbagai fitur islami seperti Al-Quran digital, jadwal sholat, doa-doa harian, tasbih digital, dan berita islami.
      
      ## 🚀 Fitur Utama
      
      - 📖 **Al-Quran Digital** - Baca Al-Quran lengkap 30 Juz dengan terjemahan
      - 🕌 **Jadwal Sholat** - Jadwal waktu sholat berdasarkan lokasi di Indonesia
      - 🤲 **Doa-doa Harian** - Kumpulan doa-doa pilihan untuk kehidupan sehari-hari
      - 📿 **Tasbih Digital** - Counter dzikir digital
      - 📰 **Berita Islami** - Berita dan artikel tentang Islam
      - ⚙️ **Pengaturan** - Kustomisasi aplikasi sesuai kebutuhan
      
      ## 📦 Teknologi yang Digunakan
      
      | Teknologi | Versi | Fungsi |
      |-----------|-------|--------|
      | **React** | 19.2.0 | Library JavaScript untuk membangun user interface aplikasi |
      | **Vite** | 7.2.4 | Build tool modern untuk development dan bundling aplikasi |
      | **React Router DOM** | 7.12.0 | Library untuk routing dan navigasi antar halaman |
      | **Axios** | 1.13.2 | HTTP client untuk melakukan request ke API |
      | **Tailwind CSS** | 4.1.18 | Framework CSS utility-first untuk styling |
      | **Lucide React** | 0.562.0 | Library ikon modern dan ringan |
      | **React Icons** | 5.5.0 | Library koleksi ikon populer untuk React |
      | **React Loading Skeleton** | 3.5.0 | Library untuk membuat loading skeleton UI |
      | **Vercel Analytics** | 1.6.1 | Analytics untuk monitoring performa aplikasi |
      | **ESLint** | 9.39.1 | Linter untuk menjaga kualitas dan konsistensi kode |
      
      ## 🌐 Sumber API yang Digunakan
      
      | Nama API | URL | Fungsi |
      |----------|-----|--------|
      | **Equran API - Al-Quran** | `https://equran.id/api/v2/surat` | Menyediakan data Al-Quran lengkap dengan terjemahan bahasa Indonesia |
      | **Equran API - Jadwal Sholat** | `https://equran.id/api/v2/shalat` | Menyediakan data jadwal waktu sholat berdasarkan provinsi dan kabupaten/kota di Indonesia |
      | **Equran API - Doa** | `https://equran.id/api/doa` | Menyediakan kumpulan doa-doa pilihan dalam bahasa Arab dan terjemahan |
      | **Artikel Islam API** | `https://artikel-islam.netlify.app/.netlify/functions/api/kj` | Menyediakan berita dan artikel islami terkini |
      
      ## 💻 Cara Menjalankan Aplikasi
      
      ### Prasyarat
      
      Pastikan Anda telah menginstal:
      - **Node.js** (versi 18 atau lebih baru) - [Download Node.js](https://nodejs.org/)
      - **npm** atau **yarn** (package manager)
      
      ### Langkah-langkah Instalasi
      
      1. **Clone repository ini**
         ```bash
         git clone https://github.com/Athrsyd/Dzikruhu.git
         cd Dzikruhu
         ```
      
      2. **Install dependencies**
         ```bash
         npm install
         ```
         atau jika menggunakan yarn:
         ```bash
         yarn install
         ```
      
      3. **Jalankan aplikasi dalam mode development**
         ```bash
         npm run dev
         ```
         atau:
         ```bash
         yarn dev
         ```
      
      4. **Buka aplikasi di browser**
         - Aplikasi akan berjalan di `http://localhost:5173`
         - **Penting:** Buka aplikasi menggunakan mode responsive/mobile di browser atau gunakan perangkat mobile, karena aplikasi ini dioptimalkan untuk layar mobile (lebar maksimal 850px)
      
      ### Build untuk Production
      
      Untuk membuat build production-ready:
      
      ```bash
      npm run build
      ```
      
      File hasil build akan tersimpan di folder `dist/`
      
      ### Preview Build Production
      
      Untuk preview hasil build production:
      
      ```bash
      npm run preview
      ```
      
      ### Lint Kode
      
      Untuk memeriksa kualitas kode dengan ESLint:
      
      ```bash
      npm run lint
      ```
      
      ## 📱 Catatan Penting
      
      - **Aplikasi ini dioptimalkan untuk perangkat mobile** dengan lebar layar maksimal 850px
      - Jika dibuka di desktop/laptop, aplikasi akan menampilkan pesan bahwa aplikasi hanya dapat digunakan di perangkat mobile
      - Untuk testing di desktop, gunakan mode responsive di browser developer tools (F12)
      
      ## 🚀 Deployment
      
      Aplikasi ini dikonfigurasi untuk deployment di **Vercel** dengan konfigurasi yang sudah tersedia di `vercel.json`.
      
      ### Deploy ke Vercel
      
      1. Install Vercel CLI:
         ```bash
         npm install -g vercel
         ```
      
      2. Deploy:
         ```bash
         vercel
         ```
      
      Atau bisa langsung deploy melalui GitHub dengan menghubungkan repository ke Vercel dashboard.
      
      ## 📄 Lisensi
      
      Proyek ini dibuat oleh **Athrsyd**.
      
      ## 🤝 Kontribusi
      
      Kontribusi, issues, dan feature requests sangat diterima!
      
      ---
      
      **Dzikruhu** - Muslim App by Athrsyd 🌙
    old_str: |
      # React + Vite
      
      This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
      
      Currently, two official plugins are available:
      
      - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
      - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
      
      ## React Compiler
      
      The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
      
      ## Expanding the ESLint configuration
      
      If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
