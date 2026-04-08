import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { generateTrustBadge } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { TrustBadgeResult, TrustLevel } from "@/types";
import { Award, CheckCircle, Copy, Shield } from "lucide-react";
import { useState } from "react";

const TRUST_LEVELS: { value: TrustLevel; label: string; desc: string }[] = [
  {
    value: "trusted",
    label: "Trusted",
    desc: "≥75% real reviews, high confidence",
  },
  {
    value: "caution",
    label: "Caution",
    desc: "25–50% suspicious reviews detected",
  },
  { value: "risky", label: "Risky", desc: "50%+ reviews are potentially fake" },
];

export default function TrustBadge() {
  const [productName, setProductName] = useState("");
  const [trustLevel, setTrustLevel] = useState<TrustLevel>("trusted");
  const [trustScore, setTrustScore] = useState(85);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrustBadgeResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!productName.trim()) return;
    setLoading(true);
    try {
      const badge = await generateTrustBadge(
        productName.trim(),
        trustLevel,
        trustScore,
      );
      setResult(badge);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Trust Badge Generator
          </h1>
          <p className="text-muted-foreground font-body">
            Generate an embeddable AI-verified trust badge for your product
            listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Configure Badge</CardTitle>
              <CardDescription>
                Fill in your product details to generate a badge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  className="text-sm font-display font-medium text-foreground block mb-1.5"
                  htmlFor="product-name"
                >
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  className="w-full h-10 bg-muted/40 border border-input rounded-lg px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  placeholder="e.g. Wireless Headphones Pro"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  data-ocid="badge-product-name"
                />
              </div>
              <div>
                <p className="text-sm font-display font-medium text-foreground block mb-1.5">
                  Trust Level
                </p>
                <div
                  role="radiogroup"
                  aria-label="Trust Level"
                  className="space-y-2"
                >
                  {TRUST_LEVELS.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTrustLevel(value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-smooth text-left ${
                        trustLevel === value
                          ? "border-primary bg-primary/5"
                          : "border-border bg-muted/30 hover:bg-muted/50"
                      }`}
                      data-ocid={`trust-level-${value}`}
                    >
                      <Badge variant={value} showIcon>
                        {label}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-body">
                        {desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="trust-score"
                  className="text-sm font-display font-medium text-foreground block mb-1.5"
                >
                  Trust Score:{" "}
                  <span className="text-primary">{trustScore}%</span>
                </label>
                <input
                  id="trust-score"
                  type="range"
                  min={0}
                  max={100}
                  value={trustScore}
                  onChange={(e) => setTrustScore(Number(e.target.value))}
                  className="w-full accent-primary"
                  data-ocid="trust-score-slider"
                />
              </div>
              <Button
                onClick={handleGenerate}
                loading={loading}
                disabled={!productName.trim()}
                className="w-full"
                data-ocid="generate-badge-btn"
              >
                <Award className="w-4 h-4" />
                {loading ? "Generating…" : "Generate Badge"}
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badge Preview</CardTitle>
              <CardDescription>
                Live preview of your trust badge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[200px] bg-muted/30 rounded-lg border border-border p-6">
                {result ? (
                  <div className="text-center animate-trust-badge">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 mb-3 ${
                        result.trustLevel === "trusted"
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                          : result.trustLevel === "caution"
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400"
                            : "bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-400"
                      }`}
                    >
                      <Shield className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-xs font-body opacity-80">
                          TrustCart AI
                        </div>
                        <div className="text-sm font-display font-bold">
                          {result.trustLevel === "trusted"
                            ? "AI Verified — Trusted"
                            : result.trustLevel === "caution"
                              ? "AI Verified — Caution"
                              : "High Risk — Risky"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-body text-muted-foreground">
                      {result.productName}
                    </p>
                    <p className="text-xs text-muted-foreground/70 font-body mt-1">
                      Trust Score: {result.trustScore}%
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-body mt-1">
                      {formatDate(result.generatedAt)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-body">
                      Your badge will appear here
                    </p>
                  </div>
                )}
              </div>

              {result && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-display font-medium text-muted-foreground uppercase tracking-wide">
                    Embed Code
                  </p>
                  <div className="relative">
                    <pre className="text-xs bg-muted/60 border border-border rounded-lg p-3 overflow-x-auto font-mono text-foreground whitespace-pre-wrap break-all">
                      {result.badgeHtml}
                    </pre>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.badgeHtml)}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-card border border-border hover:bg-muted transition-smooth"
                      aria-label="Copy embed code"
                      data-ocid="copy-badge-html"
                    >
                      {copied ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
