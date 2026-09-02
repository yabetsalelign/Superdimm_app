// SuperDimm Mobile — API Service Layer (Phase 1 Stub)
//
// This module defines the API client architecture.
// Endpoints are stubbed and will be wired to the real SuperDimm backend in Phase 2.
//
// Architecture:
//   api.request<T>()   — typed HTTP helper
//   api.auth           — authentication namespace
//   api.customer       — customer profile namespace
//   api.services       — service plans namespace
//   api.requests       — service requests namespace
//   api.notifications  — alerts/notifications namespace

import type {
  ApiResponse,
  AuthTokens,
  AuthSession,
  Customer,
  ServicePlan,
  ServiceRequest,
  CustomerAlert,
  Transaction,
} from '@/types';

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

// TODO (Phase 2): Move to environment config / Expo Constants
const API_BASE_URL = 'https://api.superdimm.example.com/v1';

const DEFAULT_TIMEOUT_MS = 15_000;

// ─────────────────────────────────────────────
// HTTP Client
// ─────────────────────────────────────────────

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  accessToken?: string;
  signal?: AbortSignal;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, accessToken, signal } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
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

    const json = (await response.json()) as ApiResponse<T>;
    return json;
  } catch (err) {
    clearTimeout(timeoutId);

    const message =
      err instanceof Error
        ? err.name === 'AbortError'
          ? 'Request timed out. Please check your connection.'
          : err.message
        : 'An unexpected error occurred.';

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
   * TODO (Phase 2): POST /auth/login
   * Authenticate a customer and receive access + refresh tokens.
   */
  login: async (_email: string, _password: string): Promise<ApiResponse<AuthSession>> => {
    // Stub — not implemented in Phase 1
    return {
      success: false,
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Authentication will be implemented in Phase 2.',
      },
    };
  },

  /**
   * TODO (Phase 2): POST /auth/refresh
   * Exchange a refresh token for new access + refresh tokens.
   */
  refresh: async (_refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    return {
      success: false,
      error: { code: 'NOT_IMPLEMENTED', message: 'Token refresh not yet implemented.' },
    };
  },

  /**
   * TODO (Phase 2): POST /auth/logout
   */
  logout: async (_refreshToken: string): Promise<ApiResponse<void>> => {
    return {
      success: false,
      error: { code: 'NOT_IMPLEMENTED', message: 'Logout not yet implemented.' },
    };
  },
};

// ─────────────────────────────────────────────
// Customer Namespace
// ─────────────────────────────────────────────

export const customer = {
  /**
   * TODO (Phase 2): GET /customer/me
   * Fetch the authenticated customer's full profile.
   */
  getProfile: async (accessToken: string): Promise<ApiResponse<Customer>> =>
    request<Customer>('/customer/me', { accessToken }),

  /**
   * TODO (Phase 2): PATCH /customer/me
   * Update customer profile fields.
   */
  updateProfile: async (
    accessToken: string,
    payload: Partial<Pick<Customer, 'name' | 'phone' | 'address'>>,
  ): Promise<ApiResponse<Customer>> =>
    request<Customer>('/customer/me', {
      method: 'PATCH',
      body: payload,
      accessToken,
    }),
};

// ─────────────────────────────────────────────
// Services Namespace
// ─────────────────────────────────────────────

export const services = {
  /**
   * TODO (Phase 2): GET /customer/services
   * List the customer's active service plans.
   */
  list: async (accessToken: string): Promise<ApiResponse<ServicePlan[]>> =>
    request<ServicePlan[]>('/customer/services', { accessToken }),
};

// ─────────────────────────────────────────────
// Requests Namespace
// ─────────────────────────────────────────────

export const requests = {
  /**
   * TODO (Phase 2): GET /customer/requests
   */
  list: async (accessToken: string): Promise<ApiResponse<ServiceRequest[]>> =>
    request<ServiceRequest[]>('/customer/requests', { accessToken }),

  /**
   * TODO (Phase 2): GET /customer/requests/:id
   */
  getById: async (
    accessToken: string,
    id: string,
  ): Promise<ApiResponse<ServiceRequest>> =>
    request<ServiceRequest>(`/customer/requests/${id}`, { accessToken }),

  /**
   * TODO (Phase 2): POST /customer/requests
   */
  create: async (
    accessToken: string,
    payload: Pick<ServiceRequest, 'title' | 'description' | 'category'>,
  ): Promise<ApiResponse<ServiceRequest>> =>
    request<ServiceRequest>('/customer/requests', {
      method: 'POST',
      body: payload,
      accessToken,
    }),
};

// ─────────────────────────────────────────────
// Notifications Namespace
// ─────────────────────────────────────────────

export const notifications = {
  /**
   * TODO (Phase 2): GET /customer/alerts
   */
  list: async (accessToken: string): Promise<ApiResponse<CustomerAlert[]>> =>
    request<CustomerAlert[]>('/customer/alerts', { accessToken }),

  /**
   * TODO (Phase 2): PATCH /customer/alerts/:id/read
   */
  markRead: async (
    accessToken: string,
    alertId: string,
  ): Promise<ApiResponse<void>> =>
    request<void>(`/customer/alerts/${alertId}/read`, {
      method: 'PATCH',
      accessToken,
    }),
};

// ─────────────────────────────────────────────
// Payments / Transactions Namespace
// ─────────────────────────────────────────────

export const payments = {
  /**
   * TODO (Phase 2): GET /customer/transactions
   */
  listTransactions: async (accessToken: string): Promise<ApiResponse<Transaction[]>> =>
    request<Transaction[]>('/customer/transactions', { accessToken }),
};

// ─────────────────────────────────────────────
// Unified export
// ─────────────────────────────────────────────

export const api = {
  auth,
  customer,
  services,
  requests,
  notifications,
  payments,
};

export default api;
