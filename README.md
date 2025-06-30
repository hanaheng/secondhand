# SecondRead - Marketplace Buku Preloved

## Setup Environment Variables

Untuk menjalankan aplikasi ini dengan database Supabase yang sebenarnya, Anda perlu menambahkan environment variables berikut:

### 1. Buat file `.env.local` di root project:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 2. Dapatkan credentials dari Supabase:

1. Buka [supabase.com](https://supabase.com)
2. Buat project baru atau gunakan yang sudah ada
3. Pergi ke Settings > API
4. Copy `Project URL` dan `anon/public key`

### 3. Jalankan SQL scripts:

Jalankan file SQL berikut di Supabase SQL Editor:
- `scripts/create-tables.sql` - Membuat tabel database
- `scripts/seed-data.sql` - Menambahkan data sample

### 4. Setup Storage (Opsional):

Untuk upload gambar, buat bucket di Supabase Storage:
1. Pergi ke Storage di dashboard Supabase
2. Buat bucket bernama `book-images`
3. Set bucket sebagai public

## Mode Preview (v0)

Aplikasi ini dirancang untuk berjalan dalam mode offline di lingkungan preview v0. 
Pesan "[Supabase] ... running in offline mode" adalah normal dan tidak mempengaruhi 
fungsionalitas UI dalam preview.

## Deployment

Untuk deploy ke production:
1. Deploy ke Vercel/Netlify
2. Tambahkan environment variables di dashboard hosting
3. Aplikasi akan otomatis menggunakan database Supabase yang sebenarnya
