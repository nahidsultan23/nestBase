import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbUri } from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }),
  ],
})
export class DatabaseModule {}
