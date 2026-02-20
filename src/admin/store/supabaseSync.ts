import { getSupabase } from "@/lib/supabase";
import type { AdminState, Talent, Job, Category, Blog, FAQ, About, Pricing, Contacts, Testimonial, Landing } from "./useAdminStore";

const supabase = getSupabase();

// Load all data from Supabase
export async function loadStateFromSupabase(): Promise<Partial<AdminState>> {
  try {
    // Load all tables in parallel
    const [
      landingRes,
      talentsRes,
      jobsRes,
      categoriesRes,
      blogsRes,
      faqsRes,
      aboutRes,
      pricingRes,
      contactsRes,
      testimonialsRes,
      benefitsRes,
      stepsRes,
      careersRes,
    ] = await Promise.all([
      supabase.from("landing").select("*").limit(1).single(),
      supabase.from("talents").select("*").order("created_at", { ascending: false }),
      supabase.from("jobs").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("created_at", { ascending: false }),
      supabase.from("blogs").select("*").order("created_at", { ascending: false }),
      supabase.from("faqs").select("*").order("created_at", { ascending: false }),
      supabase.from("about").select("*").limit(1).single(),
      supabase.from("pricing").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("*").limit(1).single(),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("benefits").select("*").order("position", { ascending: true }),
      supabase.from("steps").select("*").order("position", { ascending: true }),
      supabase.from("careers").select("*").limit(1).single(),
    ]);

    const state: Partial<AdminState> = {};

    if (landingRes.data) {
      const l = landingRes.data;
      state.landing = {
        hero_title: l.hero_title,
        hero_subtitle: l.hero_subtitle,
        hero_image: l.hero_image || "",
        CTA_text: l.cta_text,
        cta_title: l.cta_title,
        cta_subtitle: l.cta_subtitle,
        cta_button_text: l.cta_button_text,
      };
    }

    if (talentsRes.data) {
      state.talents = talentsRes.data.map((t: any) => ({
        id: t.id,
        nama: t.nama,
        foto: t.foto,
        skill: t.skill || [],
        kategori: t.kategori,
        lokasi: t.lokasi,
        rate: t.rate,
        deskripsi: t.deskripsi,
        kontak: t.kontak,
      }));
    }

    if (jobsRes.data) {
      state.jobs = jobsRes.data.map((j: any) => ({
        id: j.id,
        posisi: j.posisi,
        perusahaan: j.perusahaan,
        lokasi: j.lokasi,
        tipe_kerja: j.tipe_kerja,
        gaji: j.gaji,
        deskripsi: j.deskripsi,
      }));
    }

    if (categoriesRes.data) {
      state.categories = categoriesRes.data.map((c: any) => ({
        id: c.id,
        slug: c.slug,
        nama: c.nama,
        icon: c.icon,
        deskripsi: c.deskripsi,
        harga: c.harga,
        bullets: c.bullets || [],
      }));
    }

    if (blogsRes.data) {
      state.blogs = blogsRes.data.map((b: any) => ({
        id: b.id,
        judul: b.judul,
        thumbnail: b.thumbnail,
        konten: b.konten,
        author: b.author,
        tanggal: b.tanggal,
        category: b.category,
      }));
    }

    if (faqsRes.data) {
      state.faq = faqsRes.data.map((f: any) => ({
        id: f.id,
        pertanyaan: f.pertanyaan,
        jawaban: f.jawaban,
      }));
    }

    if (aboutRes.data) {
      const a = aboutRes.data;
      state.about = {
        judul: a.judul,
        deskripsi: a.deskripsi,
        visi: a.visi,
        misi: a.misi,
        values: Array.isArray(a.values) ? a.values : [],
      };
    }

    if (pricingRes.data) {
      state.pricing = pricingRes.data.map((p: any) => ({
        id: p.id,
        nama_paket: p.nama_paket,
        harga: p.harga,
        fitur: p.fitur || [],
        highlight: p.highlight || false,
        periode: p.periode,
        deskripsi: p.deskripsi,
      }));
    }

    if (contactsRes.data) {
      const c = contactsRes.data;
      state.contacts = {
        email: c.email,
        whatsapp: c.whatsapp,
        alamat: c.alamat,
        telepon: c.telepon,
      };
    }

    if (testimonialsRes.data) {
      state.testimonials = testimonialsRes.data.map((t: any) => ({
        id: t.id,
        nama: t.nama,
        jabatan: t.jabatan,
        isi_testimoni: t.isi_testimoni,
        foto: t.foto,
        rating: t.rating,
      }));
    }

    if (benefitsRes.data) {
      state.benefits = benefitsRes.data.map((b: any) => ({
        icon: b.icon,
        title: b.title,
        description: b.description,
      }));
    }

    if (stepsRes.data) {
      state.steps = stepsRes.data.map((s: any) => ({
        icon: s.icon,
        title: s.title,
        desc: s.desc,
      }));
    }

    if (careersRes.data) {
      const c = careersRes.data;
      state.careers = {
        title: c.title,
        description: c.description,
        empty_title: c.empty_title,
        empty_message: c.empty_message,
      };
    }

    return state;
  } catch (error) {
    console.error("Failed to load state from Supabase:", error);
    return {};
  }
}

