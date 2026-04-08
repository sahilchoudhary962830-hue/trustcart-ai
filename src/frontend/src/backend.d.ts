import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TrustBadgeResult {
    badgeCode: string;
    trustStatus: TrustBadge;
    score: number;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: LoginResult;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1_8 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1 = {
    __kind__: "ok";
    ok: Array<ProductCheck>;
} | {
    __kind__: "err";
    err: string;
};
export interface AdminUserEntry {
    user: {
        id: UserId;
        createdAt: Timestamp;
        role: Variant_admin_customer_seller;
        email: string;
        passwordHash: string;
        analysisCount: bigint;
    };
    analysisCount: bigint;
}
export type Result__1_7 = {
    __kind__: "ok";
    ok: TrustBadgeResult;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: SignupResult;
} | {
    __kind__: "err";
    err: string;
};
export interface SessionInfo {
    userId: UserId;
    role: UserRole;
}
export interface SignupResult {
    token: string;
    userId: UserId;
}
export type Result__1_9 = {
    __kind__: "ok";
    ok: ProductCheck;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1_2 = {
    __kind__: "ok";
    ok: Array<SuspiciousProduct>;
} | {
    __kind__: "err";
    err: string;
};
export interface PlatformStats {
    totalAnalyses: bigint;
    weeklyTrend: Array<WeeklyTrendEntry>;
    totalUsers: bigint;
    averageFakeScore: number;
}
export type Result__1_4 = {
    __kind__: "ok";
    ok: ReviewAnalysis;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1_1 = {
    __kind__: "ok";
    ok: Array<ReviewAnalysis>;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1_3 = {
    __kind__: "ok";
    ok: DashboardStats;
} | {
    __kind__: "err";
    err: string;
};
export interface DashboardStats {
    totalAnalyses: bigint;
    realCount: bigint;
    fakeCount: bigint;
    weeklyTrend: Array<WeeklyTrendEntry>;
    averageFakeScore: number;
}
export type UserId = bigint;
export type Result__1_6 = {
    __kind__: "ok";
    ok: PlatformStats;
} | {
    __kind__: "err";
    err: string;
};
export type Result = {
    __kind__: "ok";
    ok: SessionInfo;
} | {
    __kind__: "err";
    err: string;
};
export interface SuspiciousProduct {
    url: string;
    count: bigint;
    avgFake: number;
}
export interface LoginResult {
    token: string;
    userId: UserId;
    role: UserRole;
}
export type Result__1_5 = {
    __kind__: "ok";
    ok: Array<AdminUserEntry>;
} | {
    __kind__: "err";
    err: string;
};
export interface WeeklyTrendEntry {
    count: bigint;
    week: string;
    avgFake: number;
}
export interface ReviewAnalysis {
    id: bigint;
    patterns: Array<string>;
    userId: UserId;
    analysisType: AnalysisType;
    explanation: string;
    createdAt: Timestamp;
    trustScore: number;
    reviewText: string;
    fakeScore: number;
    confidence: number;
}
export interface ProductCheck {
    id: bigint;
    productUrl: string;
    fakePercentage: number;
    userId: UserId;
    createdAt: Timestamp;
    trustBadge: TrustBadge;
    reviewCount: bigint;
    adjustedRating: number;
    originalRating: number;
}
export enum AnalysisType {
    manual = "manual",
    product = "product"
}
export enum TrustBadge {
    trusted = "trusted",
    caution = "caution",
    risky = "risky"
}
export enum Variant_admin_customer_seller {
    admin = "admin",
    customer = "customer",
    seller = "seller"
}
export interface backendInterface {
    analyzeReview(token: string, reviewText: string): Promise<Result__1_4>;
    checkProductUrl(token: string, productUrl: string): Promise<Result__1_9>;
    deleteAnalysis(token: string, analysisId: bigint): Promise<Result__1_8>;
    deleteUser(token: string, targetUserId: bigint): Promise<Result__1_8>;
    generateTrustBadge(token: string, productUrl: string): Promise<Result__1_7>;
    getAdminStats(token: string): Promise<Result__1_6>;
    getAdminUsers(token: string, limit: bigint, offset: bigint): Promise<Result__1_5>;
    getAnalysisById(token: string, analysisId: bigint): Promise<Result__1_4>;
    getDashboardStats(token: string): Promise<Result__1_3>;
    getTrendingSuspiciousProducts(token: string): Promise<Result__1_2>;
    getUserAnalyses(token: string, limit: bigint, offset: bigint): Promise<Result__1_1>;
    getUserProductChecks(token: string, limit: bigint, offset: bigint): Promise<Result__1>;
    login(email: string, password: string): Promise<Result_2>;
    signup(email: string, password: string, role: UserRole): Promise<Result_1>;
    validateSession(token: string): Promise<Result>;
}
