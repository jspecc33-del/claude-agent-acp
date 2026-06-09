/**
 * ISessionFactory — Session Initialization Domain
 *
 * Assembles SDK Options: MCP server wiring, hooks, permission mode,
 * system prompt, environment variables, and model configuration.
 * Extracted from ClaudeAcpAgent.createSession per DDD decomposition.
 */

export interface McpServerConfig {
  name: string;
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface SessionBuildOptions {
  sessionId: string;
  model: string;
  mode: string;
  systemPrompt?: string;
  mcpServers?: McpServerConfig[];
  permissionMode?: string;
  extraEnv?: Record<string, string>;
  hooks?: Record<string, unknown>;
}

export interface BuiltSession {
  sdkOptions: Record<string, unknown>;
  resolvedModel: string;
  resolvedPermissionMode: string;
  mcpServersWired: string[];
}

export interface ISessionFactory {
  /** Build the SDK options object for a new session. */
  build(options: SessionBuildOptions): Promise<BuiltSession>;
}
