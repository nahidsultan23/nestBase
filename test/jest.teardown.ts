/**
 * Jest global teardown for E2E tests
 * Stops MongoDB Memory Server after tests complete
 * Also closes any remaining Mongoose connections
 */

import { teardownTestDB } from './mongodb-setup';
import mongoose from 'mongoose';

module.exports = async () => {
  await teardownTestDB();
  // Close any remaining Mongoose connections
  await mongoose.disconnect();
};
