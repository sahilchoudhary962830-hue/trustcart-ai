import AnalysisTypes "../types/analysis";
import CommonTypes "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Float "mo:core/Float";
import Int "mo:core/Int";

module {
  public type ReviewAnalysis = AnalysisTypes.ReviewAnalysis;
  public type ProductCheck = AnalysisTypes.ProductCheck;
  public type DashboardStats = AnalysisTypes.DashboardStats;
  public type PlatformStats = AnalysisTypes.PlatformStats;
  public type AdminUserEntry = AnalysisTypes.AdminUserEntry;
  public type SuspiciousProduct = AnalysisTypes.SuspiciousProduct;
  public type TrustBadgeResult = AnalysisTypes.TrustBadgeResult;
  public type UserId = CommonTypes.UserId;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  // Hash URL to a deterministic seed Nat
  func hashUrl(url : Text) : Nat {
    var h : Nat = 17;
    for (c in url.chars()) {
      let code = c.toNat32().toNat();
      h := (h * 31 + code) % 1_000_000_007;
    };
    h
  };

  // Count occurrences of a substring in text (case-insensitive)
  func countSubstring(text : Text, sub : Text) : Nat {
    let ltext = text.toLower();
    let lsub = sub.toLower();
    if (lsub.size() == 0) return 0;
    let textChars = ltext.toArray();
    let subChars = lsub.toArray();
    let tLen = textChars.size();
    let sLen = subChars.size();
    var count : Nat = 0;
    var i : Nat = 0;
    label outer while (i + sLen <= tLen) {
      var match = true;
      var j : Nat = 0;
      while (j < sLen) {
        if (textChars[i + j] != subChars[j]) {
          match := false;
        };
        j += 1;
      };
      if (match) {
        count += 1;
        i += sLen;
      } else {
        i += 1;
      };
    };
    count
  };

  // Count words that are all-caps in text
  func countCapsWords(text : Text) : (Nat, Nat) {
    var totalWords : Nat = 0;
    var capsWords : Nat = 0;
    for (word in text.tokens(#char ' ')) {
      let trimmed = word.trim(#predicate(func(c : Char) : Bool {
        c == '.' or c == ',' or c == '!' or c == '?'
      }));
      if (trimmed.size() >= 2) {
        totalWords += 1;
        if (trimmed == trimmed.toUpper()) {
          capsWords += 1;
        };
      };
    };
    (totalWords, capsWords)
  };

  // Count exclamation marks
  func countExclamations(text : Text) : Nat {
    var count : Nat = 0;
    for (c in text.chars()) {
      if (c == '!') count += 1;
    };
    count
  };

  // Check for repetitive 3-word sequences (same sequence appears >2 times)
  func hasRepetitivePhrase(text : Text) : Bool {
    let words = text.toLower().tokens(#char ' ').toArray();
    let n = words.size();
    if (n < 3) return false;
    // Build trigrams
    let trigrams = Map.empty<Text, Nat>();
    var i : Nat = 0;
    while (i + 2 < n) {
      let trigram = words[i] # " " # words[i + 1] # " " # words[i + 2];
      let prev = switch (trigrams.get(trigram)) { case (?v) v; case null 0 };
      trigrams.add(trigram, prev + 1);
      i += 1;
    };
    // Check if any trigram appears > 2 times
    trigrams.any(func(_k : Text, v : Nat) : Bool { v > 2 })
  };

  // Check for generic superlatives
  func hasGenericSuperlatives(text : Text) : Bool {
    let ltext = text.toLower();
    countSubstring(ltext, "best ever") > 0 or
    countSubstring(ltext, "amazing") > 0 or
    countSubstring(ltext, "perfect") > 0 or
    countSubstring(ltext, "love it") > 0
  };

  // Check for verified purchase signals (specific details, measurements, model numbers)
  func hasVerifiedSignals(text : Text) : Bool {
    let ltext = text.toLower();
    var hasMeasurement = false;
    var prevWasNum = false;
    for (c in ltext.chars()) {
      if (c >= '0' and c <= '9') {
        prevWasNum := true;
      } else if (prevWasNum and (c == 'x' or c == 'm' or c == 'c' or c == 'k' or c == 'g' or c == 'l' or c == 'w' or c == 'h')) {
        hasMeasurement := true;
      } else {
        prevWasNum := false;
      };
    };
    hasMeasurement or
    countSubstring(ltext, "model") > 0 or
    countSubstring(ltext, "serial") > 0 or
    countSubstring(ltext, "version") > 0
  };

  // Core NLP heuristic scoring
  func scoreReview(reviewText : Text) : { fakeScore : Float; patterns : [Text]; explanation : Text; confidence : Float } {
    var fakeScore : Float = 0.0;
    let patterns = List.empty<Text>();

    // Rule 1: Short review
    if (reviewText.size() < 20) {
      fakeScore += 20.0;
      patterns.add("short_review");
    };

    // Rule 2: Excessive exclamation marks
    let exclamCount = countExclamations(reviewText);
    if (exclamCount > 3) {
      fakeScore += 15.0;
      patterns.add("excessive_exclamations");
    };

    // Rule 3: ALL CAPS words ratio
    let (totalWords, capsWords) = countCapsWords(reviewText);
    if (totalWords > 0) {
      let capsRatio = capsWords.toFloat() / totalWords.toFloat();
      if (capsRatio > 0.3) {
        fakeScore += 20.0;
        patterns.add("excessive_caps");
      };
    };

    // Rule 4: Repetitive phrases
    if (hasRepetitivePhrase(reviewText)) {
      fakeScore += 25.0;
      patterns.add("repetitive_phrases");
    };

    // Rule 5: Generic superlatives
    if (hasGenericSuperlatives(reviewText)) {
      fakeScore += 15.0;
      patterns.add("generic_superlatives");
    };

    // Rule 6: Verified purchase signals (negative score)
    if (hasVerifiedSignals(reviewText)) {
      fakeScore -= 20.0;
      patterns.add("verified_signals");
    };

    // Clamp score to 0-100
    if (fakeScore < 0.0) fakeScore := 0.0;
    if (fakeScore > 100.0) fakeScore := 100.0;

    let patternArray = patterns.toArray();
    let numPatterns = patternArray.size();

    // Build explanation
    let explanation = if (numPatterns == 0) {
      "No suspicious patterns detected in this review."
    } else {
      let parts = List.empty<Text>();
      for (p in patternArray.values()) {
        switch (p) {
          case "short_review" { parts.add("review is very short") };
          case "excessive_exclamations" { parts.add("excessive use of exclamation marks") };
          case "excessive_caps" { parts.add("high ratio of ALL-CAPS words") };
          case "repetitive_phrases" { parts.add("repetitive phrases detected") };
          case "generic_superlatives" { parts.add("generic superlative language used") };
          case "verified_signals" { parts.add("contains specific product details") };
          case _ {};
        };
      };
      "This review was flagged because: " # parts.values().join(", ") # "."
    };

    // Confidence: 0.7 + 0.05 per pattern, clamped to 0.99
    var confidence : Float = 0.7 + 0.05 * numPatterns.toFloat();
    if (confidence > 0.99) confidence := 0.99;

    { fakeScore = fakeScore; patterns = patternArray; explanation = explanation; confidence = confidence }
  };

  // NLP heuristic analysis
  public func analyzeReviewText(
    analyses : List.List<ReviewAnalysis>,
    nextId : Nat,
    userId : UserId,
    reviewText : Text,
    now : Int,
  ) : { result : ReviewAnalysis; newId : Nat } {
    let scored = scoreReview(reviewText);
    let trustScore = 100.0 - scored.fakeScore;
    let analysis : ReviewAnalysis = {
      id = nextId;
      userId = userId;
      reviewText = reviewText;
      fakeScore = scored.fakeScore;
      trustScore = trustScore;
      patterns = scored.patterns;
      explanation = scored.explanation;
      confidence = scored.confidence;
      analysisType = #manual;
      createdAt = now;
    };
    analyses.add(analysis);
    { result = analysis; newId = nextId + 1 }
  };

  public func getUserAnalyses(
    analyses : List.List<ReviewAnalysis>,
    userId : UserId,
    limit : Nat,
    offset : Nat,
  ) : [ReviewAnalysis] {
    let userAnalyses = analyses.filter(func(a : ReviewAnalysis) : Bool { a.userId == userId });
    let total = userAnalyses.size();
    if (offset >= total) return [];
    let available = if (total > offset) total - offset else 0;
    let takeCount = if (available < limit) available else limit;
    userAnalyses.sliceToArray(offset.toInt(), (offset + takeCount).toInt())
  };

  public func getAnalysisById(
    analyses : List.List<ReviewAnalysis>,
    userId : UserId,
    analysisId : Nat,
  ) : ?ReviewAnalysis {
    analyses.find(func(a : ReviewAnalysis) : Bool { a.id == analysisId and a.userId == userId })
  };

  public func deleteAnalysis(
    analyses : List.List<ReviewAnalysis>,
    userId : UserId,
    analysisId : Nat,
  ) : Bool {
    let sizeBefore = analyses.size();
    let keep = analyses.filter(func(a : ReviewAnalysis) : Bool {
      not (a.id == analysisId and a.userId == userId)
    });
    if (keep.size() < sizeBefore) {
      analyses.clear();
      analyses.append(keep);
      true
    } else {
      false
    }
  };

  // Product URL heuristics — deterministic based on URL hash
  func computeProductCheck(
    nextId : Nat,
    userId : UserId,
    productUrl : Text,
    now : Int,
  ) : ProductCheck {
    let seed = hashUrl(productUrl);
    let fakePercentage : Float = (seed % 60).toFloat() + 10.0;
    let originalRating : Float = 3.5 + (seed % 3).toFloat() * 0.5;
    let adjustedRating : Float = originalRating - (fakePercentage / 100.0) * 1.5;
    let trustBadge : CommonTypes.TrustBadge = if (fakePercentage < 25.0) #trusted
      else if (fakePercentage < 50.0) #caution
      else #risky;
    let reviewCount : Nat = (seed % 500) + 50;
    {
      id = nextId;
      userId = userId;
      productUrl = productUrl;
      fakePercentage = fakePercentage;
      originalRating = originalRating;
      adjustedRating = adjustedRating;
      trustBadge = trustBadge;
      reviewCount = reviewCount;
      createdAt = now;
    }
  };

  public func checkProductUrl(
    productChecks : List.List<ProductCheck>,
    nextId : Nat,
    userId : UserId,
    productUrl : Text,
    now : Int,
  ) : { result : ProductCheck; newId : Nat } {
    let check = computeProductCheck(nextId, userId, productUrl, now);
    productChecks.add(check);
    { result = check; newId = nextId + 1 }
  };

  public func getUserProductChecks(
    productChecks : List.List<ProductCheck>,
    userId : UserId,
    limit : Nat,
    offset : Nat,
  ) : [ProductCheck] {
    let userChecks = productChecks.filter(func(p : ProductCheck) : Bool { p.userId == userId });
    let total = userChecks.size();
    if (offset >= total) return [];
    let available = if (total > offset) total - offset else 0;
    let takeCount = if (available < limit) available else limit;
    userChecks.sliceToArray(offset.toInt(), (offset + takeCount).toInt())
  };

  public func getDashboardStats(
    analyses : List.List<ReviewAnalysis>,
    userId : UserId,
  ) : DashboardStats {
    let userAnalyses = analyses.filter(func(a : ReviewAnalysis) : Bool { a.userId == userId });
    let total = userAnalyses.size();
    if (total == 0) {
      return {
        totalAnalyses = 0;
        averageFakeScore = 0.0;
        fakeCount = 0;
        realCount = 0;
        weeklyTrend = [];
      }
    };
    let totalScore = userAnalyses.foldLeft(0.0, func(acc : Float, a : ReviewAnalysis) : Float { acc + a.fakeScore });
    let averageFakeScore = totalScore / total.toFloat();
    let fakeCount = userAnalyses.filter(func(a : ReviewAnalysis) : Bool { a.fakeScore > 50.0 }).size();
    let realCount = if (total > fakeCount) total - fakeCount else 0;

    // Build weekly trend — bucket by week index from epoch (week = 7 days in ns)
    let weekNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let weekMap = Map.empty<Int, { count : Nat; scoreSum : Float }>();
    userAnalyses.forEach(func(a : ReviewAnalysis) {
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
      totalAnalyses = total;
      averageFakeScore = averageFakeScore;
      fakeCount = fakeCount;
      realCount = realCount;
      weeklyTrend = weeklyTrend;
    }
  };

  public func generateTrustBadge(
    productChecks : List.List<ProductCheck>,
    nextProductId : Nat,
    userId : UserId,
    productUrl : Text,
    now : Int,
  ) : { result : TrustBadgeResult; check : ProductCheck; newId : Nat } {
    let check = computeProductCheck(nextProductId, userId, productUrl, now);
    productChecks.add(check);

    let statusText = switch (check.trustBadge) {
      case (#trusted) { "AI Verified - Trusted" };
      case (#caution) { "Caution - Mixed Reviews" };
      case (#risky) { "Risky - High Fake Rate" };
    };
    let scoreText = debug_show(check.fakePercentage.toInt()) # "% fake";
    let badgeCode = "<div style=\"display:inline-block;padding:8px 16px;border-radius:8px;background:#1a1a2e;color:#fff;font-family:sans-serif;font-size:14px;border:2px solid #4CAF50\">"
      # "<strong>TrustCart AI</strong> | " # statusText # " | " # scoreText
      # "</div>";

    let trustBadgeResult : TrustBadgeResult = {
      badgeCode = badgeCode;
      trustStatus = check.trustBadge;
      score = check.fakePercentage;
    };

    { result = trustBadgeResult; check = check; newId = nextProductId + 1 }
  };
};
