import FakeApiClient from '../src/client/fakeApiClient';

let client: FakeApiClient;

beforeEach(() => {
  client = new FakeApiClient();
});

test('GET /customers returns list', async () => {
  const res = await client.listCustomers();
  expect(res.status).toBe(200);
  expect(Array.isArray(res.data)).toBe(true);
  expect(res.data!.length).toBeGreaterThan(0);
});

test('GET /customers/:id returns 200 for existing and 404 for missing', async () => {
  const ok = await client.getCustomerById('c1');
  expect(ok.status).toBe(200);
  expect(ok.data!.id).toBe('c1');

  const miss = await client.getCustomerById('nope');
  expect(miss.status).toBe(404);
  expect(miss.error!.code).toBe('NOT_FOUND');
});

test('GET /payments list and filter by status', async () => {
  const all = await client.listPayments();
  expect(all.status).toBe(200);
  expect(all.data!.length).toBeGreaterThan(0);

  const pending = await client.listPayments({ status: 'pending' });
  expect(pending.status).toBe(200);
  expect(pending.data!.every(p => p.status === 'pending')).toBe(true);
});

test('GET /payments/:id returns 404 for missing', async () => {
  const res = await client.getPaymentById('nope');
  expect(res.status).toBe(404);
});

test('POST /payments creates and validates', async () => {
  const bad = await client.createPayment({ amount: 1000 } as any);
  expect(bad.status).toBe(400);

  const good = await client.createPayment({ customerId: 'c1', amount: 1500, currency: 'USD' });
  expect(good.status).toBe(201);
  expect(good.data!.status).toBe('pending');
});

test('POST /payments/:id/capture and cancel', async () => {
  // create a pending payment
  const created = await client.createPayment({ customerId: 'c1', amount: 2000, currency: 'USD' });
  expect(created.status).toBe(201);
  const id = created.data!.id;

  const cap = await client.capturePayment(id);
  expect(cap.status).toBe(200);
  expect(cap.data!.status).toBe('captured');

  // cannot cancel captured
  const cancelRes = await client.cancelPayment(id);
  expect(cancelRes.status).toBe(400);
  expect(cancelRes.error!.code).toBe('INVALID_STATE');
});

test('POST /refunds creates and validates', async () => {
  // create a payment to refund
  const p = await client.createPayment({ customerId: 'c1', amount: 3000, currency: 'USD' });
  const resBad = await client.createRefund({ amount: 1000 } as any);
  expect(resBad.status).toBe(400);

  const resNotFound = await client.createRefund({ paymentId: 'nope', amount: 1000 });
  expect(resNotFound.status).toBe(404);

  const ok = await client.createRefund({ paymentId: p.data!.id, amount: 1000, reason: 'customer_request' });
  expect(ok.status).toBe(201);
  expect(ok.data!.paymentId).toBe(p.data!.id);
});

test('GET /invoices and /invoices/:id', async () => {
  const all = await client.listInvoices();
  expect(all.status).toBe(200);
  const ok = await client.getInvoiceById('i1');
  expect(ok.status).toBe(200);
  const miss = await client.getInvoiceById('nope');
  expect(miss.status).toBe(404);
});

