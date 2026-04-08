import { r as reactExports, j as jsxRuntimeExports, f as formatDate } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, L as Layout, B as Button, A as Award, S as Shield } from "./Layout-C9fB1GFD.js";
import { B as Badge } from "./BadgeCustom-D06qMwrv.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./CardCustom-B13w7UHv.js";
import { h as generateTrustBadge } from "./api-DPQZoKDZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const TRUST_LEVELS = [
  {
    value: "trusted",
    label: "Trusted",
    desc: "≥75% real reviews, high confidence"
  },
  {
    value: "caution",
    label: "Caution",
    desc: "25–50% suspicious reviews detected"
  },
  { value: "risky", label: "Risky", desc: "50%+ reviews are potentially fake" }
];
function TrustBadge() {
  const [productName, setProductName] = reactExports.useState("");
  const [trustLevel, setTrustLevel] = reactExports.useState("trusted");
  const [trustScore, setTrustScore] = reactExports.useState(85);
  const [loading, setLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  async function handleGenerate() {
    if (!productName.trim()) return;
    setLoading(true);
    try {
      const badge = await generateTrustBadge(
        productName.trim(),
        trustLevel,
        trustScore
      );
      setResult(badge);
    } finally {
      setLoading(false);
    }
  }
  async function handleCopy(text) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Trust Badge Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Generate an embeddable AI-verified trust badge for your product listings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Configure Badge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Fill in your product details to generate a badge." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-display font-medium text-foreground block mb-1.5",
                htmlFor: "product-name",
                children: "Product Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "product-name",
                type: "text",
                className: "w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                placeholder: "e.g. Wireless Headphones Pro",
                value: productName,
                onChange: (e) => setProductName(e.target.value),
                "data-ocid": "badge-product-name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground block mb-1.5", children: "Trust Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                role: "radiogroup",
                "aria-label": "Trust Level",
                className: "space-y-2",
                children: TRUST_LEVELS.map(({ value, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTrustLevel(value),
                    className: `w-full flex items-center gap-3 p-3 rounded-lg border transition-smooth text-left ${trustLevel === value ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"}`,
                    "data-ocid": `trust-level-${value}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: value, showIcon: true, children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: desc })
                    ]
                  },
                  value
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "trust-score",
                className: "text-sm font-display font-medium text-foreground block mb-1.5",
                children: [
                  "Trust Score:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                    trustScore,
                    "%"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "trust-score",
                type: "range",
                min: 0,
                max: 100,
                value: trustScore,
                onChange: (e) => setTrustScore(Number(e.target.value)),
                className: "w-full accent-primary",
                "data-ocid": "trust-score-slider"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleGenerate,
              loading,
              disabled: !productName.trim(),
              className: "w-full",
              "data-ocid": "generate-badge-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4" }),
                loading ? "Generating…" : "Generate Badge"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Badge Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Live preview of your trust badge." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[200px] bg-muted/30 rounded-lg border border-border p-6", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center animate-trust-badge", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 mb-3 ${result.trustLevel === "trusted" ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400" : result.trustLevel === "caution" ? "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400" : "bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-400"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-body opacity-80", children: "TrustCart AI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-display font-bold", children: result.trustLevel === "trusted" ? "AI Verified — Trusted" : result.trustLevel === "caution" ? "AI Verified — Caution" : "High Risk — Risky" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: result.productName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 font-body mt-1", children: [
              "Trust Score: ",
              result.trustScore,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 font-body mt-1", children: formatDate(result.generatedAt) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body", children: "Your badge will appear here" })
          ] }) }),
          result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-medium text-muted-foreground uppercase tracking-wide", children: "Embed Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs bg-muted/60 border border-border rounded-lg p-3 overflow-x-auto font-mono text-foreground whitespace-pre-wrap break-all", children: result.badgeHtml }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCopy(result.badgeHtml),
                  className: "absolute top-2 right-2 p-1.5 rounded-md bg-card border border-border hover:bg-muted transition-smooth",
                  "aria-label": "Copy embed code",
                  "data-ocid": "copy-badge-html",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  TrustBadge as default
};
