import { ProtectedLayout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import { getDashboardStats } from "@/lib/api";
import { formatDate, formatScore } from "@/lib/utils";
import type { DashboardStats } from "@/types";
import {
  BarChart3,
  Search,
  Shield,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trendData = [
  { date: "Jan 1", real: 120, fake: 45 },
  { date: "Jan 8", real: 148, fake: 52 },
  { date: "Jan 15", real: 132, fake: 38 },
  { date: "Jan 22", real: 165, fake: 67 },
  { date: "Jan 29", real: 189, fake: 73 },
  { date: "Feb 5", real: 201, fake: 81 },
  { date: "Feb 12", real: 178, fake: 58 },
  { date: "Feb 19", real: 223, fake: 94 },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <ProtectedLayout>
        <LoadingPage />
      </ProtectedLayout>
    );

  return (
    <ProtectedLayout>
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-1">
            Dashboard
          </h1>
          <p className="text-muted-foreground font-body">
            Your review analysis activity and insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          data-ocid="dashboard-stats"
        >
          {[
            {
              label: "Reviews Analyzed",
              value: stats?.totalAnalyzed ?? 0,
              icon: BarChart3,
              color: "text-primary",
            },
            {
              label: "Fake Detected",
              value: stats?.fakeDetected ?? 0,
              icon: TrendingDown,
              color: "text-red-500",
            },
            {
              label: "Real Verified",
              value: stats?.realVerified ?? 0,
              icon: TrendingUp,
              color: "text-emerald-500",
            },
            {
              label: "Products Checked",
              value: stats?.productsChecked ?? 0,
              icon: ShoppingBag,
              color: "text-accent",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-body">
                    {label}
                  </span>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="text-2xl font-display font-bold text-foreground">
                  {value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Score Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/10">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-body mb-0.5">
                  Overall Trust Score
                </div>
                <div className="text-3xl font-display font-bold text-foreground">
                  {formatScore(stats?.trustScore ?? 0)}
                </div>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    stats && stats.trustScore >= 70
                      ? "trusted"
                      : stats && stats.trustScore >= 40
                        ? "caution"
                        : "risky"
                  }
                  size="md"
                  showIcon
                >
                  {stats && stats.trustScore >= 70
                    ? "Trusted"
                    : stats && stats.trustScore >= 40
                      ? "Caution"
                      : "Risky"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Fake vs. Real Reviews Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart
                data={trendData}
                margin={{ top: 0, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.68 0.22 150)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.68 0.22 150)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="fakeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.65 0.18 28)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.65 0.18 28)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.25 0.01 245 / 0.5)"
                />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="real"
                  name="Real Reviews"
                  stroke="oklch(0.68 0.22 150)"
                  fill="url(#realGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="fake"
                  name="Potentially Fake"
                  stroke="oklch(0.65 0.18 28)"
                  fill="url(#fakeGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" /> Recent Analyses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.recentAnalyses.length ? (
                <div className="space-y-3" data-ocid="recent-analyses">
                  {stats.recentAnalyses.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <Badge variant={a.verdict} showIcon>
                        {a.verdict}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body text-foreground truncate">
                          "{a.reviewText.slice(0, 60)}…"
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          {formatDate(a.analyzedAt)}
                        </p>
                      </div>
                      <span className="text-sm font-display font-bold text-destructive flex-shrink-0">
                        {formatScore(a.fakeScore)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground font-body text-center py-4">
                  No analyses yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-accent" /> Recent Product
                Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.recentProducts.length ? (
                <div className="space-y-3" data-ocid="recent-products">
                  {stats.recentProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium text-foreground truncate">
                          {p.productName}
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          {p.platform} · {formatDate(p.checkedAt)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          p.trustLevel === "trusted"
                            ? "trusted"
                            : p.trustLevel === "caution"
                              ? "caution"
                              : "risky"
                        }
                        showIcon
                      >
                        {formatScore(p.fakePercentage)} fake
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground font-body text-center py-4">
                  No product checks yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
