// Simple CMS data layer using localStorage with optional Supabase sync
import { supabase } from "./supabase";

type BackendMode = "local" | "supabase" | "api";
const MODE: BackendMode = ((import.meta as ImportMeta).env?.VITE_CMS_BACKEND || "local") as BackendMode;
const API_BASE: string | undefined = (import.meta as ImportMeta).env?.VITE_CMS_API_BASE;

export type PageKey = "index" | "tentang" | "privasi" | "syarat" | "kontak";

export type IndexPage = {
  heroTitle: string;
  heroDesc: string;
  ctaText: string;
};

export type TentangPage = {
  description: string;
  visi: string;
  misi: string;
  team: Array<{ id: string; name: string; role: string; photo?: string }>;
};

export type PrivacyOrTerms = { content: string };

export type KontakPage = {
  email: string;
  phone: string;
  address: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  date: string; // ISO
  author: string;
  category?: string;
  excerpt?: string;
};

export type FAQItem = { id: string; question: string; answer: string };

export type ContactMsg = { id: string; name: string; email: string; message: string; date: string };

const LS = {
  pages: "cms_pages",
  blogs: "cms_blogs",
  faq: "cms_faq",
  contacts: "cms_contacts",
};

type PagesMap = {
  index: IndexPage;
  tentang: TentangPage;
  privasi: PrivacyOrTerms;
  syarat: PrivacyOrTerms;
  kontak: KontakPage;
};

const defaultPages: PagesMap = {
  index: {
    heroTitle: "Bangun Tim Profesional Tanpa Proses Rekrut yang Rumit",
    heroDesc:
      "Kami menyediakan Data Entry, Programmer, Designer, dan Admin Remote siap kerja dalam 7 hari.",
    ctaText: "Hire Talent Sekarang",
  },
  tentang: {
    description:
      "KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia. Kami menghubungkan perusahaan dengan talent berkualitas tanpa kerumitan proses rekrutmen tradisional.",
    visi: "Membangun masa depan kerja remote Indonesia yang efektif dan inklusif",
    misi: "Menghubungkan perusahaan dengan talent berkualitas secara cepat, transparan, dan efisien",
    team: [],
  },
  kontak: {
    email: "hello@kerjatim.id",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
  },
  privasi: {
    content:
      "Terakhir diperbarui: 1 Februari 2026\n\n1. Informasi yang Kami Kumpulkan\nKami mengumpulkan informasi yang Anda berikan secara langsung, termasuk nama, email, nomor telepon, dan informasi profesional saat mendaftar di platform kami.\n\n2. Penggunaan Informasi\nInformasi yang dikumpulkan digunakan untuk menyediakan dan meningkatkan layanan kami, mencocokkan talent dengan kebutuhan klien, dan berkomunikasi dengan Anda.\n\n3. Keamanan Data\nKami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.\n\n4. Hubungi Kami\nJika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di privacy@kerjatim.id.",
  },
  syarat: {
    content:
      "Terakhir diperbarui: 1 Februari 2026\n\n1. Ketentuan Umum\nDengan menggunakan layanan KerjaTim.id, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Platform kami menyediakan layanan pencocokan talent remote dengan kebutuhan perusahaan.\n\n2. Layanan\nKerjaTim.id menyediakan layanan outsourcing tenaga kerja remote termasuk rekrutmen, screening, pengelolaan kontrak, dan pembayaran.\n\n3. Pembayaran\nPembayaran dilakukan secara bulanan sesuai dengan paket yang dipilih. Keterlambatan pembayaran dapat mengakibatkan penangguhan layanan.\n\n4. Kerahasiaan\nKedua belah pihak setuju untuk menjaga kerahasiaan informasi bisnis dan data sensitif yang dibagikan selama kerjasama.",
  },
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Pages
export const cmsPages = {
  async syncAll(): Promise<void> {
    if (MODE === "supabase" && supabase) {
      const { data, error } = await supabase.from("pages").select("key,data");
      if (!error && data) {
        const next = { ...defaultPages, ...readJSON<PagesMap>(LS.pages, defaultPages) } as PagesMap;
        const rows = data as Array<
          | { key: "index"; data: PagesMap["index"] }
          | { key: "tentang"; data: PagesMap["tentang"] }
          | { key: "privasi"; data: PagesMap["privasi"] }
          | { key: "syarat"; data: PagesMap["syarat"] }
          | { key: "kontak"; data: PagesMap["kontak"] }
        >;
        for (const row of rows) {
          switch (row.key) {
            case "index":
              next.index = row.data;
              break;
            case "tentang":
              next.tentang = row.data;
              break;
            case "privasi":
              next.privasi = row.data;
              break;
            case "syarat":
              next.syarat = row.data;
              break;
            case "kontak":
              next.kontak = row.data;
              break;
          }
        }
        writeJSON(LS.pages, next);
      }
    } else if (MODE === "api" && API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/pages`);
        if (res.ok) {
          const json = (await res.json()) as Partial<PagesMap>;
          const next = { ...defaultPages, ...json } as PagesMap;
          writeJSON(LS.pages, next);
        }
      } catch {
        /* noop */
      }
    }
  },
  getAll(): PagesMap {
    return readJSON<PagesMap>(LS.pages, defaultPages);
  },
  update<K extends PageKey>(key: K, data: PagesMap[K]) {
    if (MODE === "supabase" && supabase) {
      void (async () => {
        try {
          await supabase.from("pages").upsert({ key, data });
        } catch {
          /* noop */
        }
      })();
    } else if (MODE === "api" && API_BASE) {
      void fetch(`${API_BASE}/pages/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      }).catch(() => {});
    }
    const all = cmsPages.getAll();
    const next: PagesMap = { ...all, [key]: data } as PagesMap;
    writeJSON(LS.pages, next);
  },
};

