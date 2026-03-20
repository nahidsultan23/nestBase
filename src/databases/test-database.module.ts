import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envVariables } from '../config';

/**
 * Database Module for Testing
 * Uses MongoDB Memory Server URI when available (TEST environment)
 * Falls back to production URI otherwise
 */
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_TEST_URI ||
        `mongodb://localhost:27017/${envVariables.mongoDbConfiguration.mongoDbDatabase}Test`,
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
    ),
  ],
})
export class TestDatabaseModule {}
