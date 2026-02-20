# Setup Supabase untuk RemoteTeamHub Admin Panel

## Langkah-langkah Setup

### 1. Buat Project Supabase
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Buat project baru atau gunakan project yang sudah ada
3. Catat **Project URL** dan **anon/public key**

### 2. Setup Environment Variables
Tambahkan ke file `.env` atau `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Jalankan SQL Schema
1. Buka Supabase Dashboard → SQL Editor
2. Copy seluruh isi file `supabase-schema.sql`
3. Paste dan jalankan di SQL Editor
4. Pastikan semua tabel berhasil dibuat

### 4. Setup Authentication (Opsional)
Untuk menggunakan Supabase Auth:

1. Buka Authentication → Users di Supabase Dashboard
2. Buat user admin baru dengan email `admin@remote.com`
3. Set password sesuai kebutuhan
4. Atau gunakan authentication method lain (Google, GitHub, dll)

**Catatan:** Sistem akan fallback ke local authentication (`admin@remote.com` / `admin123`) jika Supabase Auth tidak tersedia.

### 5. Migrasi Data dari localStorage (Opsional)
Jika Anda sudah punya data di localStorage dan ingin memigrasinya ke Supabase:

1. Buka browser console di aplikasi
2. Jalankan script berikut untuk export data:
```javascript
const data = localStorage.getItem('remoteTeamHub_admin_store');
console.log(JSON.parse(data));
```

3. Copy data tersebut dan gunakan untuk insert manual ke Supabase, atau buat script migrasi.

### 6. Verifikasi Setup
1. Restart development server
2. Login ke admin panel (`/admin/login`)
3. Cek apakah data sudah ter-load dari Supabase
4. Coba tambah/edit/hapus data untuk memastikan sync berjalan

## Struktur Database

Database terdiri dari tabel-tabel berikut:
- `landing` - Konten hero section dan CTA
- `talents` - Data talent
- `jobs` - Lowongan pekerjaan
- `categories` - Kategori talent
- `blogs` - Artikel blog
- `faqs` - FAQ
- `about` - Konten halaman About
- `pricing` - Paket pricing
- `contacts` - Informasi kontak
- `testimonials` - Testimoni
- `benefits` - Benefit/keuntungan
- `steps` - Langkah-langkah (How it works)
- `careers` - Informasi karir

## Row Level Security (RLS)

Saat ini RLS diaktifkan dengan policy:
- **Public Read**: Semua orang bisa membaca data (untuk website frontend)
- **Admin Write**: Hanya admin yang bisa menulis (akan menggunakan service role atau auth check)

**Untuk Production:**
- Gunakan Supabase Auth dengan proper user roles
- Setup RLS policies yang lebih ketat
- Jangan expose service role key di client-side

## Troubleshooting

### Data tidak ter-load dari Supabase
- Pastikan environment variables sudah di-set dengan benar
- Cek console browser untuk error
- Pastikan SQL schema sudah dijalankan
- Cek apakah Supabase project masih aktif

### Error saat save data
- Cek RLS policies di Supabase
- Pastikan menggunakan service role key untuk admin operations (atau setup auth dengan benar)
- Cek console untuk error detail

### Fallback ke localStorage
- Sistem akan otomatis fallback ke localStorage jika Supabase tidak tersedia
- Data akan tetap tersimpan di localStorage sebagai backup
- Setelah Supabase tersedia, data akan otomatis di-load dari Supabase

## Catatan Penting

1. **Development**: Sistem menggunakan anon key untuk development. Untuk production, gunakan service role key dengan hati-hati atau setup proper authentication.

2. **Data Sync**: Data akan otomatis sync ke Supabase setiap kali ada perubahan. localStorage tetap digunakan sebagai backup.

3. **Initial Load**: Saat pertama kali aplikasi dibuka, data akan di-load dari Supabase. Jika tidak ada data di Supabase, akan menggunakan data default dari `initialState`.

4. **Offline Support**: Sistem akan fallback ke localStorage jika Supabase tidak tersedia, sehingga aplikasi tetap bisa digunakan offline (dengan keterbatasan).
