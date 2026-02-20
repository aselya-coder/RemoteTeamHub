import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const supabase = getSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    const { data: sessionData } = await supabase.auth.getSession();
    const uid = sessionData?.session?.user?.id;
    if (!uid) {
      setError("Gagal memuat sesi");
      setLoading(false);
      return;
    }
    const { data: rows, error: adminError } = await supabase.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
    if (adminError || !rows) {
      setError("Akses ditolak. Akun ini bukan admin.");
      setLoading(false);
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Masuk Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">Gunakan email dan password admin.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error ? <div className="text-sm text-destructive">{error}</div> : null}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-primary underline">Kembali ke beranda</Link>
        </div>
      </div>
    </div>
  );
}

