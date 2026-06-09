/**
 * IClaudeCliLocator — Platform / CLI Resolution Domain
 *
 * Locates the claude CLI binary for the current platform and architecture,
 * handling musl vs glibc Linux detection.
 * Extracted from claudeCliPath + isMuslLibc per DDD decomposition.
 */

export type Platform = 'darwin' | 'linux' | 'win32';
export type Arch = 'x64' | 'arm64';
export type LibcVariant = 'glibc' | 'musl';

export interface PlatformInfo {
  platform: Platform;
  arch: Arch;
  libc?: LibcVariant;
}

export interface IClaudeCliLocator {
  /** Resolve the absolute path to the claude CLI binary. */
  resolve(): Promise<string>;

  /** Detect the libc variant on Linux (glibc vs musl). */
  detectLibc(): Promise<LibcVariant>;

  /** Return structured info about the current platform. */
  getPlatformInfo(): Promise<PlatformInfo>;

  /** Return true if auth UI should be hidden (gateway mode). */
  shouldHideAuth(): boolean;
}
