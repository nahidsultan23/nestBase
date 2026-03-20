import { AppService } from './app.service';
import { envVariables } from './config';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  describe('getHello', () => {
    it('should return response with app name and version', () => {
      const result = service.getHello();
      expect(result.statusCode).toBe(200);
      expect(result.message).toContain('Hello World');
    });

    it('should contain appName and appVersion in data', () => {
      const result = service.getHello();
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result.statusCode).toBe(200);
    });
  });

  describe('getStatus', () => {
    it('should return response with server status', () => {
      const result = service.getStatus();
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Server is running');
    });

    it('should contain environment, appName and appVersion in data', () => {
      const result = service.getStatus();
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data).toHaveProperty('environment');
        expect(result.data).toHaveProperty('appName');
        expect(result.data).toHaveProperty('appVersion');
        expect(result.data.appName).toBe(envVariables.application.appName);
        expect(result.data.appVersion).toBe(
          envVariables.application.appVersion,
        );
      }
    });
  });

  describe('getErrorSample', () => {
    it('should return error response with validation errors', () => {
      const result = service.getErrorSample();
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Validation failed');
    });

    it('should contain errors property with error messages', () => {
      const result = service.getErrorSample();
      expect(result.errors).toBeDefined();
      if (result.errors) {
        expect(result.errors).toHaveProperty('email');
        expect(result.errors).toHaveProperty('password');
        expect(Array.isArray(result.errors.email)).toBe(true);
        expect(result.errors.email).toContain('Email is required');
      }
    });
  });
});
