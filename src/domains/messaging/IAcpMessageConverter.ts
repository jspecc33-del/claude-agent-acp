/**
 * IAcpMessageConverter — Message Format Conversion Domain
 *
 * Converts between ACP PromptRequest / SessionNotification format and
 * the underlying SDK message format, and vice-versa.
 * Extracted from promptToClaude + toAcpNotifications per DDD decomposition.
 */

export interface AcpContentBlock {
  type: string;
  [key: string]: unknown;
}

export interface SdkMessage {
  role: string;
  content: SdkContentBlock[];
}

export interface SdkContentBlock {
  type: string;
  [key: string]: unknown;
}

export interface SdkStreamEvent {
  type: string;
  [key: string]: unknown;
}

export interface SessionNotification {
  type: string;
  data: unknown;
}

export interface IAcpMessageConverter {
  /** Convert ACP request content blocks to SDK user message format. */
  acpToSdk(blocks: AcpContentBlock[]): SdkMessage;

  /** Convert a single SDK stream event to zero or more ACP notifications. */
  sdkEventToAcp(
    event: SdkStreamEvent,
    sessionId: string
  ): SessionNotification[];
}
