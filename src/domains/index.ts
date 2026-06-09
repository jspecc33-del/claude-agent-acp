/**
 * DDD Bounded Context Exports — ClaudeAcpAgent Decomposition
 *
 * 10 bounded contexts extracted from the 2,971-line ClaudeAcpAgent god object.
 * Each interface defines a single responsibility.
 *
 * Migration: implement each interface as a domain service, then reduce
 * ClaudeAcpAgent to a thin orchestrator (~200 lines) that delegates.
 */

export type { ISessionStore, SessionMetadata, ForkOptions, ResumeOptions } from './session/ISessionStore';
export type { ISessionFactory, SessionBuildOptions, BuiltSession, McpServerConfig } from './session/ISessionFactory';
export type { IPromptExecutor, PromptRequest, PromptResult, PromptStreamEvent } from './prompt/IPromptExecutor';
export type { IToolPermissionGateway, ToolUseRequest, PermissionResult, PermissionDecision } from './permissions/IToolPermissionGateway';
export type { IAcpMessageConverter, AcpContentBlock, SdkStreamEvent, SessionNotification } from './messaging/IAcpMessageConverter';
export type { IModelResolver, ModelPreference, ResolvedModel, AvailableMode } from './model/IModelResolver';
export type { ISessionConfigManager, ConfigOption, ConfigOptionValue } from './config/ISessionConfigManager';
export type { IUsageAccumulator, TokenUsage, UsageSnapshot } from './usage/IUsageAccumulator';
export type { IGatewayAuthProvider, GatewayCredentials, GatewayAuthResult } from './auth/IGatewayAuthProvider';
export type { IClaudeCliLocator, PlatformInfo, Platform, Arch, LibcVariant } from './platform/IClaudeCliLocator';
