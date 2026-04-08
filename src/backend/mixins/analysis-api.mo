import AuthLib "../lib/auth";
import AnalysisLib "../lib/analysis";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  users : List.List<AuthLib.User>,
  sessions : List.List<AuthLib.Session>,
  analyses : List.List<AnalysisLib.ReviewAnalysis>,
  productChecks : List.List<AnalysisLib.ProductCheck>,
) {
  var nextAnalysisId : Nat = 1;
  var nextProductCheckId : Nat = 1;
  public func analyzeReview(token : Text, reviewText : Text) : async AnalysisLib.Result<AnalysisLib.ReviewAnalysis, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        let now = Time.now();
        let r = AnalysisLib.analyzeReviewText(analyses, nextAnalysisId, session.userId, reviewText, now);
        nextAnalysisId := r.newId;
        #ok(r.result)
      };
    }
  };

  public func getUserAnalyses(token : Text, limit : Nat, offset : Nat) : async AnalysisLib.Result<[AnalysisLib.ReviewAnalysis], Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        #ok(AnalysisLib.getUserAnalyses(analyses, session.userId, limit, offset))
      };
    }
  };

  public func getAnalysisById(token : Text, analysisId : Nat) : async AnalysisLib.Result<AnalysisLib.ReviewAnalysis, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        switch (AnalysisLib.getAnalysisById(analyses, session.userId, analysisId)) {
          case null { #err("Analysis not found") };
          case (?a) { #ok(a) };
        }
      };
    }
  };

  public func deleteAnalysis(token : Text, analysisId : Nat) : async AnalysisLib.Result<Bool, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        let deleted = AnalysisLib.deleteAnalysis(analyses, session.userId, analysisId);
        if (deleted) #ok(true) else #err("Analysis not found")
      };
    }
  };

  public func checkProductUrl(token : Text, productUrl : Text) : async AnalysisLib.Result<AnalysisLib.ProductCheck, Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        let now = Time.now();
        let r = AnalysisLib.checkProductUrl(productChecks, nextProductCheckId, session.userId, productUrl, now);
        nextProductCheckId := r.newId;
        #ok(r.result)
      };
    }
  };

  public func getUserProductChecks(token : Text, limit : Nat, offset : Nat) : async AnalysisLib.Result<[AnalysisLib.ProductCheck], Text> {
    switch (AuthLib.validateSession(sessions, users, token)) {
      case (#err(e)) { #err(e) };
      case (#ok(session)) {
        #ok(AnalysisLib.getUserProductChecks(productChecks, session.userId, limit, offset))
      };
    }
  };
};
