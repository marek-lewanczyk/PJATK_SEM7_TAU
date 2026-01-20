import db from '../data/db.json';
import type { Customer, Payment, Refund, Invoice } from '../api/types';

// Simple in-memory data source that exposes collections
export const dataSource = {
  customers: db.customers as Customer[],
  payments: db.payments as Payment[],
  refunds: db.refunds as Refund[],
  invoices: db.invoices as Invoice[]
};

// Helper to clone data to avoid accidental mutation in tests
export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
