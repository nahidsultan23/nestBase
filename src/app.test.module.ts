import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestDatabaseModule } from './databases/test-database.module';

/**
 * Test App Module
 * Uses TestDatabaseModule that connects to MongoDB Memory Server
 * Should only be used for e2e tests
 */
@Module({
  imports: [TestDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppTestModule {}
