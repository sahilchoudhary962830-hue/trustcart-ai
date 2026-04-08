import { u as useAuth, l as useNavigate, j as jsxRuntimeExports } from "./index-CQoy5yrU.js";
import { P as ProtectedLayout, U as User, S as Shield, B as Button, d as LogOut } from "./Layout-C9fB1GFD.js";
import { B as Badge } from "./BadgeCustom-D06qMwrv.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./CardCustom-B13w7UHv.js";
function Profile() {
  const { username, role, userId, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-8", children: "Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: username ?? "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: role === "admin" ? "default" : "secondary",
              showIcon: role === "admin",
              children: role === "admin" ? "Admin" : "Member"
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-medium text-muted-foreground", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground truncate max-w-[180px]", children: userId ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-medium text-muted-foreground", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: role === "admin" ? "default" : "secondary", children: role ?? "user" })
        ] }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-foreground", children: "You have full admin access to the platform." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "destructive",
        onClick: handleLogout,
        className: "w-full",
        "data-ocid": "profile-logout",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          " Sign Out"
        ]
      }
    )
  ] }) });
}
export {
  Profile as default
};
