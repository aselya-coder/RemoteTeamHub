import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqManager from "./admin/sections/FaqManager";
import PricingManager from "./admin/sections/PricingManager";

export default function Admin() {
  const navigate = useNavigate();
  const supabase = getSupabase();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      const uid = data?.session?.user?.id;
      if (!uid) {
        navigate("/admin/login");
        return;
      }
      const { data: row } = await supabase.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
      if (!row) {
        setStatus("denied");
        return;
      }
      setStatus("ok");
    }
    init();
  }, [navigate, supabase]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">Memeriksa akses...</div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold">Akses ditolak</div>
          <div className="text-muted-foreground">Akun ini bukan admin.</div>
          <div className="flex items-center justify-center gap-2">
            <Button asChild variant="outline"><Link to="/admin/login">Ke halaman login</Link></Button>
            <Button onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }}>Keluar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-6">Kelola konten situs dari halaman ini.</p>
        <Tabs defaultValue="faq">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="faq">
            <FaqManager />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

