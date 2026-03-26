import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { AuthModule } from './auth/auth.module';

/**
 * Test App Module
 * Should only be used for e2e tests
 */
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppTestModule {}
