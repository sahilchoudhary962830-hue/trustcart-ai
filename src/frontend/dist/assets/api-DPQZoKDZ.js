async function signup(username, email, _password) {
  await delay(600);
  if (username === "taken") throw new Error("Username already taken");
  return {
    token: `tok_${Date.now()}`,
    userId: `user_${Date.now()}`,
    username,
    role: email.includes("admin") ? "admin" : "user"
  };
}
async function login(email, password) {
  await delay(600);
  if (password === "wrong") throw new Error("Invalid credentials");
  return {
    token: `tok_${Date.now()}`,
    userId: `user_${Date.now()}`,
    username: email.split("@")[0],
    role: email.includes("admin") ? "admin" : "user"
  };
}
async function analyzeReview(reviewText) {
  await delay(1200);
  return generateMockAnalysis(reviewText);
}
async function checkProductUrl(url) {
  await delay(2e3);
  return generateMockProductCheck(url);
}
async function getDashboardStats() {
  await delay(500);
  return MOCK_DASHBOARD_STATS;
}
async function getAdminStats() {
  await delay(400);
  return {
    totalUsers: 4287,
    totalAnalyses: 18432,
    totalFakeDetected: 6219,
    totalProductChecks: 3847,
    averageFakeRate: 33.7
  };
}
async function getAdminUsers() {
  await delay(400);
  return MOCK_ADMIN_USERS;
}
async function deleteUser(_userId) {
  await delay(400);
}
async function getTrendingSuspiciousProducts() {
  await delay(400);
  return MOCK_SUSPICIOUS_PRODUCTS;
}
async function generateTrustBadge(productName, trustLevel, trustScore) {
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
    generatedAt: Date.now()
  };
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateMockAnalysis(text) {
  const words = text.toLowerCase().split(/\s+/);
  const spamWords = [
    "amazing",
    "best",
    "perfect",
    "awesome",
    "great",
    "love",
    "excellent"
  ];
  const spamCount = words.filter((w) => spamWords.includes(w)).length;
  const fakeScore = Math.min(
    95,
    Math.max(5, spamCount * 15 + Math.random() * 30)
  );
  const trustScore = 100 - fakeScore;
  const flags = [];
  if (fakeScore > 60) {
    flags.push({
      type: "bot",
      confidence: 0.82,
      description: "Repetitive phrasing patterns detected"
    });
    flags.push({
      type: "generic",
      confidence: 0.74,
      description: "Generic superlatives without specifics"
    });
  }
  if (text.length < 50) {
    flags.push({
      type: "spam",
      confidence: 0.65,
      description: "Review too short to be informative"
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
    explanation: fakeScore > 60 ? "This review shows multiple indicators of being artificially generated. Excessive superlatives, lack of specific details, and repetitive sentence structure suggest bot or paid review activity." : fakeScore > 30 ? "This review shows some suspicious patterns but may be genuine. A few generic phrases were detected, but the overall content appears reasonable." : "This review appears authentic. It contains specific details, balanced sentiment, and natural language patterns consistent with genuine customer feedback.",
    verdict: fakeScore > 60 ? "fake" : fakeScore > 30 ? "suspicious" : "real",
    analyzedAt: Date.now()
  };
}
function generateMockProductCheck(url) {
  const fakePercentage = Math.round(20 + Math.random() * 55);
  const originalRating = 3.5 + Math.random() * 1.5;
  const ratingCorrection = fakePercentage / 100 * 1.2;
  return {
    id: `chk_${Date.now()}`,
    userId: "current_user",
    productUrl: url,
    productName: url.includes("amazon") ? "Amazon Product" : url.includes("flipkart") ? "Flipkart Product" : "E-commerce Product",
    platform: url.includes("amazon") ? "Amazon" : url.includes("flipkart") ? "Flipkart" : "Unknown",
    totalReviews: Math.round(100 + Math.random() * 900),
    fakeCount: Math.round(50 + Math.random() * 200),
    fakePercentage,
    ratingCorrection: Number.parseFloat(ratingCorrection.toFixed(1)),
    originalRating: Number.parseFloat(originalRating.toFixed(1)),
    correctedRating: Number.parseFloat(
      Math.max(1, originalRating - ratingCorrection).toFixed(1)
    ),
    trustLevel: fakePercentage < 25 ? "trusted" : fakePercentage < 50 ? "caution" : "risky",
    checkedAt: Date.now()
  };
}
const MOCK_ANALYSES = [
  {
    id: "ana_001",
    userId: "user_001",
    reviewText: "This product is absolutely amazing! Best purchase ever! Perfect in every way!",
    fakeScore: 87,
    trustScore: 13,
    sentimentScore: 95,
    flags: [
      {
        type: "bot",
        confidence: 0.89,
        description: "Excessive superlatives without specific details"
      },
      {
        type: "generic",
        confidence: 0.77,
        description: "Templated praise language detected"
      }
    ],
    explanation: "High probability of being a paid or bot-generated review. Multiple fake indicators detected.",
    verdict: "fake",
    analyzedAt: Date.now() - 864e5
  },
  {
    id: "ana_002",
    userId: "user_001",
    reviewText: "Good product overall. The build quality is decent but the battery life could be better. Delivery was fast though.",
    fakeScore: 14,
    trustScore: 86,
    sentimentScore: 62,
    flags: [],
    explanation: "Review appears genuine with balanced feedback, specific details, and natural language.",
    verdict: "real",
    analyzedAt: Date.now() - 1728e5
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
        description: "Minimal information provided"
      }
    ],
    explanation: "Slightly suspicious due to brevity but may be a genuine short review.",
    verdict: "suspicious",
    analyzedAt: Date.now() - 2592e5
  }
];
const MOCK_PRODUCT_CHECKS = [
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
    checkedAt: Date.now() - 36e5
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
    checkedAt: Date.now() - 72e5
  }
];
const MOCK_DASHBOARD_STATS = {
  totalAnalyzed: 1243,
  fakeDetected: 389,
  realVerified: 854,
  productsChecked: 67,
  trustScore: 87,
  recentAnalyses: MOCK_ANALYSES,
  recentProducts: MOCK_PRODUCT_CHECKS
};
const MOCK_ADMIN_USERS = [
  {
    id: "u001",
    username: "sarah_chen",
    email: "sarah@ecommerce.com",
    role: "user",
    createdAt: Date.now() - 2592e6,
    analyzeCount: 234,
    isActive: true
  },
  {
    id: "u002",
    username: "raj_kumar",
    email: "raj@seller.in",
    role: "user",
    createdAt: Date.now() - 1728e6,
    analyzeCount: 89,
    isActive: true
  },
  {
    id: "u003",
    username: "admin_trust",
    email: "admin@trustcart.ai",
    role: "admin",
    createdAt: Date.now() - 5184e6,
    analyzeCount: 1203,
    isActive: true
  },
  {
    id: "u004",
    username: "mei_zhang",
    email: "mei@marketplace.cn",
    role: "user",
    createdAt: Date.now() - 864e6,
    analyzeCount: 45,
    isActive: false
  },
  {
    id: "u005",
    username: "carlos_m",
    email: "carlos@tienda.mx",
    role: "user",
    createdAt: Date.now() - 432e6,
    analyzeCount: 167,
    isActive: true
  }
];
const MOCK_SUSPICIOUS_PRODUCTS = [
  {
    productUrl: "https://amazon.com/dp/FAKE001",
    productName: "Ultra Slim Miracle Supplement",
    fakePercentage: 94,
    totalReviews: 3421,
    trustLevel: "risky"
  },
  {
    productUrl: "https://amazon.com/dp/FAKE002",
    productName: "Gaming Chair Pro 9000",
    fakePercentage: 78,
    totalReviews: 1876,
    trustLevel: "risky"
  },
  {
    productUrl: "https://flipkart.com/FAKE003",
    productName: "Budget Earbuds Premium",
    fakePercentage: 71,
    totalReviews: 2103,
    trustLevel: "risky"
  },
  {
    productUrl: "https://amazon.com/dp/FAKE004",
    productName: "Smart Watch Fitness Band",
    fakePercentage: 65,
    totalReviews: 987,
    trustLevel: "risky"
  },
  {
    productUrl: "https://flipkart.com/FAKE005",
    productName: "Instant Hair Growth Serum",
    fakePercentage: 91,
    totalReviews: 4512,
    trustLevel: "risky"
  }
];
export {
  analyzeReview as a,
  getAdminStats as b,
  checkProductUrl as c,
  getAdminUsers as d,
  getTrendingSuspiciousProducts as e,
  deleteUser as f,
  getDashboardStats as g,
  generateTrustBadge as h,
  login as l,
  signup as s
};
