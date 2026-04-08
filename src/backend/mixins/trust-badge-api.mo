import AuthLib "../lib/auth";
import AnalysisLib "../lib/analysis";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  users : List.List<AuthLib.User>,
  sessions : List.List<AuthLib.Session>,
  productChecks : List.List<AnalysisLib.ProductCheck>,
) {
  var nextTrustBadgeProductId : Nat = 1;
  public func generateTrustBadge(token : Text, productUrl : Text) : async AnalysisLib.Result<AnalysisLib.TrustBadgeResult, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        let now = Time.now();
        let r = AnalysisLib.generateTrustBadge(productChecks, nextTrustBadgeProductId, session.userId, productUrl, now);
        nextTrustBadgeProductId := r.newId;
        #ok(r.result)
      };
    }
  };
};
