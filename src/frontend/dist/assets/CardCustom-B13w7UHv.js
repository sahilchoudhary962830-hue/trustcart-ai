import { j as jsxRuntimeExports, c as cn } from "./index-CQoy5yrU.js";
function Card({
  className,
  children,
  hover = false,
  glass = false,
  onClick
}) {
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick,
      onKeyDown: onClick ? handleKeyDown : void 0,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      className: cn(
        "rounded-lg border border-border bg-card text-card-foreground",
        hover && "transition-smooth hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
        glass && "bg-card/80 backdrop-blur-sm",
        onClick && "cursor-pointer",
        className
      ),
      children
    }
  );
}
function CardHeader({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 p-6", className), children });
}
function CardTitle({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      className: cn(
        "font-display font-semibold text-lg leading-none tracking-tight text-card-foreground",
        className
      ),
      children
    }
  );
}
function CardDescription({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm text-muted-foreground font-body", className), children });
}
function CardContent({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-6 pt-0", className), children });
}
export {
  Card as C,
  CardContent as a,
  CardHeader as b,
  CardTitle as c,
  CardDescription as d
};
