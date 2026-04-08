import { cn } from "@/lib/utils";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline"
    | "teal";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "bg-transparent text-foreground hover:bg-muted/60",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "bg-transparent border border-border text-foreground hover:bg-muted/50",
  teal: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-display font-medium transition-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
