-- Supabase Database Schema untuk RemoteTeamHub Admin Panel
-- Jalankan script ini di Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: landing (untuk hero section dan CTA)
CREATE TABLE IF NOT EXISTS landing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_image TEXT DEFAULT '',
  cta_text TEXT NOT NULL,
  cta_title TEXT,
  cta_subtitle TEXT,
  cta_button_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: talents
CREATE TABLE IF NOT EXISTS talents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  foto TEXT,
  skill TEXT[] DEFAULT '{}',
  kategori TEXT NOT NULL,
  lokasi TEXT NOT NULL,
  rate TEXT NOT NULL,
  deskripsi TEXT,
  kontak TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: jobs
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  posisi TEXT NOT NULL,
  perusahaan TEXT NOT NULL,
  lokasi TEXT NOT NULL,
  tipe_kerja TEXT NOT NULL,
  gaji TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  icon TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  harga TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: blogs
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul TEXT NOT NULL,
  thumbnail TEXT,
  konten TEXT NOT NULL,
  author TEXT NOT NULL,
  tanggal TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: faqs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pertanyaan TEXT NOT NULL,
  jawaban TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: about
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  visi TEXT NOT NULL,
  misi TEXT NOT NULL,
  values JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: pricing
CREATE TABLE IF NOT EXISTS pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_paket TEXT NOT NULL,
  harga TEXT NOT NULL,
  fitur TEXT[] DEFAULT '{}',
  highlight BOOLEAN DEFAULT FALSE,
  periode TEXT,
  deskripsi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  alamat TEXT NOT NULL,
  telepon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  isi_testimoni TEXT NOT NULL,
  foto TEXT,
  rating INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: benefits
CREATE TABLE IF NOT EXISTS benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: steps (how it works)
CREATE TABLE IF NOT EXISTS steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: careers
CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  empty_title TEXT NOT NULL,
  empty_message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default landing data
INSERT INTO landing (hero_title, hero_subtitle, hero_image, cta_text, cta_title, cta_subtitle, cta_button_text)
VALUES (
  'Bangun Tim Profesional Tanpa Proses Rekrut yang Rumit',
  'Kami menyediakan Data Entry, Programmer, Designer, dan Admin Remote siap kerja dalam 7 hari.',
  '',
  'Hire Talent Sekarang',
  'Siap Punya Tim Remote ',
  'Bergabung dengan 150+ perusahaan yang sudah mempercayakan rekrutmen remote mereka kepada KerjaTim.id',
  'Hire Sekarang'
) ON CONFLICT DO NOTHING;

-- Insert default contacts data
INSERT INTO contacts (email, whatsapp, alamat, telepon)
VALUES (
  'hello@kerjatim.id',
  '6285646420488',
  'Jakarta, Indonesia',
  '+62 21 1234 5678'
) ON CONFLICT DO NOTHING;

-- Insert default about data
INSERT INTO about (judul, deskripsi, visi, misi, values)
VALUES (
  'Membangun Masa Depan Kerja Remote',
  'KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia.',
  'Memberdayakan talent Indonesia untuk pasar global',
  'Menyediakan proses hire yang cepat, transparan, dan berkualitas',
  '[
    {"icon": "Users", "title": "People First", "desc": "Kami percaya bahwa setiap talent memiliki potensi luar biasa yang perlu disalurkan."},
    {"icon": "Target", "title": "Kualitas Tanpa Kompromi", "desc": "Setiap talent melalui proses screening ketat untuk memastikan standar tertinggi."},
    {"icon": "Award", "title": "Transparansi", "desc": "Sistem yang terbuka dan jelas, tanpa biaya tersembunyi."},
    {"icon": "Globe", "title": "Akses Global", "desc": "Menghubungkan talent terbaik Indonesia dengan perusahaan di seluruh dunia."}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert default careers data
INSERT INTO careers (title, description, empty_title, empty_message)
VALUES (
  'Bergabung dengan Tim Kami',
  'Kami selalu mencari individu berbakat yang ingin membuat dampak nyata dalam dunia kerja remote.',
  'Belum ada posisi terbuka',
  'Saat ini kami belum membuka lowongan baru. Silakan cek kembali nanti atau ikuti media sosial kami untuk update terbaru.'
) ON CONFLICT DO NOTHING;

-- Insert default benefits
INSERT INTO benefits (icon, title, description, position)
VALUES
  ('Shield', 'Tanpa Biaya Rekrut', 'Tidak ada biaya tersembunyi untuk proses rekrutmen. Anda hanya membayar saat talent mulai bekerja.', 0),
  ('Clock', 'Siap Kerja & Terscreening', 'Semua talent telah melalui proses screening ketat dan siap bekerja dalam waktu singkat.', 1),
  ('FileCheck', 'Kontrak Fleksibel', 'Pilih durasi kontrak sesuai kebutuhan. Bulanan, project-based, atau jangka panjang.', 2),
  ('RefreshCw', 'Ganti Talent Gratis', 'Jika talent tidak cocok, kami akan mengganti dengan kandidat baru tanpa biaya tambahan.', 3)
ON CONFLICT DO NOTHING;

-- Insert default steps
INSERT INTO steps (icon, title, desc, position)
VALUES
  ('MessageSquare', 'Konsultasi Kebutuhan', 'Ceritakan kebutuhan tim Anda kepada konsultan kami.', 0),
  ('Search', 'Kami Seleksi Kandidat', 'Tim kami menyeleksi kandidat terbaik dari database.', 1),
  ('Video', 'Interview Online', 'Lakukan interview langsung dengan kandidat terpilih.', 2),
  ('FileSignature', 'Tanda Tangan Kontrak', 'Kontrak digital siap dalam hitungan menit.', 3),
  ('Rocket', 'Tim Mulai Bekerja', 'Talent bergabung dan mulai produktif di hari pertama.', 4)
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_landing_updated_at BEFORE UPDATE ON landing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_talents_updated_at BEFORE UPDATE ON talents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_updated_at BEFORE UPDATE ON pricing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_benefits_updated_at BEFORE UPDATE ON benefits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_steps_updated_at BEFORE UPDATE ON steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - hanya admin yang bisa akses
ALTER TABLE landing ENABLE ROW LEVEL SECURITY;
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for authenticated users (akan diubah sesuai kebutuhan)
-- Untuk sementara, kita akan menggunakan service role key di client side (tidak disarankan untuk production)
-- Atau bisa menggunakan RLS dengan policy yang lebih ketat

-- Policy untuk public read (website bisa baca)
CREATE POLICY "Public read access" ON landing FOR SELECT USING (true);
CREATE POLICY "Public read access" ON talents FOR SELECT USING (true);
CREATE POLICY "Public read access" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pricing FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contacts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON benefits FOR SELECT USING (true);
CREATE POLICY "Public read access" ON steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON careers FOR SELECT USING (true);

-- Policy untuk admin write (akan menggunakan service role atau auth check di aplikasi)
-- Untuk development, kita bisa disable RLS atau gunakan service role
-- Untuk production, gunakan Supabase Auth dengan proper policies
