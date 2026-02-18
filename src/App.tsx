import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privasi" element={<Privasi />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
