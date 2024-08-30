// Mock nanoid to return a fake ID when called in a test
jest.mock('nanoid', () => ({
  nanoid: () => 'this-is-a-fake-nano-id',
}));
