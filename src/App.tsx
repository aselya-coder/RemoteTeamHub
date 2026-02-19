import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Kategori from "./pages/Kategori";
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
          <Route path="/cara-kerja" element={<CaraKerja />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cari-talent" element={<CariTalent />} />
          <Route path="/karir" element={<Karir />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privasi />} />
          <Route path="/terms" element={<SyaratKetentuan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
