import AuthTypes "../types/auth";
import AnalysisTypes "../types/analysis";
import CommonTypes "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";

module {
  public type User = AuthTypes.User;
  public type Session = AuthTypes.Session;
  public type ReviewAnalysis = AnalysisTypes.ReviewAnalysis;
  public type ProductCheck = AnalysisTypes.ProductCheck;
  public type PlatformStats = AnalysisTypes.PlatformStats;
  public type AdminUserEntry = AnalysisTypes.AdminUserEntry;
  public type SuspiciousProduct = AnalysisTypes.SuspiciousProduct;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func getPlatformStats(
    users : List.List<User>,
    analyses : List.List<ReviewAnalysis>,
  ) : PlatformStats {
    let totalUsers = users.size();
    let totalAnalyses = analyses.size();

    let averageFakeScore = if (totalAnalyses == 0) {
      0.0
    } else {
      let total = analyses.foldLeft(0.0, func(acc : Float, a : ReviewAnalysis) : Float { acc + a.fakeScore });
      total / totalAnalyses.toFloat()
    };

    let weekNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let weekMap = Map.empty<Int, { count : Nat; scoreSum : Float }>();
    analyses.forEach(func(a : ReviewAnalysis) {
      let weekIdx : Int = a.createdAt / weekNs;
      let prev = switch (weekMap.get(weekIdx)) {
        case (?v) v;
        case null ({ count = 0; scoreSum = 0.0 });
      };
      weekMap.add(weekIdx, { count = prev.count + 1; scoreSum = prev.scoreSum + a.fakeScore });
    });

    let weeklyTrend = weekMap.entries().map(
      func((weekIdx, data) : (Int, { count : Nat; scoreSum : Float })) : CommonTypes.WeeklyTrendEntry {
        {
          week = "W" # debug_show(weekIdx);
          count = data.count;
          avgFake = if (data.count == 0) 0.0 else data.scoreSum / data.count.toFloat();
        }
      }
    ).toArray();

    {
      totalUsers = totalUsers;
      totalAnalyses = totalAnalyses;
      averageFakeScore = averageFakeScore;
      weeklyTrend = weeklyTrend;
    }
  };

  public func getAdminUsers(
    users : List.List<User>,
    analyses : List.List<ReviewAnalysis>,
    limit : Nat,
    offset : Nat,
  ) : [AdminUserEntry] {
    let total = users.size();
    if (offset >= total) return [];
    let available = if (total > offset) total - offset else 0;
    let takeCount = if (available < limit) available else limit;
    let pageUsers = users.sliceToArray(offset.toInt(), (offset + takeCount).toInt());

    pageUsers.map(func(u : User) : AdminUserEntry {
      let userAnalysisCount = analyses.filter(func(a : ReviewAnalysis) : Bool { a.userId == u.id }).size();
      { user = u; analysisCount = userAnalysisCount }
    })
  };

  public func deleteUser(
    users : List.List<User>,
    sessions : List.List<Session>,
    analyses : List.List<ReviewAnalysis>,
    productChecks : List.List<ProductCheck>,
    targetUserId : UserId,
  ) : Bool {
    let sizeBefore = users.size();
    let keepUsers = users.filter(func(u : User) : Bool { u.id != targetUserId });
    if (keepUsers.size() >= sizeBefore) return false;

    users.clear();
    users.append(keepUsers);

    let keepSessions = sessions.filter(func(s : Session) : Bool { s.userId != targetUserId });
    sessions.clear();
    sessions.append(keepSessions);

    let keepAnalyses = analyses.filter(func(a : ReviewAnalysis) : Bool { a.userId != targetUserId });
    analyses.clear();
    analyses.append(keepAnalyses);

    let keepChecks = productChecks.filter(func(p : ProductCheck) : Bool { p.userId != targetUserId });
    productChecks.clear();
    productChecks.append(keepChecks);

    true
  };

  public func getTrendingSuspiciousProducts(
    productChecks : List.List<ProductCheck>,
  ) : [SuspiciousProduct] {
    // Group by URL
    let urlMap = Map.empty<Text, { count : Nat; scoreSum : Float }>();
    productChecks.forEach(func(p : ProductCheck) {
      let prev = switch (urlMap.get(p.productUrl)) {
        case (?v) v;
        case null ({ count = 0; scoreSum = 0.0 });
      };
      urlMap.add(p.productUrl, { count = prev.count + 1; scoreSum = prev.scoreSum + p.fakePercentage });
    });

    let products = urlMap.entries().map(
      func((url, data) : (Text, { count : Nat; scoreSum : Float })) : SuspiciousProduct {
        {
          url = url;
          count = data.count;
          avgFake = if (data.count == 0) 0.0 else data.scoreSum / data.count.toFloat();
        }
      }
    ).toArray();

    // Sort by avgFake descending, take top 10
    let sorted = products.sort(func(a : SuspiciousProduct, b : SuspiciousProduct) : Order.Order {
      if (a.avgFake > b.avgFake) #less
      else if (a.avgFake < b.avgFake) #greater
      else #equal
    });
    if (sorted.size() <= 10) sorted else sorted.sliceToArray(0, 10)
  };
};
