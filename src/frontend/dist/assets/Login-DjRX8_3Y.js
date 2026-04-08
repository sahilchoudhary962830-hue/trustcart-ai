import { r as reactExports, u as useAuth, l as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-CQoy5yrU.js";
import { L as Layout, S as Shield, B as Button } from "./Layout-C9fB1GFD.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./CardCustom-B13w7UHv.js";
import { l as login } from "./api-DPQZoKDZ.js";
import { C as CircleAlert } from "./circle-alert-B-tjtYIV.js";
function Login() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const authLogin = useAuth((s) => s.login);
  const navigate = useNavigate();
  async function handleSubmit(e) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl", children: [
        "TrustCart ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Sign in to your TrustCart AI account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "email",
                className: "block text-sm font-display font-medium text-foreground mb-1.5",
                children: "Email address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "email",
                type: "email",
                required: true,
                autoComplete: "email",
                className: "w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                placeholder: "you@example.com",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                "data-ocid": "login-email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "password",
                className: "block text-sm font-display font-medium text-foreground mb-1.5",
                children: "Password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "password",
                type: "password",
                required: true,
                autoComplete: "current-password",
                className: "w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                placeholder: "••••••••",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                "data-ocid": "login-password"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
            " ",
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              loading,
              className: "w-full",
              "data-ocid": "login-submit",
              children: "Sign In"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground font-body mt-4", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "text-primary hover:underline font-medium",
              children: "Create one"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mt-4", children: 'Demo: use any email (include "admin" for admin role) + any password' })
  ] }) }) });
}
export {
  Login as default
};
