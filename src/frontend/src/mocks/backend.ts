import type { backendInterface, AnalysisType, TrustBadge, Variant_admin_customer_seller } from "../backend.d";

const mockToken = "mock-token-123";

export const mockBackend: backendInterface = {
  analyzeReview: async (_token: string, reviewText: string) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      patterns: ["Repetitive language", "Generic praise", "Suspicious timing"],
      userId: BigInt(1),
      analysisType: "manual" as unknown as AnalysisType,
      explanation:
        "This review exhibits multiple indicators of inauthenticity including repetitive language patterns and generic praise without specific product details. The review was posted within 24 hours of purchase.",
      createdAt: BigInt(Date.now()),
      trustScore: 32,
      reviewText: reviewText || "This product is amazing! Best purchase ever! Highly recommend!",
      fakeScore: 68,
      confidence: 0.87,
    },
  }),

  checkProductUrl: async (_token: string, productUrl: string) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      productUrl: productUrl || "https://amazon.com/dp/B08N5WRWNW",
      fakePercentage: 42,
      userId: BigInt(1),
      createdAt: BigInt(Date.now()),
      trustBadge: "caution" as unknown as TrustBadge,
      reviewCount: BigInt(284),
      adjustedRating: 3.8,
      originalRating: 4.6,
    },
  }),

  deleteAnalysis: async () => ({ __kind__: "ok", ok: true }),

  deleteUser: async () => ({ __kind__: "ok", ok: true }),

  generateTrustBadge: async (_token: string, productUrl: string) => ({
    __kind__: "ok",
    ok: {
      badgeCode: `<div class="trustcart-badge" data-url="${productUrl}">AI Verified</div>`,
      trustStatus: "trusted" as unknown as TrustBadge,
      score: 88,
    },
  }),

  getAdminStats: async () => ({
    __kind__: "ok",
    ok: {
      totalAnalyses: BigInt(12847),
      weeklyTrend: [
        { week: "2026-W10", count: BigInt(320), avgFake: 0.34 },
        { week: "2026-W11", count: BigInt(412), avgFake: 0.41 },
        { week: "2026-W12", count: BigInt(389), avgFake: 0.38 },
        { week: "2026-W13", count: BigInt(467), avgFake: 0.45 },
      ],
      totalUsers: BigInt(3214),
      averageFakeScore: 0.38,
    },
  }),

  getAdminUsers: async () => ({
    __kind__: "ok",
    ok: [
      {
        user: {
          id: BigInt(1),
          createdAt: BigInt(Date.now() - 86400000 * 30),
          role: "customer" as unknown as Variant_admin_customer_seller,
          email: "john.doe@example.com",
          passwordHash: "****",
          analysisCount: BigInt(23),
        },
        analysisCount: BigInt(23),
      },
      {
        user: {
          id: BigInt(2),
          createdAt: BigInt(Date.now() - 86400000 * 14),
          role: "seller" as unknown as Variant_admin_customer_seller,
          email: "store@shopplus.com",
          passwordHash: "****",
          analysisCount: BigInt(156),
        },
        analysisCount: BigInt(156),
      },
    ],
  }),

  getAnalysisById: async () => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      patterns: ["Repetitive language", "Generic praise"],
      userId: BigInt(1),
      analysisType: "manual" as unknown as AnalysisType,
      explanation: "This review shows signs of being artificially generated.",
      createdAt: BigInt(Date.now() - 3600000),
      trustScore: 32,
      reviewText: "Amazing product! Best I have ever used! Buy it now!",
      fakeScore: 68,
      confidence: 0.87,
    },
  }),

  getDashboardStats: async () => ({
    __kind__: "ok",
    ok: {
      totalAnalyses: BigInt(247),
      realCount: BigInt(143),
      fakeCount: BigInt(104),
      weeklyTrend: [
        { week: "2026-W10", count: BigInt(38), avgFake: 0.32 },
        { week: "2026-W11", count: BigInt(52), avgFake: 0.44 },
        { week: "2026-W12", count: BigInt(61), avgFake: 0.39 },
        { week: "2026-W13", count: BigInt(74), avgFake: 0.47 },
        { week: "2026-W14", count: BigInt(22), avgFake: 0.41 },
      ],
      averageFakeScore: 0.42,
    },
  }),

  getTrendingSuspiciousProducts: async () => ({
    __kind__: "ok",
    ok: [
      { url: "https://amazon.com/dp/B09XY12345", count: BigInt(34), avgFake: 0.82 },
      { url: "https://flipkart.com/p/ABC123", count: BigInt(28), avgFake: 0.76 },
      { url: "https://amazon.com/dp/B07ZX98765", count: BigInt(19), avgFake: 0.71 },
    ],
  }),

  getUserAnalyses: async () => ({
    __kind__: "ok",
    ok: [
      {
        id: BigInt(1),
        patterns: ["Repetitive language", "Generic praise", "Suspicious timing"],
        userId: BigInt(1),
        analysisType: "manual" as unknown as AnalysisType,
        explanation: "Multiple fake indicators detected in this review.",
        createdAt: BigInt(Date.now() - 3600000),
        trustScore: 32,
        reviewText: "Amazing! Best product ever! Must buy! Five stars!",
        fakeScore: 68,
        confidence: 0.87,
      },
      {
        id: BigInt(2),
        patterns: ["Detailed feedback"],
        userId: BigInt(1),
        analysisType: "manual" as unknown as AnalysisType,
        explanation: "Review appears genuine with specific product details and balanced feedback.",
        createdAt: BigInt(Date.now() - 86400000),
        trustScore: 84,
        reviewText: "The build quality is solid but the battery could last longer. Overall satisfied with the purchase.",
        fakeScore: 16,
        confidence: 0.92,
      },
    ],
  }),

  getUserProductChecks: async () => ({
    __kind__: "ok",
    ok: [
      {
        id: BigInt(1),
        productUrl: "https://amazon.com/dp/B08N5WRWNW",
        fakePercentage: 42,
        userId: BigInt(1),
        createdAt: BigInt(Date.now() - 7200000),
        trustBadge: "caution" as unknown as TrustBadge,
        reviewCount: BigInt(284),
        adjustedRating: 3.8,
        originalRating: 4.6,
      },
      {
        id: BigInt(2),
        productUrl: "https://amazon.com/dp/B07XJ8C8F5",
        fakePercentage: 12,
        userId: BigInt(1),
        createdAt: BigInt(Date.now() - 86400000 * 2),
        trustBadge: "trusted" as unknown as TrustBadge,
        reviewCount: BigInt(1203),
        adjustedRating: 4.5,
        originalRating: 4.7,
      },
    ],
  }),

  login: async (_email: string, _password: string) => ({
    __kind__: "ok",
    ok: {
      token: mockToken,
      userId: BigInt(1),
      role: "customer" as any,
    },
  }),

  signup: async (_email: string, _password: string, _role: any) => ({
    __kind__: "ok",
    ok: {
      token: mockToken,
      userId: BigInt(1),
    },
  }),

  validateSession: async (_token: string) => ({
    __kind__: "ok",
    ok: {
      userId: BigInt(1),
      role: "customer" as any,
    },
  }),
};
