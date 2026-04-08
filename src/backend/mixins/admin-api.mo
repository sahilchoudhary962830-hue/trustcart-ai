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
  public func deleteUser(token : Text, targetUserId : Nat) : async AnalysisLib.Result<Bool, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        if (session.role != #admin) return #err("Unauthorized");
        let deleted = AdminLib.deleteUser(users, sessions, analyses, productChecks, targetUserId);
        if (deleted) #ok(true) else #err("User not found")
      };
    }
  };
};
