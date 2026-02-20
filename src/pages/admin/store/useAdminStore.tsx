import React, { createContext, useContext, useMemo, useState } from "react";

type Landing = {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  CTA_text: string;
  cta_title?: string;
  cta_subtitle?: string;
  cta_button_text?: string;
};

type Talent = {
  id: string;
  nama: string;
  foto?: string;
  skill: string[];
  kategori: string; // slug dari category
  lokasi: string;
  rate: string;
  deskripsi?: string;
  kontak?: string;
};

type Job = {
  id: string;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  tipe_kerja: string;
  gaji: string;
  deskripsi?: string;
};

type Category = {
  id: string;
  slug: string;
  nama: string;
  icon: string; // lucide icon name
  deskripsi: string;
  harga: string; // Mulai harga/bln
  bullets?: string[];
};

type Blog = {
  id: string;
  judul: string;
  thumbnail?: string;
  konten: string;
  author: string;
  tanggal: string; // ISO date
  category?: string;
};

type FAQ = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type AboutValue = {
  icon: string;
  title: string;
  desc: string;
};

type About = {
  judul: string;
  deskripsi: string;
  visi: string;
  misi: string;
  values: AboutValue[];
};

type Pricing = {
  id: string;
  nama_paket: string;
  harga: string;
  fitur: string[];
  highlight?: boolean;
  periode?: string;
  deskripsi?: string;
};

type Contacts = {
  email: string;
  whatsapp: string;
  alamat: string;
  telepon?: string;
};

type Testimonial = {
  id: string;
  nama: string;
  jabatan: string;
  isi_testimoni: string;
  foto?: string;
  rating?: number;
};

type AdminState = {
  landing: Landing;
  talents: Talent[];
  jobs: Job[];
  categories: Category[];
  blogs: Blog[];
  faq: FAQ[];
  about: About;
  pricing: Pricing[];
  contacts: Contacts;
  testimonials: Testimonial[];
  benefits: Benefit[];
  steps: Step[];
  careers: Careers;
  navigation: NavItem[];
  footerLinks: FooterLinks;
};

type AdminActions = {
  addTalent(t: Talent): void;
  updateTalent(id: string, patch: Partial<Talent>): void;
  deleteTalent(id: string): void;

  addJob(j: Job): void;
  updateJob(id: string, patch: Partial<Job>): void;
  deleteJob(id: string): void;

  addCategory(c: Category): void;
  updateCategory(id: string, patch: Partial<Category>): void;
  deleteCategory(id: string): void;

  addBlog(b: Blog): void;
  updateBlog(id: string, patch: Partial<Blog>): void;
  deleteBlog(id: string): void;

  addFAQ(f: FAQ): void;
  updateFAQ(id: string, patch: Partial<FAQ>): void;
  deleteFAQ(id: string): void;

  updateLanding(patch: Partial<Landing>): void;
  updateAbout(patch: Partial<About>): void;
  updateContacts(patch: Partial<Contacts>): void;

  addPricing(p: Pricing): void;
  updatePricing(id: string, patch: Partial<Pricing>): void;
  deletePricing(id: string): void;

  addTestimonial(t: Testimonial): void;
  updateTestimonial(id: string, patch: Partial<Testimonial>): void;
  deleteTestimonial(id: string): void;
};

