// SuperDimm Mobile — Secure Storage Service (Phase 1 Stub)
//
// Wraps expo-secure-store for encrypted key/value storage on device.
// This is the designated place for auth tokens in Phase 2.
//
// In Phase 1: the module is structured and typed but no real tokens are stored.

import * as SecureStore from 'expo-secure-store';
import type { AuthTokens } from '@/types';

// ─────────────────────────────────────────────
// Storage Keys
// ─────────────────────────────────────────────

const KEYS = {
  ACCESS_TOKEN: 'superdimm.auth.access_token',
  REFRESH_TOKEN: 'superdimm.auth.refresh_token',
  TOKEN_EXPIRY: 'superdimm.auth.token_expiry',
} as const;

// ─────────────────────────────────────────────
// Token Storage
// ─────────────────────────────────────────────

export const storage = {
  /**
   * Persist auth tokens to secure device storage.
   * TODO (Phase 2): Call this after successful login.
   */
  saveTokens: async (tokens: AuthTokens): Promise<void> => {
    await Promise.all([
      SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, tokens.accessToken),
      SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, tokens.refreshToken),
      SecureStore.setItemAsync(KEYS.TOKEN_EXPIRY, String(tokens.expiresAt)),
    ]);
  },

  /**
   * Read stored auth tokens. Returns null if not present.
   * TODO (Phase 2): Call on app launch to restore session.
   */
  getTokens: async (): Promise<AuthTokens | null> => {
    const [accessToken, refreshToken, expiresAtStr] = await Promise.all([
      SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),
      SecureStore.getItemAsync(KEYS.TOKEN_EXPIRY),
    ]);

    if (!accessToken || !refreshToken || !expiresAtStr) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt: parseInt(expiresAtStr, 10),
    };
  },

  /**
   * Check if stored tokens exist and have not expired.
   * TODO (Phase 2): Use this to gate authenticated navigation.
   */
  hasValidSession: async (): Promise<boolean> => {
    const tokens = await storage.getTokens();
    if (!tokens) return false;
    return tokens.expiresAt > Date.now();
  },

  /**
   * Remove all stored tokens (logout / session clear).
   * TODO (Phase 2): Call on logout or 401 response.
   */
  clearTokens: async (): Promise<void> => {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.TOKEN_EXPIRY),
    ]);
  },
};

export default storage;
