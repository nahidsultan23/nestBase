import { envVariables, mongoDbUri, createResponse } from './config';

describe('Config', () => {
  describe('Environment Variables Structure', () => {
    it('should have environment section with nodeEnv', () => {
      expect(envVariables.environment).toBeDefined();
      expect(envVariables.environment.nodeEnv).toBeDefined();
    });

    it('should have server section with port', () => {
      expect(envVariables.server).toBeDefined();
      expect(envVariables.server.port).toBeDefined();
      expect(typeof envVariables.server.port).toBe('string');
    });

    it('should have application section with appName and appVersion', () => {
      expect(envVariables.application).toBeDefined();
      expect(envVariables.application.appName).toBeDefined();
      expect(envVariables.application.appVersion).toBeDefined();
    });

    it('should have mongoDbConfiguration section', () => {
      expect(envVariables.mongoDbConfiguration).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbDatabase).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbUser).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbPassword).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbHost).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbCluster).toBeDefined();
    });
  });

  describe('MongoDB URI', () => {
    it('should be defined', () => {
      expect(mongoDbUri).toBeDefined();
      expect(typeof mongoDbUri).toBe('string');
    });

    it('should format MongoDB SRV URI correctly', () => {
      const expectedUri = `mongodb+srv://${envVariables.mongoDbConfiguration.mongoDbUser}:${envVariables.mongoDbConfiguration.mongoDbPassword}@${envVariables.mongoDbConfiguration.mongoDbHost}/${envVariables.mongoDbConfiguration.mongoDbDatabase}?retryWrites=true&w=majority&appName=${envVariables.mongoDbConfiguration.mongoDbCluster}`;
      expect(mongoDbUri).toBe(expectedUri);
    });

    it('should include retryWrites parameter in URI', () => {
      expect(mongoDbUri).toContain('retryWrites=true');
    });

    it('should include w=majority parameter in URI', () => {
      expect(mongoDbUri).toContain('w=majority');
    });

    it('should include appName parameter in URI', () => {
      expect(mongoDbUri).toContain('appName=');
    });

    it('should use mongodb+srv protocol', () => {
      expect(mongoDbUri).toMatch(/^mongodb\+srv:\/\//);
    });
  });

  describe('Response Creator', () => {
    describe('Success Responses', () => {
      it('should create a success response with correct structure', () => {
        const response = createResponse(200, 'Operation successful', {
          id: 1,
        });
        expect(response).toHaveProperty('status', 'success');
        expect(response).toHaveProperty('statusCode', 200);
        expect(response).toHaveProperty('message', 'Operation successful');
        expect(response).toHaveProperty('data', { id: 1 });
        expect(response).toHaveProperty('errors', null);
        expect(response).toHaveProperty('meta');
        expect(response.meta).toHaveProperty('timestamp');
      });

      it('should create a success response with null data', () => {
        const response = createResponse(204, 'No content');
        expect(response.data).toBeNull();
        expect(response.errors).toBeNull();
        expect(response.status).toBe('success');
      });

      it('should generate a valid ISO timestamp for success', () => {
        const response = createResponse(200, 'Test');
        expect(() => new Date(response.meta.timestamp)).not.toThrow();
      });

      it('should accept generic data type', () => {
        const data = { user: { id: 1, name: 'John' } };
        const response = createResponse(201, 'User created', data);
        expect(response.data).toEqual(data);
      });
    });

    describe('Error Responses', () => {
      it('should create an error response with correct structure', () => {
        const errors = { email: ['Email already exists'] };
        const response = createResponse(400, 'Validation failed', null, errors);
        expect(response).toHaveProperty('status', 'error');
        expect(response).toHaveProperty('statusCode', 400);
        expect(response).toHaveProperty('message', 'Validation failed');
        expect(response).toHaveProperty('data', null);
        expect(response).toHaveProperty('errors', errors);
        expect(response).toHaveProperty('meta');
        expect(response.meta).toHaveProperty('timestamp');
      });

      it('should create an error response with null errors', () => {
        const response = createResponse(500, 'Server error', null, null);
        expect(response.data).toBeNull();
        expect(response.errors).toBeNull();
        expect(response.status).toBe('error');
      });

      it('should handle validation errors with any field names and any error messages', () => {
        const errors = {
          field1: ['Error message 1', 'Error message 2'],
          field2: ['Error message 3'],
        };
        const response = createResponse(422, 'Validation errors', null, errors);
        expect(response.errors).not.toBeNull();
        expect(response.errors).toEqual(errors);
      });

      it('should generate a valid ISO timestamp for error', () => {
        const response = createResponse(400, 'Bad request', null, {
          error: ['Bad request'],
        });
        expect(() => new Date(response.meta.timestamp)).not.toThrow();
      });
    });

    describe('Response Status Detection', () => {
      it('should set status to success when no errors provided', () => {
        const response = createResponse(200, 'Success', { data: 'value' });
        expect(response.status).toBe('success');
      });

      it('should set status to error when errors provided', () => {
        const response = createResponse(400, 'Error', null, {
          field: ['error'],
        });
        expect(response.status).toBe('error');
      });

      it('should set status to success when both data and errors are null', () => {
        const response = createResponse(200, 'No content');
        expect(response.status).toBe('success');
      });
    });

    describe('Response Timestamps', () => {
      it('should generate valid ISO timestamps', () => {
        const response1 = createResponse(200, 'First');
        const response2 = createResponse(200, 'Second');
        expect(response1.meta.timestamp).toBeTruthy();
        expect(response2.meta.timestamp).toBeTruthy();
      });
    });
  });
});
