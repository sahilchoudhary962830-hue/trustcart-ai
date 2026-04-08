import { j as jsxRuntimeExports, L as Link } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, L as Layout, S as Shield, B as Button, a as Search, b as ShoppingBag, C as ChartColumn, A as Award } from "./Layout-C9fB1GFD.js";
import { B as Badge } from "./BadgeCustom-D06qMwrv.js";
import { T as TrendingUp } from "./trending-up-BfQxn7pW.js";
import { T as TriangleAlert } from "./triangle-alert-BxszCaBC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const features = [
  {
    icon: Search,
    title: "Review Analyzer",
    description: "Paste any product review and get an instant AI-powered authenticity score with detailed flag analysis.",
    badge: "Core Feature",
    href: "/analyzer"
  },
  {
    icon: ShoppingBag,
    title: "Product Trust Checker",
    description: "Enter a product URL from Amazon or Flipkart to scan all reviews and get a Trust Badge.",
    badge: "Popular",
    href: "/checker"
  },
  {
    icon: ChartColumn,
    title: "Analytics Dashboard",
    description: "Track your review history, fake detection trends, and platform-wide insights in one place.",
    badge: "Insights",
    href: "/dashboard"
  },
  {
    icon: Award,
    title: "Trust Badge Generator",
    description: "Generate an embeddable AI-verified trust badge for your product listings.",
    badge: "For Sellers",
    href: "/trust-badge"
  }
];
const stats = [
  { label: "Reviews Analyzed", value: "18.4M+" },
  { label: "Fake Reviews Caught", value: "6.2M+" },
  { label: "Products Verified", value: "384K+" },
  { label: "Accuracy Rate", value: "97.3%" }
];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-24 md:py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold text-accent tracking-wide uppercase", children: "AI-Powered Review Intelligence" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-6", children: [
          "Stop Fake Reviews from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Misleading" }),
          " Buyers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10", children: "TrustCart AI uses advanced NLP to detect bot reviews, paid reviews, and duplicate spam — helping shoppers make informed decisions and sellers build real credibility." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analyzer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "w-full sm:w-auto",
              "data-ocid": "hero-cta-analyzer",
              children: [
                "Analyze a Review ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checker", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "lg",
              className: "w-full sm:w-auto",
              "data-ocid": "hero-cta-checker",
              children: "Check a Product URL"
            }
          ) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl md:text-3xl text-primary mb-1", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-body", children: label })
    ] }, label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Everything you need to detect fake reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto font-body", children: "A complete suite of AI-powered tools for customers, sellers, and platform administrators." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: features.map(({ icon: Icon, title, description, badge, href }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-primary/10 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: badge })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center text-sm font-display font-medium text-primary group-hover:gap-2 gap-1 transition-smooth", children: [
          "Get started ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
        ] })
      ] }) }, href)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-4", children: "How TrustCart AI Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-lg mx-auto", children: "Our multi-layer NLP pipeline analyzes reviews across several dimensions in real time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: [
        {
          icon: Search,
          step: "01",
          title: "Submit Review or URL",
          desc: "Paste review text or a product URL from any major e-commerce platform."
        },
        {
          icon: TrendingUp,
          step: "02",
          title: "AI Analyzes Patterns",
          desc: "Our NLP engine scans for bot patterns, spam signals, sentiment anomalies, and duplicates."
        },
        {
          icon: CircleCheck,
          step: "03",
          title: "Get Trust Report",
          desc: "Receive a detailed report with fake score, trust badge, and actionable insights."
        }
      ].map(({ icon: Icon, step, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold", children: step.slice(1) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: desc })
      ] }, step)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-10 h-10 text-amber-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-4", children: "Don't let fake reviews cost you" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8", children: "Over 30% of online reviews are estimated to be fake. TrustCart AI gives you the tools to fight back." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", "data-ocid": "home-cta-signup", children: [
        "Create Free Account ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }) }) })
  ] });
}
export {
  Home as default
};
