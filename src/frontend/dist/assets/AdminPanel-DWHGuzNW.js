import { r as reactExports, j as jsxRuntimeExports, k as LoadingPage, f as formatDate, a as formatScore } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, P as ProtectedLayout, S as Shield, C as ChartColumn, B as Button } from "./Layout-C9fB1GFD.js";
import { B as Badge } from "./BadgeCustom-D06qMwrv.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./CardCustom-B13w7UHv.js";
import { b as getAdminStats, d as getAdminUsers, e as getTrendingSuspiciousProducts, f as deleteUser } from "./api-DPQZoKDZ.js";
import { T as TrendingDown } from "./trending-down-CDYtorlw.js";
import { T as TriangleAlert } from "./triangle-alert-BxszCaBC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function AdminPanel() {
  const [stats, setStats] = reactExports.useState(null);
  const [users, setUsers] = reactExports.useState([]);
  const [suspicious, setSuspicious] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    Promise.all([
      getAdminStats(),
      getAdminUsers(),
      getTrendingSuspiciousProducts()
    ]).then(([s, u, sp]) => {
      setStats(s);
      setUsers(u);
      setSuspicious(sp);
    }).finally(() => setLoading(false));
  }, []);
  async function handleDelete(userId) {
    setDeletingId(userId);
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } finally {
      setDeletingId(null);
    }
  }
  if (loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedLayout, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPage, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedLayout, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Platform monitoring and user management." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-5 gap-4 mb-8",
        "data-ocid": "admin-stats",
        children: [
          {
            label: "Total Users",
            value: (stats == null ? void 0 : stats.totalUsers) ?? 0,
            icon: Users,
            color: "text-primary"
          },
          {
            label: "Total Analyses",
            value: (stats == null ? void 0 : stats.totalAnalyses) ?? 0,
            icon: ChartColumn,
            color: "text-accent"
          },
          {
            label: "Fake Detected",
            value: (stats == null ? void 0 : stats.totalFakeDetected) ?? 0,
            icon: TrendingDown,
            color: "text-red-500"
          },
          {
            label: "Products Checked",
            value: (stats == null ? void 0 : stats.totalProductChecks) ?? 0,
            icon: TriangleAlert,
            color: "text-amber-500"
          },
          {
            label: "Avg Fake Rate",
            value: `${(stats == null ? void 0 : stats.averageFakeRate.toFixed(1)) ?? 0}%`,
            icon: ChartColumn,
            color: "text-destructive",
            raw: true
          }
        ].map(({ label, value, icon: Icon, color, raw }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground", children: raw ? value : typeof value === "number" ? value.toLocaleString() : value })
        ] }) }, label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
          " Users"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "data-ocid": "admin-users-table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-xs font-display text-muted-foreground font-medium", children: "User" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-xs font-display text-muted-foreground font-medium", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-xs font-display text-muted-foreground font-medium", children: "Analyses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-xs font-display text-muted-foreground font-medium", children: "Joined" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                  "data-ocid": `user-row-${u.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-medium text-foreground truncate max-w-[120px]", children: u.username }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body truncate max-w-[120px]", children: u.email })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: u.role === "admin" ? "default" : "secondary",
                        children: u.role
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-display font-medium text-foreground", children: u.analyzeCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right text-xs text-muted-foreground font-body", children: formatDate(u.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: u.role !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => handleDelete(u.id),
                        loading: deletingId === u.id,
                        "aria-label": `Delete user ${u.username}`,
                        "data-ocid": `delete-user-${u.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
                      }
                    ) })
                  ]
                },
                u.id
              )) })
            ]
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-500" }),
          " Top Suspicious"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "suspicious-products", children: suspicious.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 rounded-lg bg-muted/30 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body text-sm text-foreground font-medium truncate mb-1", children: p.productName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
                  p.totalReviews.toLocaleString(),
                  " reviews"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "risky", children: [
                  formatScore(p.fakePercentage),
                  " fake"
                ] })
              ] })
            ]
          },
          p.productUrl
        )) }) })
      ] }) })
    ] })
  ] }) });
}
export {
  AdminPanel as default
};
