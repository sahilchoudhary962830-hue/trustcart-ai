import { ProtectedLayout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import {
  deleteUser,
  getAdminStats,
  getAdminUsers,
  getTrendingSuspiciousProducts,
} from "@/lib/api";
import { formatDate, formatScore } from "@/lib/utils";
import type { AdminUserEntry, PlatformStats, SuspiciousProduct } from "@/types";
import {
  AlertTriangle,
  BarChart3,
  Shield,
  Trash2,
  TrendingDown,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [users, setUsers] = useState<AdminUserEntry[]>([]);
  const [suspicious, setSuspicious] = useState<SuspiciousProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getAdminStats(),
      getAdminUsers(),
      getTrendingSuspiciousProducts(),
    ])
      .then(([s, u, sp]) => {
        setStats(s);
        setUsers(u);
        setSuspicious(sp);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(userId: string) {
    setDeletingId(userId);
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading)
    return (
      <ProtectedLayout requireAdmin>
        <LoadingPage />
      </ProtectedLayout>
    );

  return (
    <ProtectedLayout requireAdmin>
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Admin Panel
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Platform monitoring and user management.
            </p>
          </div>
        </div>

        {/* Platform Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          data-ocid="admin-stats"
        >
          {[
            {
              label: "Total Users",
              value: stats?.totalUsers ?? 0,
              icon: Users,
              color: "text-primary",
            },
            {
              label: "Total Analyses",
              value: stats?.totalAnalyses ?? 0,
              icon: BarChart3,
              color: "text-accent",
            },
            {
              label: "Fake Detected",
              value: stats?.totalFakeDetected ?? 0,
              icon: TrendingDown,
              color: "text-red-500",
            },
            {
              label: "Products Checked",
              value: stats?.totalProductChecks ?? 0,
              icon: AlertTriangle,
              color: "text-amber-500",
            },
            {
              label: "Avg Fake Rate",
              value: `${stats?.averageFakeRate.toFixed(1) ?? 0}%`,
              icon: BarChart3,
              color: "text-destructive",
              raw: true,
            },
          ].map(({ label, value, icon: Icon, color, raw }) => (
            <Card key={label}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-body">
                    {label}
                  </span>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="text-xl font-display font-bold text-foreground">
                  {raw
                    ? value
                    : typeof value === "number"
                      ? value.toLocaleString()
                      : value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="admin-users-table"
                  >
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-xs font-display text-muted-foreground font-medium">
                          User
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-display text-muted-foreground font-medium">
                          Role
                        </th>
                        <th className="text-right py-2 px-3 text-xs font-display text-muted-foreground font-medium">
                          Analyses
                        </th>
                        <th className="text-right py-2 px-3 text-xs font-display text-muted-foreground font-medium">
                          Joined
                        </th>
                        <th className="py-2 px-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          data-ocid={`user-row-${u.id}`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="font-display font-medium text-foreground truncate max-w-[120px]">
                              {u.username}
                            </div>
                            <div className="text-xs text-muted-foreground font-body truncate max-w-[120px]">
                              {u.email}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <Badge
                              variant={
                                u.role === "admin" ? "default" : "secondary"
                              }
                            >
                              {u.role}
                            </Badge>
                          </td>
                          <td className="py-2.5 px-3 text-right font-display font-medium text-foreground">
                            {u.analyzeCount}
                          </td>
                          <td className="py-2.5 px-3 text-right text-xs text-muted-foreground font-body">
                            {formatDate(u.createdAt)}
                          </td>
                          <td className="py-2.5 px-3">
                            {u.role !== "admin" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(u.id)}
                                loading={deletingId === u.id}
                                aria-label={`Delete user ${u.username}`}
                                data-ocid={`delete-user-${u.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suspicious Products */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Top
                  Suspicious
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-ocid="suspicious-products">
                  {suspicious.map((p) => (
                    <div
                      key={p.productUrl}
                      className="p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="font-body text-sm text-foreground font-medium truncate mb-1">
                        {p.productName}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-body">
                          {p.totalReviews.toLocaleString()} reviews
                        </span>
                        <Badge variant="risky">
                          {formatScore(p.fakePercentage)} fake
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
