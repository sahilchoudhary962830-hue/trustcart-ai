import { cn } from "@/lib/utils";
import { getFakeScoreColor } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  invert?: boolean; // if true, green=high (trust score), red=low
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  className,
  invert = false,
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const start = 0;
    const end = score;
    const duration = 900;
    const startTime = performance.now();

    function animate(now: number) {
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
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const color = invert
    ? getFakeScoreColor(100 - animatedScore)
    : getFakeScoreColor(animatedScore);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Animated progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.05s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-bold leading-none"
          style={{ fontSize: size * 0.2, color }}
        >
          {animatedScore}%
        </span>
        {label && (
          <span
            className="text-muted-foreground font-body leading-tight text-center mt-0.5"
            style={{ fontSize: size * 0.1 }}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            className="text-muted-foreground/70 font-body leading-tight text-center"
            style={{ fontSize: size * 0.085 }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
