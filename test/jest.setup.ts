/**
 * Jest global setup for E2E tests
 * Starts MongoDB Memory Server before running tests
 */

import { setupTestDB } from './mongodb-setup';

module.exports = async () => {
  const mongoUri = await setupTestDB();
  // Store the URI in an environment variable for tests to use
  process.env.MONGODB_TEST_URI = mongoUri;
};
