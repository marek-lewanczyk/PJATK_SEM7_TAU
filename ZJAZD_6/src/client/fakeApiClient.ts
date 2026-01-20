import { dataSource, clone } from './dataSource';
import type { ApiResponse, Customer, Payment, Refund, Invoice } from '../api/types';

function nowIso() { return new Date().toISOString(); }

export class FakeApiClient {
  private customers = clone(dataSource.customers);
  private payments = clone(dataSource.payments);
  private refunds = clone(dataSource.refunds);
  private invoices = clone(dataSource.invoices);

  // GET /customers
  async listCustomers(): Promise<ApiResponse<Customer[]>> {
    return { status: 200, data: clone(this.customers) };
  }

  // GET /customers/:id
  async getCustomerById(id: string): Promise<ApiResponse<Customer>> {
    const found = this.customers.find(c => c.id === id);
    if (!found) return { status: 404, error: { code: 'NOT_FOUND', message: 'Customer not found' } };
    return { status: 200, data: clone(found) };
  }

  // GET /payments
  async listPayments(query?: { status?: string }): Promise<ApiResponse<Payment[]>> {
    let items = this.payments;
    if (query?.status) items = items.filter(p => p.status === query.status);
    return { status: 200, data: clone(items) };
  }

  // GET /payments/:id
  async getPaymentById(id: string): Promise<ApiResponse<Payment>> {
    const found = this.payments.find(p => p.id === id);
    if (!found) return { status: 404, error: { code: 'NOT_FOUND', message: 'Payment not found' } };
    return { status: 200, data: clone(found) };
  }

  // POST /payments
  async createPayment(payload: Partial<Payment>): Promise<ApiResponse<Payment>> {
    // minimal validation
    if (!payload.customerId || !payload.amount || !payload.currency) {
      return { status: 400, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } };
    }
    const newPayment: Payment = {
      id: 'p' + Math.random().toString(36).substring(2, 8),
      customerId: payload.customerId,
      amount: payload.amount,
      currency: payload.currency,
      status: 'pending',
      createdAt: nowIso()
    };
    this.payments.push(newPayment);
    return { status: 201, data: clone(newPayment) };
  }

  // POST /payments/:id/capture
  async capturePayment(id: string): Promise<ApiResponse<Payment>> {
    const p = this.payments.find(x => x.id === id);
    if (!p) return { status: 404, error: { code: 'NOT_FOUND', message: 'Payment not found' } };
    if (p.status !== 'pending') return { status: 400, error: { code: 'INVALID_STATE', message: 'Only pending payments can be captured' } };
    p.status = 'captured';
    return { status: 200, data: clone(p) };
  }

  // POST /payments/:id/cancel
  async cancelPayment(id: string): Promise<ApiResponse<Payment>> {
    const p = this.payments.find(x => x.id === id);
    if (!p) return { status: 404, error: { code: 'NOT_FOUND', message: 'Payment not found' } };
    if (p.status !== 'pending') return { status: 400, error: { code: 'INVALID_STATE', message: 'Only pending payments can be cancelled' } };
    p.status = 'cancelled';
    return { status: 200, data: clone(p) };
  }

  // GET /refunds
  async listRefunds(): Promise<ApiResponse<Refund[]>> {
    return { status: 200, data: clone(this.refunds) };
  }

  // GET /refunds/:id
  async getRefundById(id: string): Promise<ApiResponse<Refund>> {
    const r = this.refunds.find(x => x.id === id);
    if (!r) return { status: 404, error: { code: 'NOT_FOUND', message: 'Refund not found' } };
    return { status: 200, data: clone(r) };
  }

  // POST /refunds
  async createRefund(payload: Partial<Refund>): Promise<ApiResponse<Refund>> {
    if (!payload.paymentId || !payload.amount) return { status: 400, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } };
    // check payment exists
    const p = this.payments.find(x => x.id === payload.paymentId);
    if (!p) return { status: 404, error: { code: 'NOT_FOUND', message: 'Payment not found' } };
    const newR: Refund = { id: 'r' + Math.random().toString(36).substring(2,8), paymentId: payload.paymentId!, amount: payload.amount!, createdAt: nowIso(), reason: payload.reason };
    this.refunds.push(newR);
    return { status: 201, data: clone(newR) };
  }

  // GET /invoices
  async listInvoices(): Promise<ApiResponse<Invoice[]>> {
    return { status: 200, data: clone(this.invoices) };
  }

  // GET /invoices/:id
  async getInvoiceById(id: string): Promise<ApiResponse<Invoice>> {
    const inv = this.invoices.find(x => x.id === id);
    if (!inv) return { status: 404, error: { code: 'NOT_FOUND', message: 'Invoice not found' } };
    return { status: 200, data: clone(inv) };
  }
}

export default FakeApiClient;

