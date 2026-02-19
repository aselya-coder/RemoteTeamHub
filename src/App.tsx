import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Kategori from "./pages/Kategori";
import KategoriDetail from "./pages/KategoriDetail";
import HireKategori from "./pages/HireKategori";
import CaraKerja from "./pages/CaraKerja";
import PricingPage from "./pages/PricingPage";
import CariTalent from "./pages/CariTalent";
import Karir from "./pages/Karir";
import FAQ from "./pages/FAQ";
import Kontak from "./pages/Kontak";
import Blog from "./pages/Blog";
import Privasi from "./pages/Privasi";
import SyaratKetentuan from "./pages/SyaratKetentuan";
import NotFound from "./pages/NotFound";
import AdminLogin from "@/admin/pages/AdminLogin";
import AdminLayout from "@/admin/components/AdminLayout";
import AdminRoute from "@/admin/components/AdminRoute";
import AdminCategories from "@/admin/pages/AdminCategories";
import AdminLanding from "@/admin/pages/AdminLanding";
import AdminFAQ from "@/admin/pages/AdminFAQ";
import AdminBlogs from "@/admin/pages/AdminBlogs";
import AdminPricing from "@/admin/pages/AdminPricing";
import AdminContacts from "@/admin/pages/AdminContacts";
import AdminTestimonials from "@/admin/pages/AdminTestimonials";
import AdminAbout from "@/admin/pages/AdminAbout";
import AdminTalents from "@/admin/pages/AdminTalents";
import AdminJobs from "@/admin/pages/AdminJobs";
import AdminDashboard from "@/admin/pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/:slug" element={<KategoriDetail />} />
          <Route path="/hire/:slug" element={<HireKategori />} />
          <Route path="/cara-kerja" element={<CaraKerja />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cari-talent" element={<CariTalent />} />
          <Route path="/karir" element={<Karir />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privasi />} />
          <Route path="/terms" element={<SyaratKetentuan />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="landing" element={<AdminLanding />} />
              <Route path="talents" element={<AdminTalents />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="pricing" element={<AdminPricing />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
