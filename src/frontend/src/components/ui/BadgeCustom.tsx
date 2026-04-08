import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/types";
import { Shield, ShieldAlert, ShieldOff } from "lucide-react";

interface BadgeProps {
  variant?:
    | "default"
    | "trusted"
    | "caution"
    | "risky"
    | "fake"
    | "real"
    | "suspicious"
    | "outline"
    | "secondary";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

const variantStyles: Record<string, string> = {
  default: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-muted text-muted-foreground border border-border",
  outline: "bg-transparent text-foreground border border-border",
  trusted:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  caution:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  risky:
    "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  real: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  suspicious:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  fake: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

const trustIcons = {
  trusted: Shield,
  real: Shield,
  caution: ShieldAlert,
  suspicious: ShieldAlert,
  risky: ShieldOff,
  fake: ShieldOff,
};

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  showIcon = false,
}: BadgeProps) {
  const IconComponent = showIcon
    ? trustIcons[variant as keyof typeof trustIcons]
    : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium font-body",
        variantStyles[variant] ?? variantStyles.default,
        sizeStyles[size],
        className,
      )}
    >
      {IconComponent && <IconComponent className="w-3 h-3 flex-shrink-0" />}
      {children}
    </span>
  );
}

export function TrustBadge({ level }: { level: TrustLevel }) {
  const variants: Record<TrustLevel, "trusted" | "caution" | "risky"> = {
    trusted: "trusted",
    caution: "caution",
    risky: "risky",
  };
  const labels: Record<TrustLevel, string> = {
    trusted: "Trusted",
    caution: "Caution",
    risky: "Risky",
  };
  return (
    <Badge variant={variants[level]} showIcon size="md">
      {labels[level]}
    </Badge>
  );
}