const initialState: AdminState = {
  landing: {
    hero_title: "Bangun Tim Profesional Tanpa Proses Rekrut yang Rumit",
    hero_subtitle:
      "Kami menyediakan Data Entry, Programmer, Designer, dan Admin Remote siap kerja dalam 7 hari.",
    hero_image: "/assets/hero-illustration.png",
    CTA_text: "Hire Talent Sekarang",
    cta_title: "Siap Punya Tim Remote ",
    cta_subtitle: "Bergabung dengan 150+ perusahaan yang sudah mempercayakan rekrutmen remote mereka kepada KerjaTim.id",
    cta_button_text: "Hire Sekarang",
  },
  talents: [
    {
      id: "tal1",
      nama: "Rina Setiawan",
      skill: ["Excel", "Google Sheets", "Data Cleaning"],
      kategori: "data-entry",
      lokasi: "Bandung",
      rate: "Rp 3.5 Jt/bulan",
      deskripsi: "Spesialis input dan validasi data dengan akurasi tinggi.",
    },
    {
      id: "tal2",
      nama: "Dimas Pratama",
      skill: ["React", "Next.js", "Node.js", "TypeScript"],
      kategori: "programmer",
      lokasi: "Jakarta",
      rate: "Rp 8 Jt/bulan",
      deskripsi: "Full‑stack developer berpengalaman membangun aplikasi web skala produksi.",
    },
    {
      id: "tal3",
      nama: "Nadia Aulia",
      skill: ["Figma", "Design System", "User Research"],
      kategori: "ui-ux-designer",
      lokasi: "Yogyakarta",
      rate: "Rp 6 Jt/bulan",
      deskripsi: "UI/UX designer dengan fokus pada usability dan konsistensi UI.",
    },
    {
      id: "tal4",
      nama: "Rafi Hakim",
      skill: ["Adobe Illustrator", "Photoshop", "Branding"],
      kategori: "graphic-designer",
      lokasi: "Surabaya",
      rate: "Rp 4.5 Jt/bulan",
      deskripsi: "Membantu branding, social media assets, dan materi promosi.",
    },
    {
      id: "tal5",
      nama: "Intan Permata",
      skill: ["CRM", "Chat Support", "Call Handling"],
      kategori: "customer-service",
      lokasi: "Remote",
      rate: "Rp 3.5 Jt/bulan",
      deskripsi: "Customer service ramah dan responsif dengan SOP layanan.",
    },
    {
      id: "tal6",
      nama: "Yoga Pradipta",
      skill: ["SEO", "Google Ads", "Content Strategy"],
      kategori: "digital-marketing",
      lokasi: "Remote",
      rate: "Rp 5 Jt/bulan",
      deskripsi: "Mengelola kampanye digital dan optimasi organik/berbayar.",
    },
  ],
  jobs: [
    {
      id: "job1",
      posisi: "Frontend Developer",
      perusahaan: "TechNusa",
      lokasi: "Remote",
      tipe_kerja: "Full‑time",
      gaji: "Rp 10–15 Jt",
      deskripsi: "Membangun aplikasi React/Next.js, kolaborasi dengan tim product.",
    },
    {
      id: "job2",
      posisi: "Data Entry Specialist",
      perusahaan: "DataPro Indonesia",
      lokasi: "Jakarta",
      tipe_kerja: "Contract",
      gaji: "Rp 4–5 Jt",
      deskripsi: "Input dan validasi batch data, memastikan kualitas database.",
    },
    {
      id: "job3",
      posisi: "UI/UX Designer",
      perusahaan: "DesainKu",
      lokasi: "Bandung",
      tipe_kerja: "Project‑based",
      gaji: "Rp 6–8 Jt",
      deskripsi: "Menyusun design system dan prototipe, riset pengguna.",
    },
    {
      id: "job4",
      posisi: "Customer Support Agent",
      perusahaan: "StartupXYZ",
      lokasi: "Remote",
      tipe_kerja: "Shift",
      gaji: "Rp 3–4.5 Jt",
      deskripsi: "Menangani pertanyaan pelanggan via chat/telepon sesuai SOP.",
    },
    {
      id: "job5",
      posisi: "Graphic Designer",
      perusahaan: "DesainKu",
      lokasi: "Remote",
      tipe_kerja: "Contract",
      gaji: "Rp 4–6 Jt",
      deskripsi: "Membuat aset brand dan konten visual untuk kampanye marketing.",
    },
    {
      id: "job6",
      posisi: "Backend Developer",
      perusahaan: "TechNusa",
      lokasi: "Remote",
      tipe_kerja: "Full‑time",
      gaji: "Rp 12–18 Jt",
      deskripsi: "Mengembangkan API, integrasi layanan, dan optimasi performa backend.",
    },
    {
      id: "job7",
      posisi: "Digital Marketing Specialist",
      perusahaan: "StartupXYZ",
      lokasi: "Jakarta",
      tipe_kerja: "Full‑time",
      gaji: "Rp 6–9 Jt",
      deskripsi: "Mengelola SEO/Ads dan menyusun strategi konten lintas channel.",
    },
    {
      id: "job8",
      posisi: "DevOps Engineer",
      perusahaan: "CloudID",
      lokasi: "Remote",
      tipe_kerja: "Full‑time",
      gaji: "Rp 15–22 Jt",
      deskripsi: "Automasi CI/CD, monitoring, dan provisioning infrastruktur cloud.",
    },
    {
      id: "job9",
      posisi: "Data Analyst",
      perusahaan: "DataPro Indonesia",
      lokasi: "Bandung",
      tipe_kerja: "Contract",
      gaji: "Rp 7–10 Jt",
      deskripsi: "Analisis dataset dan membuat insight untuk pengambilan keputusan.",
    },
    {
      id: "job10",
      posisi: "Customer Success Manager",
      perusahaan: "SaaSKu",
      lokasi: "Remote",
      tipe_kerja: "Full‑time",
      gaji: "Rp 8–12 Jt",
      deskripsi: "Mengelola onboarding klien dan memastikan kesuksesan penggunaan produk.",
    },
  ],
  categories: [
    { id: "cat1", slug: "data-entry", nama: "Data Entry", icon: "Database", deskripsi: "Pengelolaan data akurat & cepat", harga: "Rp 3.5 Jt", bullets: ["Validasi data", "Input batch", "Quality control"] },
    { id: "cat2", slug: "programmer", nama: "Programmer", icon: "Code", deskripsi: "Full-stack, mobile, dan backend", harga: "Rp 8 Jt", bullets: ["Stack modern", "Code review", "Delivery bertahap"] },
    { id: "cat3", slug: "ui-ux-designer", nama: "UI/UX Designer", icon: "Palette", deskripsi: "Desain interface & experience", harga: "Rp 6 Jt", bullets: ["Design system", "Prototipe", "Uji kegunaan"] },
    { id: "cat4", slug: "graphic-designer", nama: "Graphic Designer", icon: "PenTool", deskripsi: "Branding, social media & print", harga: "Rp 4.5 Jt", bullets: ["Branding", "Konten sosial", "Materi cetak"] },
    { id: "cat5", slug: "customer-service", nama: "Customer Service", icon: "Headphones", deskripsi: "Layanan pelanggan profesional", harga: "Rp 3.5 Jt", bullets: ["SOP layanan", "Pelatihan", "Laporan performa"] },
    { id: "cat6", slug: "digital-marketing", nama: "Digital Marketing", icon: "TrendingUp", deskripsi: "SEO, ads, & content strategy", harga: "Rp 5 Jt", bullets: ["Riset kata kunci", "Optimasi iklan", "Konten"] },
  ],
  blogs: [
    {
      id: "b1",
      judul: "5 Tips Mengelola Tim Remote dengan Efektif",
      tanggal: "15 Feb 2026",
      category: "Tips",
      konten: "Pelajari cara terbaik untuk mengelola tim remote agar tetap produktif dan terhubung.",
      author: "Redaksi",
    },
    {
      id: "b2",
      judul: "Tren Outsourcing 2026: Apa yang Harus Diketahui",
      tanggal: "10 Feb 2026",
      category: "Insight",
      konten: "Temukan tren terbaru dalam industri outsourcing dan bagaimana mempersiapkan bisnis Anda.",
      author: "Redaksi",
    },
    {
      id: "b3",
      judul: "Cara Memilih Talent Remote yang Tepat",
      tanggal: "5 Feb 2026",
      category: "Guide",
      konten: "Panduan lengkap untuk memilih talent remote yang sesuai dengan kebutuhan perusahaan.",
      author: "Redaksi",
    },
  ],
  faq: [
    { id: "f1", pertanyaan: "Bagaimana proses rekrutmen talent di KerjaTim.id?", jawaban: "Setiap talent melalui proses screening yang ketat termasuk verifikasi identitas, tes kemampuan, dan interview. Hanya 15% dari pelamar yang lolos seleksi kami." },
    { id: "f2", pertanyaan: "Berapa lama waktu untuk mendapatkan talent?", jawaban: "Rata-rata 7 hari kerja setelah Anda menyampaikan kebutuhan. Untuk posisi yang lebih spesifik, mungkin membutuhkan waktu hingga 14 hari." },
    { id: "f3", pertanyaan: "Apakah bisa mengganti talent jika tidak cocok?", jawaban: "Ya, kami memberikan garansi penggantian talent gratis dalam 30 hari pertama jika talent tidak sesuai dengan kebutuhan Anda." },
    { id: "f4", pertanyaan: "Bagaimana sistem pembayaran?", jawaban: "Pembayaran dilakukan secara bulanan melalui invoice. Kami juga mendukung sistem escrow untuk keamanan kedua belah pihak." },
    { id: "f5", pertanyaan: "Apakah ada kontrak minimum?", jawaban: "Paket Basic memiliki kontrak minimum 1 bulan. Paket Pro dan Enterprise memiliki opsi kontrak yang lebih fleksibel." },
    { id: "f6", pertanyaan: "Bagaimana jika saya perlu talent dengan skill khusus?", jawaban: "Hubungi tim kami melalui halaman kontak. Kami akan membantu mencarikan talent dengan keahlian spesifik yang Anda butuhkan." },
  ],
  about: {
    judul: "Membangun Masa Depan Kerja Remote",
    deskripsi:
      "KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia.",
    visi: "Memberdayakan talent Indonesia untuk pasar global",
    misi: "Menyediakan proses hire yang cepat, transparan, dan berkualitas",
    values: [
      { icon: "Users", title: "People First", desc: "Kami percaya bahwa setiap talent memiliki potensi luar biasa yang perlu disalurkan." },
      { icon: "Target", title: "Kualitas Tanpa Kompromi", desc: "Setiap talent melalui proses screening ketat untuk memastikan standar tertinggi." },
      { icon: "Award", title: "Transparansi", desc: "Sistem yang terbuka dan jelas, tanpa biaya tersembunyi." },
      { icon: "Globe", title: "Akses Global", desc: "Menghubungkan talent terbaik Indonesia dengan perusahaan di seluruh dunia." },
    ],
  },
  pricing: [
    {
      id: "basic",
      nama_paket: "Basic",
      harga: "Rp 5 Jt",
      fitur: ["1-3 Talent", "Screening dasar", "Kontrak bulanan", "Support email", "Laporan bulanan"],
      highlight: false,
      periode: "/talent/bulan",
      deskripsi: "Untuk kebutuhan sederhana",
    },
    {
      id: "pro",
      nama_paket: "Pro",
      harga: "Rp 4 Jt",
      fitur: [
        "4-10 Talent",
        "Screening mendalam",
        "Kontrak fleksibel",
        "Support prioritas",
        "Laporan mingguan",
        "Dedicated account manager",
      ],
      highlight: true,
      periode: "/talent/bulan",
      deskripsi: "Paling populer untuk tim berkembang",
    },
    {
      id: "enterprise",
      nama_paket: "Enterprise",
      harga: "Custom",
      fitur: [
        "Unlimited Talent",
        "Screening premium",
        "Kontrak custom",
        "24/7 Support",
        "Laporan real-time",
        "Dedicated account manager",
        "Custom onboarding",
      ],
      highlight: false,
      periode: "",
      deskripsi: "Untuk perusahaan skala besar",
    },
  ],
  contacts: {
    email: "hello@kerjatim.id",
    whatsapp: "6285646420488",
    alamat: "Jakarta, Indonesia",
    telepon: "+62 21 1234 5678",
  },
  testimonials: [
    { id: "t1", nama: "Andi Wijaya", jabatan: "CEO, TechNusa", isi_testimoni: "KerjaTim.id membantu kami menemukan 5 programmer berkualitas dalam waktu satu minggu. Prosesnya sangat cepat dan profesional.", rating: 5 },
    { id: "t2", nama: "Sari Indah", jabatan: "HR Manager, StartupXYZ", isi_testimoni: "Kontrak yang fleksibel dan talent yang sudah terscreening membuat kami menghemat waktu rekrutmen hingga 80%.", rating: 5 },
    { id: "t3", nama: "Budi Santoso", jabatan: "CTO, DataPro Indonesia", isi_testimoni: "Kualitas talent di KerjaTim.id sangat baik. Tim data entry kami sekarang 3x lebih produktif dengan biaya yang lebih efisien.", rating: 5 },
    { id: "t4", nama: "Maya Putri", jabatan: "COO, DesainKu", isi_testimoni: "Kami sudah mencoba banyak platform, tapi KerjaTim.id yang paling responsif dan memberikan kandidat yang paling sesuai.", rating: 4 },
  ],
  benefits: [
    { icon: "Shield", title: "Tanpa Biaya Rekrut", description: "Tidak ada biaya tersembunyi untuk proses rekrutmen. Anda hanya membayar saat talent mulai bekerja." },
    { icon: "Clock", title: "Siap Kerja & Terscreening", description: "Semua talent telah melalui proses screening ketat dan siap bekerja dalam waktu singkat." },
    { icon: "FileCheck", title: "Kontrak Fleksibel", description: "Pilih durasi kontrak sesuai kebutuhan. Bulanan, project-based, atau jangka panjang." },
    { icon: "RefreshCw", title: "Ganti Talent Gratis", description: "Jika talent tidak cocok, kami akan mengganti dengan kandidat baru tanpa biaya tambahan." },
  ],
  steps: [
    { icon: "MessageSquare", title: "Konsultasi Kebutuhan", desc: "Ceritakan kebutuhan tim Anda kepada konsultan kami." },
    { icon: "Search", title: "Kami Seleksi Kandidat", desc: "Tim kami menyeleksi kandidat terbaik dari database." },
    { icon: "Video", title: "Interview Online", desc: "Lakukan interview langsung dengan kandidat terpilih." },
    { icon: "FileSignature", title: "Tanda Tangan Kontrak", desc: "Kontrak digital siap dalam hitungan menit." },
    { icon: "Rocket", title: "Tim Mulai Bekerja", desc: "Talent bergabung dan mulai produktif di hari pertama." },
  ],
  careers: {
    title: "Bergabung dengan Tim Kami",
    description: "Kami selalu mencari individu berbakat yang ingin membuat dampak nyata dalam dunia kerja remote.",
    empty_title: "Belum ada posisi terbuka",
    empty_message:
      "Saat ini kami belum membuka lowongan baru. Silakan cek kembali nanti atau ikuti media sosial kami untuk update terbaru.",
  },
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Tentang Kami", href: "/#tentang" },
    { label: "Kategori Talent", href: "/#kategori" },
    { label: "Cara Kerja", href: "/#cara-kerja" },
    { label: "Pricing", href: "/#pricing" },
  ],
  footerLinks: {
    Platform: [
      { label: "Cari Talent", href: "/cari-talent" },
      { label: "Cara Kerja", href: "/cara-kerja" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
    Perusahaan: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Kontak", href: "/kontak" },
      { label: "FAQ", href: "/faq" },
      { label: "Karir", href: "/karir" },
    ],
    Legal: [
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Syarat & Ketentuan", href: "/terms" },
    ],
  },
};

