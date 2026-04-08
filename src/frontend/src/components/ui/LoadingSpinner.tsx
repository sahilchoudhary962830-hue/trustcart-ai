import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "rounded-full border-muted border-t-primary animate-spin",
        sizeMap[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </div>
  );
}
