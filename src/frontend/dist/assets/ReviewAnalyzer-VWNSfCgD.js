import { r as reactExports, j as jsxRuntimeExports, f as formatDate, c as cn, g as getVerdictColor } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, L as Layout, B as Button, a as Search } from "./Layout-C9fB1GFD.js";
import { B as Badge } from "./BadgeCustom-D06qMwrv.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./CardCustom-B13w7UHv.js";
import { S as ScoreRing } from "./ScoreRing-Batavolv.js";
import { a as analyzeReview } from "./api-DPQZoKDZ.js";
import { C as CircleAlert } from "./circle-alert-B-tjtYIV.js";
import { T as TriangleAlert } from "./triangle-alert-BxszCaBC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const EXAMPLES = [
  "This product is absolutely amazing! Best purchase ever! Perfect in every way! Totally recommend!!",
  "Good product overall. The build quality is decent but the battery life could be better. Delivery was fast though.",
  "I've been using this for 3 months. The initial setup was a bit tricky but once configured it works reliably. The app could use some improvement."
];
function ReviewAnalyzer() {
  const [text, setText] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  async function handleAnalyze() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeReview(text.trim());
      setResult(analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Review Analyzer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Paste a product review to get an instant AI authenticity assessment." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full min-h-[140px] bg-muted/40 border border-input rounded-lg p-4 text-sm font-body text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
          placeholder: "Paste review text here… (minimum 20 characters)",
          value: text,
          onChange: (e) => setText(e.target.value),
          "data-ocid": "review-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "Try an example:" }),
        EXAMPLES.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setText(ex),
            className: "text-xs px-2 py-1 rounded border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
            "data-ocid": `example-btn-${i}`,
            children: [
              "Example ",
              i + 1
            ]
          },
          ex.slice(0, 20)
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleAnalyze,
          loading,
          disabled: text.trim().length < 20,
          className: "w-full sm:w-auto",
          "data-ocid": "analyze-submit",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
            loading ? "Analyzing…" : "Analyze for Authenticity"
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-destructive font-body flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
        " ",
        error
      ] })
    ] }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Analysis Result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: result.verdict, size: "md", showIcon: true, children: [
              result.verdict.charAt(0).toUpperCase() + result.verdict.slice(1),
              " ",
              "Review"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: formatDate(result.analyzedAt) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreRing,
              {
                score: result.fakeScore,
                size: 110,
                label: "Fake Score"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreRing,
              {
                score: result.trustScore,
                size: 110,
                label: "Trust Score",
                invert: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-4 rounded-lg bg-muted/40 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground leading-relaxed", children: result.explanation })
          ] }) })
        ] }) })
      ] }),
      result.flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Detected Signals" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: result.flags.map((flag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-500 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display font-medium text-foreground capitalize", children: [
                    flag.type,
                    " pattern"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "caution", children: [
                    Math.round(flag.confidence * 100),
                    "% confidence"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: flag.description })
              ] })
            ]
          },
          `${flag.type}-${flag.confidence}`
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Analyzed Text" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: cn(
              "text-sm font-body leading-relaxed",
              getVerdictColor(result.verdict)
            ),
            children: [
              '"',
              result.reviewText,
              '"'
            ]
          }
        ) })
      ] })
    ] })
  ] }) });
}
export {
  ReviewAnalyzer as default
};
