import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type AnalysisType = CommonTypes.AnalysisType;
  public type TrustBadge = CommonTypes.TrustBadge;
  public type WeeklyTrendEntry = CommonTypes.WeeklyTrendEntry;

  public type ReviewAnalysis = {
    id : Nat;
    userId : UserId;
    reviewText : Text;
    fakeScore : Float;
    trustScore : Float;
    patterns : [Text];
    explanation : Text;
    confidence : Float;
    analysisType : AnalysisType;
    createdAt : Timestamp;
  };

  public type ProductCheck = {
    id : Nat;
    userId : UserId;
    productUrl : Text;
    fakePercentage : Float;
    originalRating : Float;
    adjustedRating : Float;
    trustBadge : TrustBadge;
    reviewCount : Nat;
    createdAt : Timestamp;
  };

  public type DashboardStats = {
    totalAnalyses : Nat;
    averageFakeScore : Float;
    fakeCount : Nat;
    realCount : Nat;
    weeklyTrend : [WeeklyTrendEntry];
  };

  public type PlatformStats = {
    totalUsers : Nat;
    totalAnalyses : Nat;
    averageFakeScore : Float;
    weeklyTrend : [WeeklyTrendEntry];
  };

  public type AdminUserEntry = {
    user : {
      id : UserId;
      email : Text;
      passwordHash : Text;
      role : { #customer; #seller; #admin };
      createdAt : Timestamp;
      analysisCount : Nat;
    };
    analysisCount : Nat;
  };

  public type SuspiciousProduct = {
    url : Text;
    count : Nat;
    avgFake : Float;
  };

  public type TrustBadgeResult = {
    badgeCode : Text;
    trustStatus : TrustBadge;
    score : Float;
  };
};
