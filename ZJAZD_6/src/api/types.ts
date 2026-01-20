// Domain: E-commerce orders & payments

export type ID = string;

export interface Customer {
  id: ID;
  name: string;
  email: string;
  createdAt: string; // ISO
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'captured';

export interface Payment {
  id: ID;
  customerId: ID;
  amount: number; // cents
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface Refund {
  id: ID;
  paymentId: ID;
  amount: number;
  reason?: string;
  createdAt: string;
}

export interface Invoice {
  id: ID;
  customerId: ID;
  amount: number;
  paid: boolean;
  issuedAt: string;
}

// Generic API response
export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: { code: string; message: string };
}

