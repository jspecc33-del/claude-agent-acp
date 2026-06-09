/**
 * IPromptExecutor — Prompt Streaming Domain
 *
 * Drives the SDK message stream, handles the pending queue, and routes
 * every system/result/assistant/user message type.
 * Extracted from ClaudeAcpAgent.prompt per DDD decomposition.
 */

export interface PromptRequest {
  sessionId: string;
  messages: PromptMessage[];
  abortSignal?: AbortSignal;
}

export interface PromptMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentBlock[];
}

export interface ContentBlock {
  type: string;
  [key: string]: unknown;
}

export interface PromptStreamEvent {
  type: 'text_delta' | 'tool_use' | 'tool_result' | 'message_start' | 'message_stop' | 'error';
  data: unknown;
}

export interface PromptResult {
  stopReason: string;
  content: ContentBlock[];
  usage: { inputTokens: number; outputTokens: number; cacheCreationTokens?: number };
}

export interface IPromptExecutor {
  /** Execute a prompt and stream events to the callback. */
  execute(
    request: PromptRequest,
    onEvent: (event: PromptStreamEvent) => void
  ): Promise<PromptResult>;

  /** Cancel an in-progress prompt by session ID. */
  cancel(sessionId: string): void;
}