// Blogs
export const cmsBlogs = {
  async syncFromRemote(): Promise<void> {
    if (MODE === "supabase" && supabase) {
      const { data, error } = await supabase.from("blogs").select("*").order("date", { ascending: false });
      if (!error && data) writeJSON(LS.blogs, data as BlogPost[]);
    } else if (MODE === "api" && API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/blogs`);
        if (res.ok) writeJSON(LS.blogs, (await res.json()) as BlogPost[]);
      } catch {
        /* noop */
      }
    }
  },
  list(): BlogPost[] {
    const data = readJSON<BlogPost[]>(LS.blogs, []);
    if (data.length === 0) {
      const seed: BlogPost[] = [
        {
          id: crypto.randomUUID(),
          title: "5 Tips Mengelola Tim Remote dengan Efektif",
          content:
            "Pelajari cara terbaik untuk mengelola tim remote agar tetap produktif dan terhubung.",
          thumbnail: "",
          date: "15 Feb 2026",
          author: "Redaksi",
          category: "Tips",
          excerpt: "Pelajari cara terbaik untuk mengelola tim remote.",
        },
        {
          id: crypto.randomUUID(),
          title: "Tren Outsourcing 2026: Apa yang Harus Diketahui",
          content:
            "Temukan tren terbaru dalam industri outsourcing dan bagaimana mempersiapkan bisnis Anda.",
          thumbnail: "",
          date: "10 Feb 2026",
          author: "Redaksi",
          category: "Insight",
          excerpt: "Tren terbaru outsourcing dan persiapan bisnis.",
        },
        {
          id: crypto.randomUUID(),
          title: "Cara Memilih Talent Remote yang Tepat",
          content:
            "Panduan lengkap untuk memilih talent remote yang sesuai dengan kebutuhan perusahaan.",
          thumbnail: "",
          date: "5 Feb 2026",
          author: "Redaksi",
          category: "Guide",
          excerpt: "Panduan memilih talent remote yang tepat.",
        },
      ];
      writeJSON(LS.blogs, seed);
      return seed;
    }
    return data;
  },
  create(post: Omit<BlogPost, "id">) {
    if (MODE === "supabase" && supabase) {
      const id = crypto.randomUUID();
      void (async () => {
        try {
          await supabase.from("blogs").insert([{ id, ...post }]);
        } catch {
          /* noop */
        }
      })();
    } else if (MODE === "api" && API_BASE) {
      void fetch(`${API_BASE}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }).catch(() => {});
    }
    const all = cmsBlogs.list();
    const id = crypto.randomUUID();
    all.unshift({ id, ...post });
    writeJSON(LS.blogs, all);
  },
  update(id: string, patch: Partial<BlogPost>) {
    if (MODE === "supabase" && supabase) {
      void (async () => {
        try {
          await supabase.from("blogs").update(patch).eq("id", id);
        } catch {
          /* noop */
        }
      })();
    } else if (MODE === "api" && API_BASE) {
      void fetch(`${API_BASE}/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }).catch(() => {});
    }
    const all = cmsBlogs.list();
    const idx = all.findIndex((b) => b.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...patch };
      writeJSON(LS.blogs, all);
    }
  },
  remove(id: string) {
    if (MODE === "supabase" && supabase) {
      void (async () => {
        try {
          await supabase.from("blogs").delete().eq("id", id);
        } catch {
          /* noop */
        }
      })();
    } else if (MODE === "api" && API_BASE) {
      void fetch(`${API_BASE}/blogs/${id}`, { method: "DELETE" }).catch(() => {});
    }
    const all = cmsBlogs.list().filter((b) => b.id !== id);
    writeJSON(LS.blogs, all);
  },
};

// FAQ
export const cmsFAQ = {
  async syncFromRemote(): Promise<void> {
    if (MODE === "supabase" && supabase) {
      const { data, error } = await supabase.from("faq").select("*");
      if (!error && data) writeJSON(LS.faq, data as FAQItem[]);
    } else if (MODE === "api" && API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/faq`);
        if (res.ok) writeJSON(LS.faq, (await res.json()) as FAQItem[]);
      } catch {
        /* noop */
      }
    }
  },
  list(): FAQItem[] {
    const data = readJSON<FAQItem[]>(LS.faq, []);
    if (data.length === 0) {
      const seed: FAQItem[] = [
        {
          id: crypto.randomUUID(),
          question: "Bagaimana proses rekrutmen talent di KerjaTim.id?",
          answer:
            "Setiap talent melalui proses screening yang ketat termasuk verifikasi identitas, tes kemampuan, dan interview. Hanya 15% dari pelamar yang lolos seleksi kami.",
        },
        {
          id: crypto.randomUUID(),
          question: "Berapa lama waktu untuk mendapatkan talent?",
          answer:
            "Rata-rata 7 hari kerja setelah Anda menyampaikan kebutuhan. Untuk posisi yang lebih spesifik, mungkin membutuhkan waktu hingga 14 hari.",
        },
        {
          id: crypto.randomUUID(),
          question: "Apakah bisa mengganti talent jika tidak cocok?",
          answer:
            "Ya, kami memberikan garansi penggantian talent gratis dalam 30 hari pertama jika talent tidak sesuai dengan kebutuhan Anda.",
        },
        {
          id: crypto.randomUUID(),
          question: "Bagaimana sistem pembayaran?",
          answer:
            "Pembayaran dilakukan secara bulanan melalui invoice. Kami juga mendukung sistem escrow untuk keamanan kedua belah pihak.",
        },
        {
          id: crypto.randomUUID(),
          question: "Apakah ada kontrak minimum?",
          answer:
            "Paket Basic memiliki kontrak minimum 1 bulan. Paket Pro dan Enterprise memiliki opsi kontrak yang lebih fleksibel.",
        },
        {
          id: crypto.randomUUID(),
          question: "Bagaimana jika saya perlu talent dengan skill khusus?",
          answer:
            "Hubungi tim kami melalui halaman kontak. Kami akan membantu mencarikan talent dengan keahlian spesifik yang Anda butuhkan.",
        },
      ];
      writeJSON(LS.faq, seed);
      return seed;
    }
    return data;
  },
  create(item: Omit<FAQItem, "id">) {
    const all = cmsFAQ.list();
    const id = crypto.randomUUID();
    all.unshift({ id, ...item });
    writeJSON(LS.faq, all);
  },
  update(id: string, patch: Partial<FAQItem>) {
    const all = cmsFAQ.list();
    const idx = all.findIndex((f) => f.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...patch };
      writeJSON(LS.faq, all);
    }
  },
  remove(id: string) {
    const all = cmsFAQ.list().filter((f) => f.id !== id);
    writeJSON(LS.faq, all);
  },
};

// Contacts (read-only)
export const cmsContacts = {
  list(): ContactMsg[] {
    return readJSON<ContactMsg[]>(LS.contacts, []);
  },
  seedDemo() {
    const all = cmsContacts.list();
    if (all.length === 0) {
      writeJSON(LS.contacts, [
        { id: crypto.randomUUID(), name: "Budi", email: "budi@example.com", message: "Halo, info pricing?", date: new Date().toISOString() },
      ]);
    }
  },
};
