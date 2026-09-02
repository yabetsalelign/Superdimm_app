// SuperDimm Mobile — Core TypeScript Types
// Aligned with the SuperDimm backend Prisma models and API endpoints.

// ─────────────────────────────────────────────
// Auth & Session
// ─────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  tokenType: string; // 'Bearer'
  expiresAt: number; // Unix timestamp in milliseconds
}

export interface UserSummary {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export interface CustomerSummary {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  plan?: string | null;
  status: string;
}

export interface AuthSessionData {
  accessToken: string;
  tokenType: string;
  expiresAt: number;
  user: UserSummary;
  customer: CustomerSummary | null;
}

// ─────────────────────────────────────────────
// Customer Profile & Details
// ─────────────────────────────────────────────

export interface CustomerProfileDetail extends CustomerSummary {
  createdAt: string;
  updatedAt: string;
  activeRequestsCount: number;
  totalRequestsCount: number;
  recentRequests: Array<{
    id: string;
    title: string;
    category: string;
    status: string;
    priority: string;
    createdAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    amount: number;
    description: string;
    type: string;
    createdAt: string;
  }>;
}

// ─────────────────────────────────────────────
// Services / Plans (Authoritative Database Schema)
// ─────────────────────────────────────────────

export interface CustomerServicesData {
  planName: string;
  status: string;
  memberSince: string;
}

// ─────────────────────────────────────────────
// Service Requests
// ─────────────────────────────────────────────

export type RequestCategory =
  | 'network'
  | 'sim'
  | 'billing'
  | 'plan'
  | 'provisioning'
  | 'account'
  | 'other';

export type RequestStatus =
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'pending_customer'
  | 'escalated'
  | 'resolved'
  | 'closed';

export type RequestPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ServiceRequest {
  id: string;
  customerId: string;
  title: string;
  description?: string | null;
  category: RequestCategory | string;
  status: RequestStatus | string;
  priority: RequestPriority | string;
  assignedUserId?: string | null;
  createdByUserId?: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: CustomerSummary;
  assignedUser?: {
    id: string;
    name?: string | null;
    email: string;
  } | null;
}

// ─────────────────────────────────────────────
// Alerts / Notifications (Authoritative Data Derived)
// ─────────────────────────────────────────────

export type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

export interface CustomerAlert {
  id: string;
  title: string;
  message: string;
  type: 'request' | 'billing' | 'account';
  severity: AlertSeverity;
  isRead: boolean;
  createdAt: string;
  actionRoute?: string;
}

// ─────────────────────────────────────────────
// API Responses
// ─────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
  error?: never;
}

export interface ApiError {
  success: false;
  error: {
    code?: string;
    message: string;
  };
  data?: never;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
