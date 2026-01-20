// This test ensures that the dataSource module can be mocked and that FakeApiClient uses the mocked clone

jest.mock('../src/client/dataSource', () => {
  const clone = jest.fn((x: any) => JSON.parse(JSON.stringify(x)));
  return {
    dataSource: {
      customers: [{ id: 'mx', name: 'Mocked', email: 'mock@example.com', createdAt: new Date().toISOString() }],
      payments: [],
      refunds: [],
      invoices: []
    },
    clone
  };
});

const DS = require('../src/client/dataSource');
const FakeApiClient = require('../src/client/fakeApiClient').default;

test('mocked dataSource is used and clone called', async () => {
  const client = new FakeApiClient();
  const res = await client.listCustomers();
  expect(res.status).toBe(200);
  expect(res.data!.length).toBe(1);
  // clone should be called during construction and when listing
  expect(DS.clone).toHaveBeenCalled();
});

