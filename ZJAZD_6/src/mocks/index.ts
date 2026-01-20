import FakeApiClient from '../client/fakeApiClient';

export function createMockClient() {
  return new FakeApiClient();
}

export default createMockClient;

