import AuthLib "lib/auth";
import AnalysisLib "lib/analysis";
import List "mo:core/List";

import AuthApi "mixins/auth-api";
import AnalysisApi "mixins/analysis-api";
import DashboardApi "mixins/dashboard-api";
import AdminApi "mixins/admin-api";
import TrustBadgeApi "mixins/trust-badge-api";

actor {
  let users = List.empty<AuthLib.User>();
  let sessions = List.empty<AuthLib.Session>();
  let analyses = List.empty<AnalysisLib.ReviewAnalysis>();
  let productChecks = List.empty<AnalysisLib.ProductCheck>();

  include AuthApi(users, sessions);
  include AnalysisApi(users, sessions, analyses, productChecks);
  include DashboardApi(users, sessions, analyses, productChecks);
  include AdminApi(users, sessions, analyses, productChecks);
  include TrustBadgeApi(users, sessions, productChecks);
};
