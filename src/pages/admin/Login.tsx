import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

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
    
    try {
      // Try Supabase Auth first
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        // Fallback to simple auth for development
        if (values.email === "admin@remote.com" && values.password === "admin123") {
          localStorage.setItem("admin_auth", JSON.stringify({ email: values.email, password: values.password, method: "local" }));
          navigate("/admin/dashboard");
          return;
        }
        setError(authError.message || "Email atau password salah");
        setLoading(false);
        return;
      }

      // Check if user is admin (you can add admin check here)
      if (authData.user) {
        localStorage.setItem("admin_auth", JSON.stringify({ 
          email: authData.user.email, 
          userId: authData.user.id,
          method: "supabase" 
        }));
        navigate("/admin/dashboard");
      }
    } catch (err) {
      // Fallback to simple auth
      if (values.email === "admin@remote.com" && values.password === "admin123") {
        localStorage.setItem("admin_auth", JSON.stringify({ email: values.email, password: values.password, method: "local" }));
        navigate("/admin/dashboard");
      } else {
        setError("Email atau password salah");
        setLoading(false);
      }
    }
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
                    <Input type="email" placeholder="admin@remote.com" {...field} />
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
                    <Input type="password" placeholder="admin123" {...field} />
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

