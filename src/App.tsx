import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, RequireAdmin } from "@/lib/admin-auth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import BlogManage from "./pages/admin/BlogManage";
import FAQManage from "./pages/admin/FAQManage";
import KontakManage from "./pages/admin/KontakManage";
import PrivasiManage from "./pages/admin/PrivasiManage";
import SyaratManage from "./pages/admin/SyaratManage";
import IndexManage from "./pages/admin/IndexManage";
import TentangManage from "./pages/admin/TentangManage";
import { AuthProvider, RequireRole } from "@/lib/auth";
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
import DashboardClient from "./pages/dashboard/client/DashboardClient";
import CariTalent from "./pages/dashboard/client/CariTalent";
import KontrakClient from "./pages/dashboard/client/KontrakClient";
import InvoiceClient from "./pages/dashboard/client/InvoiceClient";
import SettingsClient from "./pages/dashboard/client/SettingsClient";
import ProfilTalent from "./pages/dashboard/talent/ProfilTalent";
import PortfolioTalent from "./pages/dashboard/talent/PortfolioTalent";
import KontrakTalent from "./pages/dashboard/talent/KontrakTalent";
import PenghasilanTalent from "./pages/dashboard/talent/PenghasilanTalent";
import DashboardTalent from "./pages/dashboard/talent/DashboardTalent";
import DashboardTalentHome from "./pages/dashboard/talent/DashboardTalentHome";

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
        <AuthProvider>
          <AdminAuthProvider>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privasi" element={<Privasi />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
          <Route path="/dashboard/client" element={<RequireRole role="client"><DashboardClient /></RequireRole>} />
          <Route path="/dashboard/talent" element={<RequireRole role="talent"><DashboardTalent /></RequireRole>}>
            <Route index element={<DashboardTalentHome />} />
            <Route path="profile" element={<RequireRole role="talent"><ProfilTalent /></RequireRole>} />
            <Route path="portfolio" element={<RequireRole role="talent"><PortfolioTalent /></RequireRole>} />
            <Route path="kontrak" element={<RequireRole role="talent"><KontrakTalent /></RequireRole>} />
            <Route path="penghasilan" element={<RequireRole role="talent"><PenghasilanTalent /></RequireRole>} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
            <Route index element={<AdminDashboard />} />
            <Route path="index" element={<IndexManage />} />
            <Route path="tentang" element={<TentangManage />} />
            <Route path="blog" element={<BlogManage />} />
            <Route path="faq" element={<FAQManage />} />
            <Route path="kontak" element={<KontakManage />} />
            <Route path="privasi" element={<PrivasiManage />} />
            <Route path="syarat" element={<SyaratManage />} />
          </Route>
          <Route path="/dashboard/client/talent" element={<RequireRole role="client"><CariTalent /></RequireRole>} />
          <Route path="/dashboard/client/kontrak" element={<RequireRole role="client"><KontrakClient /></RequireRole>} />
          <Route path="/dashboard/client/invoice" element={<RequireRole role="client"><InvoiceClient /></RequireRole>} />
          <Route path="/dashboard/client/settings" element={<RequireRole role="client"><SettingsClient /></RequireRole>} />
          
        </Routes>
        </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
