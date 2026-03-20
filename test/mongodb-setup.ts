import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

/**
 * Setup function to start MongoDB Memory Server
 * Run this before e2e tests
 */
export async function setupTestDB(): Promise<string> {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  console.log('MongoDB Memory Server started at:', mongoUri);
  return mongoUri;
}

/**
 * Teardown function to stop MongoDB Memory Server
 * Run this after e2e tests
 */
export async function teardownTestDB(): Promise<void> {
  if (mongoServer) {
    await mongoServer.stop();
    console.log('MongoDB Memory Server stopped');
  }
}

/**
 * Get the current MongoDB Memory Server URI
 */
export function getTestDBUri(): string {
  if (!mongoServer) {
    throw new Error(
      'MongoDB Memory Server not initialized. Call setupTestDB first.',
    );
  }
  return mongoServer.getUri();
}
