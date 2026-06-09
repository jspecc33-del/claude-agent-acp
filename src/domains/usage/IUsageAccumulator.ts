/**
 * IUsageAccumulator — Token Usage Accounting Domain
 *
 * Tracks per-session and aggregate token usage, context window consumption,
 * and cost snapshots.
 * Extracted from AccumulatedUsage / sessionUsage / totalTokens per DDD decomposition.
 */

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
}

export interface UsageSnapshot {
  sessionId: string;
  timestamp: Date;
  usage: TokenUsage;
  contextWindowUsed: number;
  contextWindowMax: number;
}

export interface IUsageAccumulator {
  /** Record a new usage delta for a session. */
  record(sessionId: string, delta: Partial<TokenUsage>): void;

  /** Get the accumulated usage for a session. */
  getSession(sessionId: string): TokenUsage;

  /** Get total usage across all sessions. */
  getTotal(): TokenUsage;

  /** Take a point-in-time snapshot of session usage. */
  snapshot(sessionId: string, contextWindowMax: number): UsageSnapshot;

  /** Reset usage for a session. */
  reset(sessionId: string): void;
}
