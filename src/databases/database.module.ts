import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envVariables, mongoDbUri } from '../config';

const mongoUriForRoot =
  process.env.JEST_WORKER_ID !== undefined
    ? process.env.MONGODB_TEST_URI ||
      `mongodb://localhost:27017/${envVariables.mongoDbConfiguration.mongoDbDatabase}Test`
    : mongoDbUri;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUriForRoot, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }),
  ],
})
export class DatabaseModule {}
