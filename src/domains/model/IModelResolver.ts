/**
 * IModelResolver — Model Resolution Domain
 *
 * Resolves user model preferences, applies allowlists, and enumerates
 * available models and modes.
 * Extracted from resolveModelPreference + buildAvailableModes per DDD decomposition.
 */

export interface ModelPreference {
  /** Raw string the user specified (e.g. "opus", "claude-3-5-sonnet-latest"). */
  raw: string;
}

export interface ResolvedModel {
  /** Full canonical model ID. */
  modelId: string;
  /** Display name. */
  displayName: string;
  /** Context window size in tokens. */
  contextWindow: number;
}

export interface AvailableMode {
  id: string;
  displayName: string;
  description?: string;
}

export interface IModelResolver {
  /** Resolve a user preference string to a canonical model. */
  resolve(preference: ModelPreference): ResolvedModel;

  /** Apply an allowlist filter to a set of candidate models. */
  applyAllowlist(models: ResolvedModel[], allowlist: string[]): ResolvedModel[];

  /** List all models available to the current session. */
  getAvailable(): ResolvedModel[];

  /** List all modes available for a given model. */
  getModes(modelId: string): AvailableMode[];
}
