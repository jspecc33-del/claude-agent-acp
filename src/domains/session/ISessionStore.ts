/**
 * ISessionStore — Session Lifecycle Domain
 *
 * Owns creation, forking, resumption, listing, and teardown of agent sessions.
 * Extracted from ClaudeAcpAgent per DDD bounded-context decomposition.
 */

export interface SessionMetadata {
  id: string;
  parentId?: string;
  createdAt: Date;
  lastAccessedAt: Date;
  model: string;
  mode: string;
}

export interface ForkOptions {
  parentSessionId: string;
  inheritHistory?: boolean;
}

export interface ResumeOptions {
  sessionId: string;
}

export interface ISessionStore {
  /** Create a brand-new session. */
  newSession(model: string, mode: string): Promise<SessionMetadata>;

  /** Fork an existing session, optionally inheriting its history. */
  forkSession(options: ForkOptions): Promise<SessionMetadata>;

  /** Resume a previously saved session by ID. */
  resumeSession(options: ResumeOptions): Promise<SessionMetadata>;

  /** Load (but do not activate) a session for inspection. */
  loadSession(sessionId: string): Promise<SessionMetadata | undefined>;

  /** Close and persist a session. */
  closeSession(sessionId: string): Promise<void>;

  /** Tear down a session, releasing all held resources. */
  teardownSession(sessionId: string): Promise<void>;

  /** List all known sessions for the current agent. */
  listSessions(): Promise<SessionMetadata[]>;

  /** Return session if it exists, otherwise create a new one. */
  getOrCreate(model: string, mode: string): Promise<SessionMetadata>;
}
