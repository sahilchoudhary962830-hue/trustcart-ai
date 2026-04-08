import { r as reactExports, j as jsxRuntimeExports, c as cn, b as getFakeScoreColor } from "./index-CQoy5yrU.js";
function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  className,
  invert = false
}) {
  const [animatedScore, setAnimatedScore] = reactExports.useState(0);
  const animRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const start = 0;
    const end = score;
    const duration = 900;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimatedScore(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [score]);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const displayScore = invert ? 100 - animatedScore : animatedScore;
  const strokeDashoffset = circumference - displayScore / 100 * circumference;
  const color = invert ? getFakeScoreColor(100 - animatedScore) : getFakeScoreColor(animatedScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "relative inline-flex items-center justify-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: size,
            height: size,
            viewBox: `0 0 ${size} ${size}`,
            className: "-rotate-90",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: size / 2,
                  cy: size / 2,
                  r: radius,
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth,
                  className: "text-muted"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: size / 2,
                  cy: size / 2,
                  r: radius,
                  fill: "none",
                  stroke: color,
                  strokeWidth,
                  strokeDasharray: circumference,
                  strokeDashoffset,
                  strokeLinecap: "round",
                  style: { transition: "stroke-dashoffset 0.05s ease" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display font-bold leading-none",
              style: { fontSize: size * 0.2, color },
              children: [
                animatedScore,
                "%"
              ]
            }
          ),
          label && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-muted-foreground font-body leading-tight text-center mt-0.5",
              style: { fontSize: size * 0.1 },
              children: label
            }
          ),
          sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-muted-foreground/70 font-body leading-tight text-center",
              style: { fontSize: size * 0.085 },
              children: sublabel
            }
          )
        ] })
      ]
    }
  );
}
export {
  ScoreRing as S
};
