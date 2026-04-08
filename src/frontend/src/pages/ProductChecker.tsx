import { Layout } from "@/components/Layout";
import { TrustBadge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { checkProductUrl } from "@/lib/api";
import { formatDate, formatScore } from "@/lib/utils";
import type { ProductCheck } from "@/types";
import {
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  Star,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

export default function ProductChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheck() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const check = await checkProductUrl(url.trim());
      setResult(check);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Product Trust Checker
          </h1>
          <p className="text-muted-foreground font-body">
            Enter a product URL from Amazon or Flipkart to analyze all reviews.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <input
                type="url"
                className="flex-1 h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                placeholder="https://amazon.com/dp/... or https://flipkart.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCheck();
                }}
                data-ocid="product-url-input"
              />
              <Button
                onClick={handleCheck}
                loading={loading}
                disabled={!url.trim()}
                data-ocid="checker-submit"
              >
                <ShoppingBag className="w-4 h-4" />
                {loading ? "Scanning…" : "Check"}
              </Button>
            </div>
            {loading && (
              <p className="mt-3 text-sm text-muted-foreground font-body animate-pulse">
                Scanning product reviews… This may take a moment.
              </p>
            )}
            {error && (
              <p className="mt-3 text-sm text-destructive font-body flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </p>
            )}
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-5 slide-up">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{result.productName}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground font-body">
                        {result.platform}
                      </span>
                      <a
                        href={result.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 text-xs"
                      >
                        View product <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <TrustBadge level={result.trustLevel} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 items-center">
                  <ScoreRing
                    score={result.fakePercentage}
                    size={110}
                    label="Fake Reviews"
                  />
                  <div className="flex-1 min-w-0 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/40 border border-border">
                      <div className="text-xs text-muted-foreground mb-1 font-body">
                        Total Reviews
                      </div>
                      <div className="text-2xl font-display font-bold text-foreground">
                        {result.totalReviews.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="text-xs text-red-500/80 mb-1 font-body">
                        Fake Detected
                      </div>
                      <div className="text-2xl font-display font-bold text-red-500">
                        {result.fakeCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/40 border border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1 font-body">
                        <Star className="w-3 h-3" /> Original Rating
                      </div>
                      <div className="text-2xl font-display font-bold text-foreground">
                        {result.originalRating.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-1 text-xs text-accent/80 mb-1 font-body">
                        <TrendingDown className="w-3 h-3" /> Corrected Rating
                      </div>
                      <div className="text-2xl font-display font-bold text-accent">
                        {result.correctedRating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border flex items-center gap-3">
                  <div className="text-sm font-body text-muted-foreground">
                    <span className="font-display font-semibold text-foreground">
                      {formatScore(result.fakePercentage)}
                    </span>{" "}
                    of reviews flagged as potentially fake. Rating correction:{" "}
                    <span className="text-destructive font-medium">
                      −{result.ratingCorrection.toFixed(1)} stars
                    </span>
                    .
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground font-body text-right">
                  Checked {formatDate(result.checkedAt)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
