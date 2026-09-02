// SuperDimm Mobile — API Client Layer
// Connects to the SuperDimm Next.js backend via REST endpoints with JWT Bearer authentication.

import type {
  ApiResponse,
  AuthSessionData,
  CustomerProfileDetail,
  CustomerServicesData,
  CustomerAlert,
  ServiceRequest,
} from '@/types';
import { storage } from './storage';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:3000/api';

const DEFAULT_TIMEOUT_MS = 15_000;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  accessToken?: string;
  signal?: AbortSignal;
}

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, accessToken: customToken, signal } = options;

  let token = customToken;
  if (!token) {
    const savedTokens = await storage.getTokens();
    if (savedTokens) {
      token = savedTokens.accessToken;
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  const combinedSignal = signal ?? controller.signal;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok) {
      // 401 Unauthorized -> clear token if expired
      if (response.status === 401) {
        await storage.clearSession();
      }
      return {
        success: false,
        error: {
          code: String(response.status),
          message: json?.error || json?.message || `Request failed with status ${response.status}`,
        },
      };
    }

    // Backend responses that wrap data in { success: true, data: T }
    if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
      return json as ApiResponse<T>;
    }

    // Plain JSON payload returned by standard routes
    return {
      success: true,
      data: json as T,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const message =
      err instanceof Error
        ? err.name === 'AbortError'
          ? 'Network request timed out. Please verify the backend is running.'
          : err.message
        : 'Network request failed.';

    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message },
    };
  }
}

// ─────────────────────────────────────────────
// Auth Namespace
// ─────────────────────────────────────────────

export const auth = {
  /**
   * Authenticate mobile client and retrieve signed JWT.
   */
  login: async (email: string, password: string): Promise<ApiResponse<AuthSessionData>> => {
    return request<AuthSessionData>('/auth/mobile', {
      method: 'POST',
      body: { email, password },
    });
  },

  logout: async (): Promise<void> => {
    await storage.clearSession();
  },
};

// ─────────────────────────────────────────────
// Customer Profile Namespace
// ─────────────────────────────────────────────

export const customer = {
  /**
   * Fetch authenticated customer's profile, plan, and recent statistics.
   */
  getProfile: async (): Promise<ApiResponse<CustomerProfileDetail>> => {
    return request<CustomerProfileDetail>('/customer/me');
  },
};

// ─────────────────────────────────────────────
// Services / Plans Namespace
// ─────────────────────────────────────────────

export const services = {
  /**
   * Fetch customer's active subscription tier and provisioning status.
   */
  getServices: async (): Promise<ApiResponse<CustomerServicesData>> => {
    return request<CustomerServicesData>('/customer/services');
  },
};

// ─────────────────────────────────────────────
// Service Requests Namespace
// ─────────────────────────────────────────────

export const requests = {
  /**
   * List customer's support requests.
   */
  list: async (): Promise<ApiResponse<ServiceRequest[]>> => {
    return request<ServiceRequest[]>('/requests');
  },

  /**
   * Get single service request by ID.
   */
  getById: async (id: string): Promise<ApiResponse<ServiceRequest>> => {
    return request<ServiceRequest>(`/requests/${id}`);
  },

  /**
   * Create a new support ticket.
   */
  create: async (payload: {
    title: string;
    description?: string;
    category?: string;
  }): Promise<ApiResponse<ServiceRequest>> => {
    return request<ServiceRequest>('/requests', {
      method: 'POST',
      body: payload,
    });
  },
};

// ─────────────────────────────────────────────
// Alerts / Notifications Namespace
// ─────────────────────────────────────────────

export const notifications = {
  /**
   * Fetch real subscriber notifications derived from active cases and account records.
   */
  list: async (): Promise<ApiResponse<CustomerAlert[]>> => {
    return request<CustomerAlert[]>('/customer/alerts');
  },
};

export const api = {
  auth,
  customer,
  services,
  requests,
  notifications,
};

export default api;
