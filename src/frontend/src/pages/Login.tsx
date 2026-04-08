import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/lib/api";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Shield } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authLogin = useAuth((s) => s.login);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      authLogin(result.token, result.userId, result.username, result.role);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">
                TrustCart <span className="text-accent">AI</span>
              </span>
            </div>
          </div>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in to your TrustCart AI account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-display font-medium text-foreground mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-ocid="login-email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-display font-medium text-foreground mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-ocid="login-password"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </div>
                )}
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                  data-ocid="login-submit"
                >
                  Sign In
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground font-body mt-4">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground font-body mt-4">
            Demo: use any email (include "admin" for admin role) + any password
          </p>
        </div>
      </div>
    </Layout>
  );
}