// Save operations
export async function saveTalentToSupabase(talent: Talent): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("talents")
      .insert({
        nama: talent.nama,
        foto: talent.foto,
        skill: talent.skill,
        kategori: talent.kategori,
        lokasi: talent.lokasi,
        rate: talent.rate,
        deskripsi: talent.deskripsi,
        kontak: talent.kontak,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save talent to Supabase:", error);
    return null;
  }
}

export async function updateTalentInSupabase(id: string, talent: Partial<Talent>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("talents")
      .update({
        nama: talent.nama,
        foto: talent.foto,
        skill: talent.skill,
        kategori: talent.kategori,
        lokasi: talent.lokasi,
        rate: talent.rate,
        deskripsi: talent.deskripsi,
        kontak: talent.kontak,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update talent in Supabase:", error);
    return false;
  }
}

export async function deleteTalentFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("talents").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete talent from Supabase:", error);
    return false;
  }
}

export async function saveJobToSupabase(job: Job): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert({
        posisi: job.posisi,
        perusahaan: job.perusahaan,
        lokasi: job.lokasi,
        tipe_kerja: job.tipe_kerja,
        gaji: job.gaji,
        deskripsi: job.deskripsi,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save job to Supabase:", error);
    return null;
  }
}

export async function updateJobInSupabase(id: string, job: Partial<Job>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("jobs")
      .update({
        posisi: job.posisi,
        perusahaan: job.perusahaan,
        lokasi: job.lokasi,
        tipe_kerja: job.tipe_kerja,
        gaji: job.gaji,
        deskripsi: job.deskripsi,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update job in Supabase:", error);
    return false;
  }
}

export async function deleteJobFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete job from Supabase:", error);
    return false;
  }
}

export async function saveCategoryToSupabase(category: Category): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert({
        slug: category.slug,
        nama: category.nama,
        icon: category.icon,
        deskripsi: category.deskripsi,
        harga: category.harga,
        bullets: category.bullets || [],
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save category to Supabase:", error);
    return null;
  }
}

export async function updateCategoryInSupabase(id: string, category: Partial<Category>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("categories")
      .update({
        slug: category.slug,
        nama: category.nama,
        icon: category.icon,
        deskripsi: category.deskripsi,
        harga: category.harga,
        bullets: category.bullets,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update category in Supabase:", error);
    return false;
  }
}

export async function deleteCategoryFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete category from Supabase:", error);
    return false;
  }
}

export async function saveBlogToSupabase(blog: Blog): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        judul: blog.judul,
        thumbnail: blog.thumbnail,
        konten: blog.konten,
        author: blog.author,
        tanggal: blog.tanggal,
        category: blog.category,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save blog to Supabase:", error);
    return null;
  }
}

export async function updateBlogInSupabase(id: string, blog: Partial<Blog>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("blogs")
      .update({
        judul: blog.judul,
        thumbnail: blog.thumbnail,
        konten: blog.konten,
        author: blog.author,
        tanggal: blog.tanggal,
        category: blog.category,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update blog in Supabase:", error);
    return false;
  }
}

export async function deleteBlogFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete blog from Supabase:", error);
    return false;
  }
}

