import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type UserRole = CommonTypes.UserRole;

  public type User = {
    id : UserId;
    email : Text;
    passwordHash : Text;
    role : UserRole;
    createdAt : Timestamp;
    analysisCount : Nat;
  };

  public type Session = {
    token : Text;
    userId : UserId;
    role : UserRole;
    createdAt : Timestamp;
  };

  public type SignupResult = { userId : UserId; token : Text };

  public type LoginResult = { userId : UserId; token : Text; role : UserRole };

  public type SessionInfo = { userId : UserId; role : UserRole };
};
