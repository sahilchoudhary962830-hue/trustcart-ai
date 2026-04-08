import { r as reactExports, j as jsxRuntimeExports, a as formatScore, f as formatDate } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, L as Layout, B as Button, b as ShoppingBag } from "./Layout-C9fB1GFD.js";
import { T as TrustBadge } from "./BadgeCustom-D06qMwrv.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./CardCustom-B13w7UHv.js";
import { S as ScoreRing } from "./ScoreRing-Batavolv.js";
import { c as checkProductUrl } from "./api-DPQZoKDZ.js";
import { C as CircleAlert } from "./circle-alert-B-tjtYIV.js";
import { T as TrendingDown } from "./trending-down-CDYtorlw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function ProductChecker() {
  const [url, setUrl] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  async function handleCheck() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const check = await checkProductUrl(url.trim());
      setResult(check);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Product Trust Checker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Enter a product URL from Amazon or Flipkart to analyze all reviews." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            className: "flex-1 h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
            placeholder: "https://amazon.com/dp/... or https://flipkart.com/...",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleCheck();
            },
            "data-ocid": "product-url-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleCheck,
            loading,
            disabled: !url.trim(),
            "data-ocid": "checker-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
              loading ? "Scanning…" : "Check"
            ]
          }
        )
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground font-body animate-pulse", children: "Scanning product reviews… This may take a moment." }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-destructive font-body flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
        " ",
        error
      ] })
    ] }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: result.productName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body", children: result.platform }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: result.productUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline inline-flex items-center gap-1 text-xs",
                children: [
                  "View product ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadge, { level: result.trustLevel })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreRing,
            {
              score: result.fakePercentage,
              size: 110,
              label: "Fake Reviews"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/40 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1 font-body", children: "Total Reviews" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: result.totalReviews.toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-red-500/10 border border-red-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-red-500/80 mb-1 font-body", children: "Fake Detected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-red-500", children: result.fakeCount.toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/40 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-1 font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
                " Original Rating"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: result.originalRating.toFixed(1) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-accent/10 border border-accent/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-accent/80 mb-1 font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
                " Corrected Rating"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-accent", children: result.correctedRating.toFixed(1) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 rounded-lg bg-muted/30 border border-border flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-body text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: formatScore(result.fakePercentage) }),
          " ",
          "of reviews flagged as potentially fake. Rating correction:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive font-medium", children: [
            "−",
            result.ratingCorrection.toFixed(1),
            " stars"
          ] }),
          "."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground font-body text-right", children: [
          "Checked ",
          formatDate(result.checkedAt)
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  ProductChecker as default
};
