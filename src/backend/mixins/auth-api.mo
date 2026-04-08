import CommonTypes "../types/common";
import AuthLib "../lib/auth";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  users : List.List<AuthLib.User>,
  sessions : List.List<AuthLib.Session>,
) {
  var nextUserId : Nat = 1;
  public func signup(email : Text, password : Text, role : AuthLib.UserRole) : async CommonTypes.Result<AuthLib.SignupResult, Text> {
    let now = Time.now();
    switch (AuthLib.signup(users, sessions, nextUserId, email, password, role, now)) {
      case (#err(e)) { #err(e) };
      case (#ok(r)) {
        nextUserId := r.newId;
        #ok(r.result)
      };
    }
  };

  public func login(email : Text, password : Text) : async CommonTypes.Result<AuthLib.LoginResult, Text> {
    let now = Time.now();
    AuthLib.login(users, sessions, email, password, now)
  };

  public func validateSession(token : Text) : async CommonTypes.Result<AuthLib.SessionInfo, Text> {
    AuthLib.validateSession(sessions, users, token)
  };
};
