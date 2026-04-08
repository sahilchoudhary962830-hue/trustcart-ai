import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { analyzeReview } from "@/lib/api";
import { cn, formatDate, getVerdictColor } from "@/lib/utils";
import type { ReviewAnalysis } from "@/types";
import { AlertCircle, AlertTriangle, Info, Search } from "lucide-react";
import { useState } from "react";

const EXAMPLES = [
  "This product is absolutely amazing! Best purchase ever! Perfect in every way! Totally recommend!!",
  "Good product overall. The build quality is decent but the battery life could be better. Delivery was fast though.",
  "I've been using this for 3 months. The initial setup was a bit tricky but once configured it works reliably. The app could use some improvement.",
];

export default function ReviewAnalyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeReview(text.trim());
      setResult(analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Review Analyzer
          </h1>
          <p className="text-muted-foreground font-body">
            Paste a product review to get an instant AI authenticity assessment.
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <textarea
              className="w-full min-h-[140px] bg-muted/40 border border-input rounded-lg p-4 text-sm font-body text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              placeholder="Paste review text here… (minimum 20 characters)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              data-ocid="review-input"
            />
            <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
              <span className="text-xs text-muted-foreground font-body">
                Try an example:
              </span>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={ex.slice(0, 20)}
                  type="button"
                  onClick={() => setText(ex)}
                  className="text-xs px-2 py-1 rounded border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  data-ocid={`example-btn-${i}`}
                >
                  Example {i + 1}
                </button>
              ))}
            </div>
            <Button
              onClick={handleAnalyze}
              loading={loading}
              disabled={text.trim().length < 20}
              className="w-full sm:w-auto"
              data-ocid="analyze-submit"
            >
              <Search className="w-4 h-4" />
              {loading ? "Analyzing…" : "Analyze for Authenticity"}
            </Button>
            {error && (
              <p className="mt-3 text-sm text-destructive font-body flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <div className="space-y-5 slide-up">
            {/* Score overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle>Analysis Result</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={result.verdict} size="md" showIcon>
                      {result.verdict.charAt(0).toUpperCase() +
                        result.verdict.slice(1)}{" "}
                      Review
                    </Badge>
                    <span className="text-xs text-muted-foreground font-body">
                      {formatDate(result.analyzedAt)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="flex gap-8">
                    <div className="text-center">
                      <ScoreRing
                        score={result.fakeScore}
                        size={110}
                        label="Fake Score"
                      />
                    </div>
                    <div className="text-center">
                      <ScoreRing
                        score={result.trustScore}
                        size={110}
                        label="Trust Score"
                        invert
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/40 border border-border">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-body text-foreground leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flags */}
            {result.flags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detected Signals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.flags.map((flag) => (
                      <div
                        key={`${flag.type}-${flag.confidence}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-display font-medium text-foreground capitalize">
                              {flag.type} pattern
                            </span>
                            <Badge variant="caution">
                              {Math.round(flag.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground font-body">
                            {flag.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Analyzed Text</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-sm font-body leading-relaxed",
                    getVerdictColor(result.verdict),
                  )}
                >
                  "{result.reviewText}"
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
