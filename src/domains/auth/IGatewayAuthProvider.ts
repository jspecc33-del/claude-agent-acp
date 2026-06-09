/**
 * IGatewayAuthProvider — Gateway Authentication Domain
 *
 * Authenticates the agent against a custom API gateway, managing
 * headers and environment variables for gateway-routed calls.
 * Extracted from authenticate + createEnvForGateway per DDD decomposition.
 */

export interface GatewayCredentials {
  token: string;
  gatewayUrl: string;
  organizationId?: string;
}

export interface GatewayAuthResult {
  authenticated: boolean;
  headers: Record<string, string>;
  /** Additional env vars to inject for SDK calls routed via the gateway. */
  env: Record<string, string>;
  expiresAt?: Date;
}

export interface IGatewayAuthProvider {
  /** Authenticate and return headers + env vars for gateway calls. */
  authenticate(credentials: GatewayCredentials): Promise<GatewayAuthResult>;

  /** Build the env object needed to route an SDK call via the gateway. */
  buildEnv(authResult: GatewayAuthResult): Record<string, string>;

  /** Check whether cached auth is still valid. */
  isValid(authResult: GatewayAuthResult): boolean;
}
