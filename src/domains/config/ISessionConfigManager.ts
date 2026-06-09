/**
 * ISessionConfigManager — Session Configuration Domain
 *
 * Manages runtime configuration options for a session: mode, model,
 * and arbitrary named config options.
 * Extracted from setSessionMode/Model/ConfigOption per DDD decomposition.
 */

export type ConfigOptionValue = string | number | boolean | null;

export interface ConfigOption {
  key: string;
  value: ConfigOptionValue;
  description?: string;
}

export interface ISessionConfigManager {
  /** Switch the active mode for a session. */
  setMode(sessionId: string, mode: string): Promise<void>;

  /** Switch the active model for a session. */
  setModel(sessionId: string, modelId: string): Promise<void>;

  /** Set a named configuration option for a session. */
  setOption(sessionId: string, key: string, value: ConfigOptionValue): Promise<void>;

  /** Apply a config option value (may have side effects beyond storage). */
  applyOption(sessionId: string, option: ConfigOption): Promise<void>;

  /** Get all current config options for a session. */
  getOptions(sessionId: string): Promise<ConfigOption[]>;
}
