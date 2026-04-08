import { j as jsxRuntimeExports, c as cn } from "./index-CQoy5yrU.js";
import { c as createLucideIcon, S as Shield } from "./Layout-C9fB1GFD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode);
const variantStyles = {
  default: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-muted text-muted-foreground border border-border",
  outline: "bg-transparent text-foreground border border-border",
  trusted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  caution: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  risky: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  real: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  suspicious: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  fake: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
};
const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1"
};
const trustIcons = {
  trusted: Shield,
  real: Shield,
  caution: ShieldAlert,
  suspicious: ShieldAlert,
  risky: ShieldOff,
  fake: ShieldOff
};
function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  showIcon = false
}) {
  const IconComponent = showIcon ? trustIcons[variant] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full font-medium font-body",
        variantStyles[variant] ?? variantStyles.default,
        sizeStyles[size],
        className
      ),
      children: [
        IconComponent && /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-3 h-3 flex-shrink-0" }),
        children
      ]
    }
  );
}
function TrustBadge({ level }) {
  const variants = {
    trusted: "trusted",
    caution: "caution",
    risky: "risky"
  };
  const labels = {
    trusted: "Trusted",
    caution: "Caution",
    risky: "Risky"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: variants[level], showIcon: true, size: "md", children: labels[level] });
}
export {
  Badge as B,
  TrustBadge as T
};
