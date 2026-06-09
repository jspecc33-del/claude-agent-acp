/**
 * IToolPermissionGateway — Tool Permission Domain
 *
 * Decides whether a tool use should be allowed, denied, or require
 * interactive confirmation. Handles ExitPlanMode and Bash terminal dispatch.
 * Extracted from ClaudeAcpAgent.canUseTool per DDD decomposition.
 */

export type PermissionDecision = 'allow' | 'deny' | 'ask';

export interface ToolUseRequest {
  sessionId: string;
  toolName: string;
  toolInput: Record<string, unknown>;
  permissionMode: string;
  alwaysAllowPatterns?: string[];
}

export interface PermissionResult {
  decision: PermissionDecision;
  /** Human-readable reason shown when denying or asking. */
  reason?: string;
  /** For terminal dispatch: the terminal ID that was started/resumed. */
  terminalId?: string;
}

export interface IToolPermissionGateway {
  /** Evaluate whether a tool use should proceed. */
  evaluate(request: ToolUseRequest): Promise<PermissionResult>;

  /** Describe what the always-allow list covers (for display). */
  describeAlwaysAllow(patterns: string[]): string;
}
