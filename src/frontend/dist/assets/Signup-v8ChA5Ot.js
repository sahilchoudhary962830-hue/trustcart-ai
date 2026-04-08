import { r as reactExports, u as useAuth, l as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-CQoy5yrU.js";
import { L as Layout, S as Shield, B as Button } from "./Layout-C9fB1GFD.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./CardCustom-B13w7UHv.js";
import { s as signup } from "./api-DPQZoKDZ.js";
import { C as CircleAlert } from "./circle-alert-B-tjtYIV.js";
function Signup() {
  const [username, setUsername] = reactExports.useState("");
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
      const result = await signup(username, email, password);
      authLogin(result.token, result.userId, result.username, result.role);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Start detecting fake reviews for free" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "username",
                className: "block text-sm font-display font-medium text-foreground mb-1.5",
                children: "Username"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "username",
                type: "text",
                required: true,
                autoComplete: "username",
                className: "w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                placeholder: "yourname",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                "data-ocid": "signup-username"
              }
            )
          ] }),
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
                "data-ocid": "signup-email"
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
                autoComplete: "new-password",
                minLength: 8,
                className: "w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                placeholder: "••••••••",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                "data-ocid": "signup-password"
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
              "data-ocid": "signup-submit",
              children: "Create Account"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground font-body mt-4", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-primary hover:underline font-medium",
              children: "Sign in"
            }
          )
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  Signup as default
};