const AdminStoreContext = createContext<{ state: AdminState; actions: AdminActions } | null>(null);

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminState>(initialState);

  const actions: AdminActions = useMemo(
    () => ({
      addTalent: (t) => setState((s) => ({ ...s, talents: [t, ...s.talents] })),
      updateTalent: (id, patch) =>
        setState((s) => ({ ...s, talents: s.talents.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteTalent: (id) => setState((s) => ({ ...s, talents: s.talents.filter((x) => x.id !== id) })),

      addJob: (j) => setState((s) => ({ ...s, jobs: [j, ...s.jobs] })),
      updateJob: (id, patch) => setState((s) => ({ ...s, jobs: s.jobs.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteJob: (id) => setState((s) => ({ ...s, jobs: s.jobs.filter((x) => x.id !== id) })),

      addCategory: (c) => setState((s) => ({ ...s, categories: [c, ...s.categories] })),
      updateCategory: (id, patch) =>
        setState((s) => ({ ...s, categories: s.categories.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteCategory: (id) => setState((s) => ({ ...s, categories: s.categories.filter((x) => x.id !== id) })),

      addBlog: (b) => setState((s) => ({ ...s, blogs: [b, ...s.blogs] })),
      updateBlog: (id, patch) => setState((s) => ({ ...s, blogs: s.blogs.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteBlog: (id) => setState((s) => ({ ...s, blogs: s.blogs.filter((x) => x.id !== id) })),

      addFAQ: (f) => setState((s) => ({ ...s, faq: [f, ...s.faq] })),
      updateFAQ: (id, patch) => setState((s) => ({ ...s, faq: s.faq.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteFAQ: (id) => setState((s) => ({ ...s, faq: s.faq.filter((x) => x.id !== id) })),

      updateLanding: (patch) => setState((s) => ({ ...s, landing: { ...s.landing, ...patch } })),
      updateAbout: (patch) => setState((s) => ({ ...s, about: { ...s.about, ...patch } })),
      updateContacts: (patch) => setState((s) => ({ ...s, contacts: { ...s.contacts, ...patch } })),

      addPricing: (p) => setState((s) => ({ ...s, pricing: [p, ...s.pricing] })),
      updatePricing: (id, patch) =>
        setState((s) => ({ ...s, pricing: s.pricing.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deletePricing: (id) => setState((s) => ({ ...s, pricing: s.pricing.filter((x) => x.id !== id) })),

      addTestimonial: (t) => setState((s) => ({ ...s, testimonials: [t, ...s.testimonials] })),
      updateTestimonial: (id, patch) =>
        setState((s) => ({ ...s, testimonials: s.testimonials.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteTestimonial: (id) => setState((s) => ({ ...s, testimonials: s.testimonials.filter((x) => x.id !== id) })),
    }),
    [],
  );

  return <AdminStoreContext.Provider value={{ state, actions }}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) throw new Error("useAdminStore must be used within AdminStoreProvider");
  return ctx;
}
type Benefit = {
  icon: string;
  title: string;
  description: string;
};

type Step = {
  icon: string;
  title: string;
  desc: string;
};

type NavItem = { label: string; href: string };
type FooterLinks = Record<string, { label: string; href: string }[]>;
type Careers = {
  title: string;
  description: string;
  empty_title: string;
  empty_message: string;
};
