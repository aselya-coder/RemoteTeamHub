import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import FAQ from "./pages/FAQ";
import Kontak from "./pages/Kontak";
import Blog from "./pages/Blog";
import Privasi from "./pages/Privasi";
import SyaratKetentuan from "./pages/SyaratKetentuan";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CariTalent from "./pages/dashboard/client/CariTalent";
import KontrakClient from "./pages/dashboard/client/KontrakClient";
import InvoiceClient from "./pages/dashboard/client/InvoiceClient";
import SettingsClient from "./pages/dashboard/client/SettingsClient";
import ProfilTalent from "./pages/dashboard/talent/ProfilTalent";
import PortfolioTalent from "./pages/dashboard/talent/PortfolioTalent";
import KontrakTalent from "./pages/dashboard/talent/KontrakTalent";
import PenghasilanTalent from "./pages/dashboard/talent/PenghasilanTalent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privasi" element={<Privasi />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
          <Route path="/dashboard/client" element={<Navigate to="/dashboard/client/talent" replace />} />
          <Route path="/dashboard/talent" element={<Navigate to="/dashboard/talent/profile" replace />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/client/talent" element={<CariTalent />} />
          <Route path="/dashboard/client/kontrak" element={<KontrakClient />} />
          <Route path="/dashboard/client/invoice" element={<InvoiceClient />} />
          <Route path="/dashboard/client/settings" element={<SettingsClient />} />
          <Route path="/dashboard/talent/profile" element={<ProfilTalent />} />
          <Route path="/dashboard/talent/portfolio" element={<PortfolioTalent />} />
          <Route path="/dashboard/talent/kontrak" element={<KontrakTalent />} />
          <Route path="/dashboard/talent/penghasilan" element={<PenghasilanTalent />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
