import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Search,
  Shield,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Review Analyzer",
    description:
      "Paste any product review and get an instant AI-powered authenticity score with detailed flag analysis.",
    badge: "Core Feature",
    href: "/analyzer",
  },
  {
    icon: ShoppingBag,
    title: "Product Trust Checker",
    description:
      "Enter a product URL from Amazon or Flipkart to scan all reviews and get a Trust Badge.",
    badge: "Popular",
    href: "/checker",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track your review history, fake detection trends, and platform-wide insights in one place.",
    badge: "Insights",
    href: "/dashboard",
  },
  {
    icon: Award,
    title: "Trust Badge Generator",
    description:
      "Generate an embeddable AI-verified trust badge for your product listings.",
    badge: "For Sellers",
    href: "/trust-badge",
  },
];

const stats = [
  { label: "Reviews Analyzed", value: "18.4M+" },
  { label: "Fake Reviews Caught", value: "6.2M+" },
  { label: "Products Verified", value: "384K+" },
  { label: "Accuracy Rate", value: "97.3%" },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-display font-semibold text-accent tracking-wide uppercase">
                AI-Powered Review Intelligence
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-6">
              Stop Fake Reviews from{" "}
              <span className="text-primary">Misleading</span> Buyers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10">
              TrustCart AI uses advanced NLP to detect bot reviews, paid
              reviews, and duplicate spam — helping shoppers make informed
              decisions and sellers build real credibility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analyzer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  data-ocid="hero-cta-analyzer"
                >
                  Analyze a Review <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/checker">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  data-ocid="hero-cta-checker"
                >
                  Check a Product URL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 border-b border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-primary mb-1">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Everything you need to detect fake reviews
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              A complete suite of AI-powered tools for customers, sellers, and
              platform administrators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map(({ icon: Icon, title, description, badge, href }) => (
              <Link key={href} to={href} className="block group">
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display font-semibold text-foreground">
                          {title}
                        </h3>
                        <Badge variant="secondary">{badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-display font-medium text-primary group-hover:gap-2 gap-1 transition-smooth">
                    Get started <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 border-y border-border py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              How TrustCart AI Works
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Our multi-layer NLP pipeline analyzes reviews across several
              dimensions in real time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                step: "01",
                title: "Submit Review or URL",
                desc: "Paste review text or a product URL from any major e-commerce platform.",
              },
              {
                icon: TrendingUp,
                step: "02",
                title: "AI Analyzes Patterns",
                desc: "Our NLP engine scans for bot patterns, spam signals, sentiment anomalies, and duplicates.",
              },
              {
                icon: CheckCircle2,
                step: "03",
                title: "Get Trust Report",
                desc: "Receive a detailed report with fake score, trust badge, and actionable insights.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative inline-flex mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {step.slice(1)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Don't let fake reviews cost you
            </h2>
            <p className="text-muted-foreground font-body mb-8">
              Over 30% of online reviews are estimated to be fake. TrustCart AI
              gives you the tools to fight back.
            </p>
            <Link to="/signup">
              <Button size="lg" data-ocid="home-cta-signup">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
