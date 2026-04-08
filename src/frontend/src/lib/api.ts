import type {
  AdminUserEntry,
  DashboardStats,
  PlatformStats,
  ProductCheck,
  ReviewAnalysis,
  ReviewFlag,
  SuspiciousProduct,
  TrustBadgeResult,
  TrustLevel,
  UserRole,
} from "@/types";

// Since backend interface is not yet fully bound, we simulate with realistic data
// This will be replaced with real actor calls once bindgen runs with full backend

export function setActor(_actor: unknown) {
  void _actor; // reserved for future backend binding
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export interface SignupResult {
  token: string;
  userId: string;
  username: string;
  role: UserRole;
}

export async function signup(
  username: string,
  email: string,
  _password: string,
): Promise<SignupResult> {
  await delay(600);
  if (username === "taken") throw new Error("Username already taken");
  return {
    token: `tok_${Date.now()}`,
    userId: `user_${Date.now()}`,
    username,
    role: email.includes("admin") ? "admin" : "user",
  };
}

export async function login(
  email: string,
  password: string,
): Promise<SignupResult> {
  await delay(600);
  if (password === "wrong") throw new Error("Invalid credentials");
  return {
    token: `tok_${Date.now()}`,
    userId: `user_${Date.now()}`,
    username: email.split("@")[0],
    role: email.includes("admin") ? "admin" : "user",
  };
}

export async function validateSession(
  token: string,
): Promise<SignupResult | null> {
  if (!token) return null;
  await delay(200);
  return null; // In production, validate with backend
}

// ─── Review Analysis ─────────────────────────────────────────────────────────

export async function analyzeReview(
  reviewText: string,
): Promise<ReviewAnalysis> {
  await delay(1200);
  return generateMockAnalysis(reviewText);
}

export async function getUserAnalyses(): Promise<ReviewAnalysis[]> {
  await delay(400);
  return MOCK_ANALYSES;
}

export async function getAnalysisById(
  id: string,
): Promise<ReviewAnalysis | null> {
  await delay(300);
  return MOCK_ANALYSES.find((a) => a.id === id) ?? null;
}

export async function deleteAnalysis(_id: string): Promise<void> {
  await delay(300);
  // In production: actor.deleteAnalysis(id)
}

// ─── Product Checker ──────────────────────────────────────────────────────────

export async function checkProductUrl(url: string): Promise<ProductCheck> {
  await delay(2000);
  return generateMockProductCheck(url);
}

export async function getUserProductChecks(): Promise<ProductCheck[]> {
  await delay(400);
  return MOCK_PRODUCT_CHECKS;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(500);
  return MOCK_DASHBOARD_STATS;
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export async function getAdminStats(): Promise<PlatformStats> {
  await delay(400);
  return {
    totalUsers: 4287,
    totalAnalyses: 18432,
    totalFakeDetected: 6219,
    totalProductChecks: 3847,
    averageFakeRate: 33.7,
  };
}

export async function getAdminUsers(): Promise<AdminUserEntry[]> {
  await delay(400);
  return MOCK_ADMIN_USERS;
}

export async function deleteUser(_userId: string): Promise<void> {
  await delay(400);
}

export async function getTrendingSuspiciousProducts(): Promise<
  SuspiciousProduct[]
> {
  await delay(400);
  return MOCK_SUSPICIOUS_PRODUCTS;
}

// ─── Trust Badge ─────────────────────────────────────────────────────────────

export async function generateTrustBadge(
  productName: string,
  trustLevel: TrustLevel,
  trustScore: number,
): Promise<TrustBadgeResult> {
  await delay(800);
  const productId = `prod_${Date.now()}`;
  const badgeHtml = `<a href="https://trustcart.ai/verify/${productId}" target="_blank" rel="noopener">
  <img src="https://trustcart.ai/badge/${productId}.svg" alt="TrustCart AI Verified" width="120" height="40" />
</a>`;
  return {
    productId,
    productName,
    trustLevel,
    trustScore,
    badgeHtml,
    badgeUrl: `https://trustcart.ai/badge/${productId}.svg`,
    generatedAt: Date.now(),
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateMockAnalysis(text: string): ReviewAnalysis {
  const words = text.toLowerCase().split(/\s+/);
  const spamWords = [
    "amazing",
    "best",
    "perfect",
    "awesome",
    "great",
    "love",
    "excellent",
  ];
  const spamCount = words.filter((w) => spamWords.includes(w)).length;
  const fakeScore = Math.min(
    95,
    Math.max(5, spamCount * 15 + Math.random() * 30),
  );
  const trustScore = 100 - fakeScore;

  const flags: ReviewFlag[] = [];
  if (fakeScore > 60) {
    flags.push({
      type: "bot",
      confidence: 0.82,
      description: "Repetitive phrasing patterns detected",
    });
    flags.push({
      type: "generic",
      confidence: 0.74,
      description: "Generic superlatives without specifics",
    });
  }
  if (text.length < 50) {
    flags.push({
      type: "spam",
      confidence: 0.65,
      description: "Review too short to be informative",
    });
  }

  return {
    id: `ana_${Date.now()}`,
    userId: "current_user",
    reviewText: text,
    fakeScore: Math.round(fakeScore),
    trustScore: Math.round(trustScore),
    sentimentScore: Math.round(50 + Math.random() * 50),
    flags,
    explanation:
      fakeScore > 60
        ? "This review shows multiple indicators of being artificially generated. Excessive superlatives, lack of specific details, and repetitive sentence structure suggest bot or paid review activity."
        : fakeScore > 30
          ? "This review shows some suspicious patterns but may be genuine. A few generic phrases were detected, but the overall content appears reasonable."
          : "This review appears authentic. It contains specific details, balanced sentiment, and natural language patterns consistent with genuine customer feedback.",
    verdict: fakeScore > 60 ? "fake" : fakeScore > 30 ? "suspicious" : "real",
    analyzedAt: Date.now(),
  };
}

function generateMockProductCheck(url: string): ProductCheck {
  const fakePercentage = Math.round(20 + Math.random() * 55);
  const originalRating = 3.5 + Math.random() * 1.5;
  const ratingCorrection = (fakePercentage / 100) * 1.2;
  return {
    id: `chk_${Date.now()}`,
    userId: "current_user",
    productUrl: url,
    productName: url.includes("amazon")
      ? "Amazon Product"
      : url.includes("flipkart")
        ? "Flipkart Product"
        : "E-commerce Product",
    platform: url.includes("amazon")
      ? "Amazon"
      : url.includes("flipkart")
        ? "Flipkart"
        : "Unknown",
    totalReviews: Math.round(100 + Math.random() * 900),
    fakeCount: Math.round(50 + Math.random() * 200),
    fakePercentage,
    ratingCorrection: Number.parseFloat(ratingCorrection.toFixed(1)),
    originalRating: Number.parseFloat(originalRating.toFixed(1)),
    correctedRating: Number.parseFloat(
      Math.max(1, originalRating - ratingCorrection).toFixed(1),
    ),
    trustLevel:
      fakePercentage < 25
        ? "trusted"
        : fakePercentage < 50
          ? "caution"
          : "risky",
    checkedAt: Date.now(),
  };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ANALYSES: ReviewAnalysis[] = [
  {
    id: "ana_001",
    userId: "user_001",
    reviewText:
      "This product is absolutely amazing! Best purchase ever! Perfect in every way!",
    fakeScore: 87,
    trustScore: 13,
    sentimentScore: 95,
    flags: [
      {
        type: "bot",
        confidence: 0.89,
        description: "Excessive superlatives without specific details",
      },
      {
        type: "generic",
        confidence: 0.77,
        description: "Templated praise language detected",
      },
    ],
    explanation:
      "High probability of being a paid or bot-generated review. Multiple fake indicators detected.",
    verdict: "fake",
    analyzedAt: Date.now() - 86400000,
  },
  {
    id: "ana_002",
    userId: "user_001",
    reviewText:
      "Good product overall. The build quality is decent but the battery life could be better. Delivery was fast though.",
    fakeScore: 14,
    trustScore: 86,
    sentimentScore: 62,
    flags: [],
    explanation:
      "Review appears genuine with balanced feedback, specific details, and natural language.",
    verdict: "real",
    analyzedAt: Date.now() - 172800000,
  },
  {
    id: "ana_003",
    userId: "user_001",
    reviewText: "Okay product. Works as described. Nothing special.",
    fakeScore: 42,
    trustScore: 58,
    sentimentScore: 50,
    flags: [
      {
        type: "spam",
        confidence: 0.52,
        description: "Minimal information provided",
      },
    ],
    explanation:
      "Slightly suspicious due to brevity but may be a genuine short review.",
    verdict: "suspicious",
    analyzedAt: Date.now() - 259200000,
  },
];

const MOCK_PRODUCT_CHECKS: ProductCheck[] = [
  {
    id: "chk_001",
    userId: "user_001",
    productUrl: "https://amazon.com/dp/B08N5WRWNW",
    productName: "Wireless Noise Cancelling Headphones",
    platform: "Amazon",
    totalReviews: 847,
    fakeCount: 312,
    fakePercentage: 37,
    ratingCorrection: 0.8,
    originalRating: 4.5,
    correctedRating: 3.7,
    trustLevel: "caution",
    checkedAt: Date.now() - 3600000,
  },
  {
    id: "chk_002",
    userId: "user_001",
    productUrl: "https://flipkart.com/product/smartphone-xyz",
    productName: "Budget Smartphone Pro Max",
    platform: "Flipkart",
    totalReviews: 2341,
    fakeCount: 1427,
    fakePercentage: 61,
    ratingCorrection: 1.4,
    originalRating: 4.8,
    correctedRating: 3.4,
    trustLevel: "risky",
    checkedAt: Date.now() - 7200000,
  },
];

const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalAnalyzed: 1243,
  fakeDetected: 389,
  realVerified: 854,
  productsChecked: 67,
  trustScore: 87,
  recentAnalyses: MOCK_ANALYSES,
  recentProducts: MOCK_PRODUCT_CHECKS,
};

const MOCK_ADMIN_USERS: AdminUserEntry[] = [
  {
    id: "u001",
    username: "sarah_chen",
    email: "sarah@ecommerce.com",
    role: "user",
    createdAt: Date.now() - 2592000000,
    analyzeCount: 234,
    isActive: true,
  },
  {
    id: "u002",
    username: "raj_kumar",
    email: "raj@seller.in",
    role: "user",
    createdAt: Date.now() - 1728000000,
    analyzeCount: 89,
    isActive: true,
  },
  {
    id: "u003",
    username: "admin_trust",
    email: "admin@trustcart.ai",
    role: "admin",
    createdAt: Date.now() - 5184000000,
    analyzeCount: 1203,
    isActive: true,
  },
  {
    id: "u004",
    username: "mei_zhang",
    email: "mei@marketplace.cn",
    role: "user",
    createdAt: Date.now() - 864000000,
    analyzeCount: 45,
    isActive: false,
  },
  {
    id: "u005",
    username: "carlos_m",
    email: "carlos@tienda.mx",
    role: "user",
    createdAt: Date.now() - 432000000,
    analyzeCount: 167,
    isActive: true,
  },
];

const MOCK_SUSPICIOUS_PRODUCTS: SuspiciousProduct[] = [
  {
    productUrl: "https://amazon.com/dp/FAKE001",
    productName: "Ultra Slim Miracle Supplement",
    fakePercentage: 94,
    totalReviews: 3421,
    trustLevel: "risky",
  },
  {
    productUrl: "https://amazon.com/dp/FAKE002",
    productName: "Gaming Chair Pro 9000",
    fakePercentage: 78,
    totalReviews: 1876,
    trustLevel: "risky",
  },
  {
    productUrl: "https://flipkart.com/FAKE003",
    productName: "Budget Earbuds Premium",
    fakePercentage: 71,
    totalReviews: 2103,
    trustLevel: "risky",
  },
  {
    productUrl: "https://amazon.com/dp/FAKE004",
    productName: "Smart Watch Fitness Band",
    fakePercentage: 65,
    totalReviews: 987,
    trustLevel: "risky",
  },
  {
    productUrl: "https://flipkart.com/FAKE005",
    productName: "Instant Hair Growth Serum",
    fakePercentage: 91,
    totalReviews: 4512,
    trustLevel: "risky",
  },
];
