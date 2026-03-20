import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    it('should call appService.getHello', () => {
      const getHelloSpy = jest.spyOn(appService, 'getHello');
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getHello(mockRes as any);

      expect(getHelloSpy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return response with 200 status code', () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getHello(mockRes as any);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getStatus', () => {
    it('should call appService.getStatus', () => {
      const getStatusSpy = jest.spyOn(appService, 'getStatus');
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getStatus(mockRes as any);

      expect(getStatusSpy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return response with 200 status code', () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getStatus(mockRes as any);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getErrorSample', () => {
    it('should call appService.getErrorSample', () => {
      const getErrorSampleSpy = jest.spyOn(appService, 'getErrorSample');
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getErrorSample(mockRes as any);

      expect(getErrorSampleSpy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return response with 400 status code', () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      appController.getErrorSample(mockRes as any);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
