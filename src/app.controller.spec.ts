import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envVariables } from './config';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return success response with standardized format', () => {
      const result = appController.getHello();
      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      expect(result.message).toContain('Hello World');
      expect(result.data).not.toBeNull();
      expect(result.errors).toBeNull();
      expect(result.meta).toHaveProperty('timestamp');
    });
  });

  describe('getStatus', () => {
    it('should return success response with server status', () => {
      const result = appController.getStatus();
      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Server is running');
      expect(result.data).not.toBeNull();
      expect(result.errors).toBeNull();
      expect(result.meta).toHaveProperty('timestamp');
    });
  });
});
