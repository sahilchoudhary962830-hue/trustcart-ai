import AuthLib "../lib/auth";
import AnalysisLib "../lib/analysis";
import AdminLib "../lib/admin";
import List "mo:core/List";

mixin (
  users : List.List<AuthLib.User>,
  sessions : List.List<AuthLib.Session>,
  analyses : List.List<AnalysisLib.ReviewAnalysis>,
  productChecks : List.List<AnalysisLib.ProductCheck>,
) {
  public func getDashboardStats(token : Text) : async AnalysisLib.Result<AnalysisLib.DashboardStats, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        #ok(AnalysisLib.getDashboardStats(analyses, session.userId))
      };
    }
  };

  public func getAdminStats(token : Text) : async AnalysisLib.Result<AnalysisLib.PlatformStats, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        if (session.role != #admin) return #err("Unauthorized");
        #ok(AdminLib.getPlatformStats(users, analyses))
      };
    }
  };

  public func getAdminUsers(token : Text, limit : Nat, offset : Nat) : async AnalysisLib.Result<[AnalysisLib.AdminUserEntry], Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        if (session.role != #admin) return #err("Unauthorized");
        #ok(AdminLib.getAdminUsers(users, analyses, limit, offset))
      };
    }
  };

  public func getTrendingSuspiciousProducts(token : Text) : async AnalysisLib.Result<[AnalysisLib.SuspiciousProduct], Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        if (session.role != #admin) return #err("Unauthorized");
        #ok(AdminLib.getTrendingSuspiciousProducts(productChecks))
      };
    }
  };
};
