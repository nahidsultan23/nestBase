import { AppService } from './app.service';
import { envVariables } from './config';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  describe('getHello', () => {
    it('should return success response with app name and version', () => {
      const result = service.getHello();
      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      expect(result.message).toContain('Hello World');
      expect(result.data).toEqual({
        appName: envVariables.application.appName,
        appVersion: envVariables.application.appVersion,
      });
      expect(result.errors).toBeNull();
      expect(result.meta).toHaveProperty('timestamp');
    });

    it('timestamp should be a valid ISO string', () => {
      const result = service.getHello();
      expect(() => new Date(result.meta.timestamp)).not.toThrow();
    });
  });

  describe('getStatus', () => {
    it('should return success response with server status', () => {
      const result = service.getStatus();
      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Server is running');
      expect(result.data).toEqual({
        environment: envVariables.environment.nodeEnv,
        appName: envVariables.application.appName,
        appVersion: envVariables.application.appVersion,
      });
      expect(result.errors).toBeNull();
      expect(result.meta).toHaveProperty('timestamp');
    });

    it('timestamp should be a valid ISO string', () => {
      const result = service.getStatus();
      expect(() => new Date(result.meta.timestamp)).not.toThrow();
    });
  });
});