export async function saveFAQToSupabase(faq: FAQ): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .insert({
        pertanyaan: faq.pertanyaan,
        jawaban: faq.jawaban,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save FAQ to Supabase:", error);
    return null;
  }
}

export async function updateFAQInSupabase(id: string, faq: Partial<FAQ>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("faqs")
      .update({
        pertanyaan: faq.pertanyaan,
        jawaban: faq.jawaban,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update FAQ in Supabase:", error);
    return false;
  }
}

export async function deleteFAQFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete FAQ from Supabase:", error);
    return false;
  }
}

export async function updateLandingInSupabase(landing: Partial<Landing>): Promise<boolean> {
  try {
    // Get first landing record or create
    const { data: existing } = await supabase.from("landing").select("id").limit(1).single();
    
    const landingData: any = {
      hero_title: landing.hero_title,
      hero_subtitle: landing.hero_subtitle,
      hero_image: landing.hero_image,
      cta_text: landing.CTA_text,
      cta_title: landing.cta_title,
      cta_subtitle: landing.cta_subtitle,
      cta_button_text: landing.cta_button_text,
    };

    if (existing?.id) {
      const { error } = await supabase.from("landing").update(landingData).eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("landing").insert(landingData);
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update landing in Supabase:", error);
    return false;
  }
}

export async function updateAboutInSupabase(about: Partial<About>): Promise<boolean> {
  try {
    const { data: existing } = await supabase.from("about").select("id").limit(1).single();
    
    const aboutData: any = {
      judul: about.judul,
      deskripsi: about.deskripsi,
      visi: about.visi,
      misi: about.misi,
      values: about.values || [],
    };

    if (existing?.id) {
      const { error } = await supabase.from("about").update(aboutData).eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("about").insert(aboutData);
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update about in Supabase:", error);
    return false;
  }
}

export async function updateContactsInSupabase(contacts: Partial<Contacts>): Promise<boolean> {
  try {
    const { data: existing } = await supabase.from("contacts").select("id").limit(1).single();
    
    const contactsData: any = {
      email: contacts.email,
      whatsapp: contacts.whatsapp,
      alamat: contacts.alamat,
      telepon: contacts.telepon,
    };

    if (existing?.id) {
      const { error } = await supabase.from("contacts").update(contactsData).eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("contacts").insert(contactsData);
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update contacts in Supabase:", error);
    return false;
  }
}

export async function savePricingToSupabase(pricing: Pricing): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("pricing")
      .insert({
        nama_paket: pricing.nama_paket,
        harga: pricing.harga,
        fitur: pricing.fitur || [],
        highlight: pricing.highlight || false,
        periode: pricing.periode,
        deskripsi: pricing.deskripsi,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save pricing to Supabase:", error);
    return null;
  }
}

export async function updatePricingInSupabase(id: string, pricing: Partial<Pricing>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("pricing")
      .update({
        nama_paket: pricing.nama_paket,
        harga: pricing.harga,
        fitur: pricing.fitur,
        highlight: pricing.highlight,
        periode: pricing.periode,
        deskripsi: pricing.deskripsi,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update pricing in Supabase:", error);
    return false;
  }
}

export async function deletePricingFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("pricing").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete pricing from Supabase:", error);
    return false;
  }
}

export async function saveTestimonialToSupabase(testimonial: Testimonial): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        nama: testimonial.nama,
        jabatan: testimonial.jabatan,
        isi_testimoni: testimonial.isi_testimoni,
        foto: testimonial.foto,
        rating: testimonial.rating,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error("Failed to save testimonial to Supabase:", error);
    return null;
  }
}

export async function updateTestimonialInSupabase(id: string, testimonial: Partial<Testimonial>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("testimonials")
      .update({
        nama: testimonial.nama,
        jabatan: testimonial.jabatan,
        isi_testimoni: testimonial.isi_testimoni,
        foto: testimonial.foto,
        rating: testimonial.rating,
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update testimonial in Supabase:", error);
    return false;
  }
}

export async function deleteTestimonialFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete testimonial from Supabase:", error);
    return false;
  }
}
