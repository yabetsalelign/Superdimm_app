// SuperDimm Mobile — Secure Storage Service
// Handles encrypted storage for auth tokens and customer session data.
// Uses expo-secure-store on iOS/Android and localStorage in web browser environments.

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { AuthTokens, AuthSessionData, CustomerSummary, UserSummary } from '@/types';

const KEYS = {
  ACCESS_TOKEN: 'superdimm.auth.access_token',
  TOKEN_TYPE: 'superdimm.auth.token_type',
  TOKEN_EXPIRY: 'superdimm.auth.token_expiry',
  USER_DATA: 'superdimm.auth.user_data',
  CUSTOMER_DATA: 'superdimm.auth.customer_data',
} as const;

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch {
      // storage unavailable
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch {
      // storage unavailable
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export const storage = {
  /**
   * Persist full authentication session to secure storage.
   */
  saveSession: async (session: AuthSessionData): Promise<void> => {
    await Promise.all([
      setItem(KEYS.ACCESS_TOKEN, session.accessToken),
      setItem(KEYS.TOKEN_TYPE, session.tokenType || 'Bearer'),
      setItem(KEYS.TOKEN_EXPIRY, String(session.expiresAt)),
      setItem(KEYS.USER_DATA, JSON.stringify(session.user)),
      session.customer ? setItem(KEYS.CUSTOMER_DATA, JSON.stringify(session.customer)) : Promise.resolve(),
    ]);
  },

  /**
   * Read stored auth tokens. Returns null if missing or expired.
   */
  getTokens: async (): Promise<AuthTokens | null> => {
    const [accessToken, tokenType, expiresAtStr] = await Promise.all([
      getItem(KEYS.ACCESS_TOKEN),
      getItem(KEYS.TOKEN_TYPE),
      getItem(KEYS.TOKEN_EXPIRY),
    ]);

    if (!accessToken || !expiresAtStr) {
      return null;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || expiresAt <= Date.now()) {
      // Token is expired
      await storage.clearSession();
      return null;
    }

    return {
      accessToken,
      tokenType: tokenType || 'Bearer',
      expiresAt,
    };
  },

  /**
   * Retrieve cached user details.
   */
  getUser: async (): Promise<UserSummary | null> => {
    const raw = await getItem(KEYS.USER_DATA);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Retrieve cached customer details.
   */
  getCustomer: async (): Promise<CustomerSummary | null> => {
    const raw = await getItem(KEYS.CUSTOMER_DATA);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Check if a valid unexpired session exists.
   */
  hasValidSession: async (): Promise<boolean> => {
    const tokens = await storage.getTokens();
    return tokens !== null;
  },

  /**
   * Clear all persisted session data upon logout.
   */
  clearSession: async (): Promise<void> => {
    await Promise.all([
      deleteItem(KEYS.ACCESS_TOKEN),
      deleteItem(KEYS.TOKEN_TYPE),
      deleteItem(KEYS.TOKEN_EXPIRY),
      deleteItem(KEYS.USER_DATA),
      deleteItem(KEYS.CUSTOMER_DATA),
    ]);
  },
};

export default storage;
