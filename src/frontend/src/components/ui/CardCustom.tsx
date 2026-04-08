import { cn } from "@/lib/utils";
import type { KeyboardEvent, ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({
  className,
  children,
  hover = false,
  glass = false,
  onClick,
}: CardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground",
        hover &&
          "transition-smooth hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
        glass && "bg-card/80 backdrop-blur-sm",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return (
    <h3
      className={cn(
        "font-display font-semibold text-lg leading-none tracking-tight text-card-foreground",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-sm text-muted-foreground font-body", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}
