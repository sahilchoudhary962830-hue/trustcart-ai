import { r as reactExports, j as jsxRuntimeExports, R as React, m as LoadingSpinner, c as cn, n as create, u as useAuth, o as useRouterState, L as Link, l as useNavigate, k as LoadingPage } from "./index-CQoy5yrU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$b);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$a);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? encodeURIComponent(window.location.hostname) : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-card/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body", children: [
        "TrustCart AI —",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "AI-Powered Review Intelligence" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
      "© ",
      year,
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: caffeineUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline transition-colors",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) }) });
}
const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "bg-transparent text-foreground hover:bg-muted/60",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "bg-transparent border border-border text-foreground hover:bg-muted/50",
  teal: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg"
};
const sizeStyles = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
  icon: "h-10 w-10 rounded-lg"
};
const Button = React.forwardRef(
  ({
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref,
        disabled: disabled || loading,
        className: cn(
          "inline-flex items-center justify-center gap-2 font-display font-medium transition-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        ),
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("trustcart_theme", theme);
}
function getInitialTheme() {
  const stored = localStorage.getItem("trustcart_theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
const useTheme = create((set) => {
  const initial = getInitialTheme();
  applyTheme(initial);
  return {
    theme: initial,
    toggle: () => set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      return { theme: next };
    }),
    setTheme: (theme) => {
      applyTheme(theme);
      set({ theme });
    }
  };
});
const navLinks = [
  { href: "/analyzer", label: "Analyzer", icon: Search },
  { href: "/checker", label: "Checker", icon: ShoppingBag },
  { href: "/dashboard", label: "Dashboard", icon: ChartColumn },
  { href: "/trust-badge", label: "Trust Badge", icon: Award }
];
function Navbar() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const { isAuthenticated, username, role, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const allLinks = [
    ...navLinks,
    ...role === "admin" ? [{ href: "/admin", label: "Admin", icon: Settings }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg", children: [
          "TrustCart ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "hidden md:flex items-center gap-1",
          "data-ocid": "nav-links",
          children: allLinks.map(({ href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: href,
              className: cn(
                "px-3 py-2 rounded-md text-sm font-display font-medium transition-smooth",
                currentPath === href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              ),
              children: label
            },
            href
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggle,
            "aria-label": "Toggle theme",
            className: "p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth",
            "data-ocid": "theme-toggle",
            children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" })
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-display text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth",
              "data-ocid": "user-menu",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[100px] truncate", children: username })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: logout,
              "aria-label": "Logout",
              "data-ocid": "logout-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", "data-ocid": "login-btn", children: "Sign In" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", "data-ocid": "signup-btn", children: "Get Started" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth",
          onClick: () => setMobileOpen(!mobileOpen),
          "aria-label": "Toggle menu",
          "data-ocid": "mobile-menu-toggle",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
        }
      )
    ] }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "md:hidden border-t border-border bg-card/95 backdrop-blur-md slide-up",
        "data-ocid": "mobile-nav",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "container mx-auto px-4 py-3 flex flex-col gap-1", children: [
          allLinks.map(({ href, label, icon: Icon2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: href,
              onClick: () => setMobileOpen(false),
              className: cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth",
                currentPath === href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-4 h-4" }),
                label
              ]
            },
            href
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 mt-2 border-t border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  toggle();
                  setMobileOpen(false);
                },
                className: "flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth",
                children: [
                  theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" }),
                  theme === "dark" ? "Light mode" : "Dark mode"
                ]
              }
            ),
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  logout();
                  setMobileOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-1" }),
                  " Logout"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "Sign In" }) })
          ] })
        ] })
      }
    )
  ] });
}
function Layout({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 ${className ?? ""}`, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function ProtectedLayout({
  children,
  requireAdmin = false,
  className
}) {
  const { isAuthenticated, role, hydrated } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    } else if (requireAdmin && role !== "admin") {
      navigate({ to: "/dashboard" });
    }
  }, [hydrated, isAuthenticated, role, requireAdmin, navigate]);
  if (!hydrated) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPage, {});
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPage, {});
  if (requireAdmin && role !== "admin") return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPage, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 ${className ?? ""}`, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Award as A,
  Button as B,
  ChartColumn as C,
  Layout as L,
  ProtectedLayout as P,
  Shield as S,
  User as U,
  Search as a,
  ShoppingBag as b,
  createLucideIcon as c,
  LogOut as d
};
