export type UserRole = "user" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: number;
  analyzeCount: number;
}

export interface ReviewFlag {
  type: "bot" | "paid" | "duplicate" | "spam" | "generic";
  confidence: number;
  description: string;
}

export interface ReviewAnalysis {
  id: string;
  userId: string;
  reviewText: string;
  fakeScore: number;
  trustScore: number;
  sentimentScore: number;
  flags: ReviewFlag[];
  explanation: string;
  verdict: "real" | "suspicious" | "fake";
  analyzedAt: number;
}

export type TrustLevel = "trusted" | "caution" | "risky";

export interface ProductCheck {
  id: string;
  userId: string;
  productUrl: string;
  productName: string;
  platform: string;
  totalReviews: number;
  fakeCount: number;
  fakePercentage: number;
  ratingCorrection: number;
  originalRating: number;
  correctedRating: number;
  trustLevel: TrustLevel;
  checkedAt: number;
}

export interface DashboardStats {
  totalAnalyzed: number;
  fakeDetected: number;
  realVerified: number;
  productsChecked: number;
  trustScore: number;
  recentAnalyses: ReviewAnalysis[];
  recentProducts: ProductCheck[];
}

export interface PlatformStats {
  totalUsers: number;
  totalAnalyses: number;
  totalFakeDetected: number;
  totalProductChecks: number;
  averageFakeRate: number;
}

export interface AdminUserEntry {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: number;
  analyzeCount: number;
  isActive: boolean;
}

export interface TrustBadgeResult {
  productId: string;
  productName: string;
  trustLevel: TrustLevel;
  trustScore: number;
  badgeHtml: string;
  badgeUrl: string;
  generatedAt: number;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}

export interface TrendPoint {
  date: string;
  real: number;
  fake: number;
}

export interface SuspiciousProduct {
  productUrl: string;
  productName: string;
  fakePercentage: number;
  totalReviews: number;
  trustLevel: TrustLevel;
}

export interface ApiError {
  message: string;
  code?: string;
}
