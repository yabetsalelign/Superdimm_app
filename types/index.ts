// SuperDimm Mobile — Core TypeScript Types
// These interfaces describe the customer-facing data model.
// They will be populated by the API layer in Phase 2.

// ─────────────────────────────────────────────
// Auth & Session
// ─────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
}

export interface AuthSession {
  tokens: AuthTokens;
  customer: CustomerSummary;
}

// ─────────────────────────────────────────────
// Customer
// ─────────────────────────────────────────────

export type AccountStatus = 'active' | 'suspended' | 'pending' | 'closed';

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  status: AccountStatus;
}

export interface Customer extends CustomerSummary {
  phone?: string;
  plan?: ServicePlan;
  address?: string;
  createdAt: string; // ISO 8601
}

// ─────────────────────────────────────────────
// Service Plans
// ─────────────────────────────────────────────

export type ServiceCategory = 'internet' | 'voice' | 'tv' | 'bundle' | 'business';

export interface ServicePlan {
  id: string;
  name: string;
  category: ServiceCategory;
  description?: string;
  monthlyRate?: number;
  currency?: string;
  isActive: boolean;
}

// ─────────────────────────────────────────────
// Service Requests
// ─────────────────────────────────────────────

export type RequestStatus =
  | 'submitted'
  | 'in_progress'
  | 'pending_customer'
  | 'resolved'
  | 'closed';

export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export type RequestCategory =
  | 'network_outage'
  | 'billing_discrepancy'
  | 'technical_support'
  | 'service_change'
  | 'complaint'
  | 'other';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: RequestPriority;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  resolvedAt?: string;
  caseReference: string; // e.g. "SD-2024-00142"
}

// ─────────────────────────────────────────────
// Alerts / Notifications
// ─────────────────────────────────────────────

export type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

export interface CustomerAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  isRead: boolean;
  createdAt: string; // ISO 8601
  actionLabel?: string;
  actionRoute?: string;
}

// ─────────────────────────────────────────────
// Transactions / Billing
// ─────────────────────────────────────────────

export type TransactionType = 'payment' | 'invoice' | 'credit' | 'adjustment';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  description: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  createdAt: string; // ISO 8601
}

// ─────────────────────────────────────────────
// API Responses (generic wrappers)
// ─────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
