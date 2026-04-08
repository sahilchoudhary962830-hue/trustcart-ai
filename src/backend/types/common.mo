module {
  public type UserId = Nat;
  public type Timestamp = Int;

  public type UserRole = { #customer; #seller; #admin };

  public type AnalysisType = { #manual; #product };

  public type TrustBadge = { #trusted; #caution; #risky };

  public type WeeklyTrendEntry = {
    week : Text;
    count : Nat;
    avgFake : Float;
  };

  public type Result<T, E> = { #ok : T; #err : E };
};
