import AuthTypes "../types/auth";
import CommonTypes "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type User = AuthTypes.User;
  public type Session = AuthTypes.Session;
  public type UserId = AuthTypes.UserId;
  public type UserRole = AuthTypes.UserRole;
  public type SignupResult = AuthTypes.SignupResult;
  public type LoginResult = AuthTypes.LoginResult;
  public type SessionInfo = AuthTypes.SessionInfo;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  // Deterministic password hash using char codes + salt
  public func hashPassword(password : Text) : Text {
    let salt = "trustcart_salt_2024";
    let combined = password # salt;
    var hash : Nat = 5381;
    for (c in combined.chars()) {
      let code = c.toNat32().toNat();
      hash := ((hash * 33) + code) % 4294967296;
    };
    "h" # debug_show(hash)
  };

  // Generate unique token from userId + timestamp + suffix
  public func generateToken(userId : UserId, now : Int) : Text {
    var suffix : Nat = 7;
    let timeStr = debug_show(now);
    for (c in timeStr.chars()) {
      let code = c.toNat32().toNat();
      suffix := (suffix * 31 + code) % 999983;
    };
    "tok_" # debug_show(userId) # "_" # debug_show(now) # "_" # debug_show(suffix)
  };

  public func signup(
    users : List.List<User>,
    sessions : List.List<Session>,
    nextId : Nat,
    email : Text,
    password : Text,
    role : UserRole,
    now : Int,
  ) : Result<{ result : SignupResult; newId : Nat }, Text> {
    // Check email uniqueness
    let existing = users.find(func(u : User) : Bool { u.email == email });
    switch (existing) {
      case (?_) { #err("Email already registered") };
      case null {
        let userId = nextId;
        let passwordHash = hashPassword(password);
        let token = generateToken(userId, now);
        let user : User = {
          id = userId;
          email = email;
          passwordHash = passwordHash;
          role = role;
          createdAt = now;
          analysisCount = 0;
        };
        let session : Session = {
          token = token;
          userId = userId;
          role = role;
          createdAt = now;
        };
        users.add(user);
        sessions.add(session);
        #ok({ result = { userId = userId; token = token }; newId = userId + 1 })
      };
    }
  };

  public func login(
    users : List.List<User>,
    sessions : List.List<Session>,
    email : Text,
    password : Text,
    now : Int,
  ) : Result<LoginResult, Text> {
    let passwordHash = hashPassword(password);
    let userOpt = users.find(func(u : User) : Bool { u.email == email });
    switch (userOpt) {
      case null { #err("Invalid email or password") };
      case (?user) {
        if (user.passwordHash != passwordHash) {
          #err("Invalid email or password")
        } else {
          let token = generateToken(user.id, now);
          let session : Session = {
            token = token;
            userId = user.id;
            role = user.role;
            createdAt = now;
          };
          sessions.add(session);
          #ok({ userId = user.id; token = token; role = user.role })
        }
      };
    }
  };

  // Sessions valid for 24h (in nanoseconds: 24 * 60 * 60 * 1_000_000_000)
  let sessionTtlNs : Int = 86_400_000_000_000;

  public func validateSession(
    sessions : List.List<Session>,
    users : List.List<User>,
    token : Text,
  ) : Result<SessionInfo, Text> {
    let now = Time.now();
    let sessionOpt = sessions.find(func(s : Session) : Bool { s.token == token });
    switch (sessionOpt) {
      case null { #err("Invalid session") };
      case (?session) {
        if (now - session.createdAt > sessionTtlNs) {
          #err("Session expired")
        } else {
          // Verify user still exists
          let userOpt = users.find(func(u : User) : Bool { u.id == session.userId });
          switch (userOpt) {
            case null { #err("User not found") };
            case (?_) {
              #ok({ userId = session.userId; role = session.role })
            };
          }
        }
      };
    }
  };
};
