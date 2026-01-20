import FakeApiClient from '../src/client/fakeApiClient';

let client: FakeApiClient;

beforeEach(() => {
  client = new FakeApiClient();
});

test('GET /refunds list and GET /refunds/:id', async () => {
  const all = await client.listRefunds();
  expect(all.status).toBe(200);
  expect(Array.isArray(all.data)).toBe(true);

  const ok = await client.getRefundById('r1');
  expect(ok.status).toBe(200);
  expect(ok.data!.id).toBe('r1');

  const miss = await client.getRefundById('nope');
  expect(miss.status).toBe(404);
});

