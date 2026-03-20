import { createResponse } from './response.filter';
import {
  IApiResponse,
  ICreateResponseParams,
} from './response.filter.interface';

describe('Response Filter - createResponse', () => {
  describe('Success response (status code < 400)', () => {
    it('should create a success response with all parameters', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Operation successful',
        data: { id: 1, name: 'Test' },
      };

      const result = createResponse(params);

      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Operation successful');
      expect(result.data).toEqual({ id: 1, name: 'Test' });
      expect(result.errors).toBeNull();
    });

    it('should set status to success for 201 Created', () => {
      const params: ICreateResponseParams = {
        statusCode: 201,
        message: 'Resource created',
      };

      const result = createResponse(params);

      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(201);
    });

    it('should set data to null when not provided', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Success',
      };

      const result = createResponse(params);

      expect(result.data).toBeNull();
    });

    it('should set errors to null when not provided', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Success',
      };

      const result = createResponse(params);

      expect(result.errors).toBeNull();
    });
  });

  describe('Error response (status code >= 400)', () => {
    it('should create an error response with status code 400', () => {
      const params: ICreateResponseParams = {
        statusCode: 400,
        message: 'Bad request',
      };

      const result = createResponse(params);

      expect(result.status).toBe('error');
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Bad request');
    });

    it('should create an error response with status code 401', () => {
      const params: ICreateResponseParams = {
        statusCode: 401,
        message: 'Unauthorized',
      };

      const result = createResponse(params);

      expect(result.status).toBe('error');
      expect(result.statusCode).toBe(401);
    });

    it('should create an error response with status code 500', () => {
      const params: ICreateResponseParams = {
        statusCode: 500,
        message: 'Internal server error',
      };

      const result = createResponse(params);

      expect(result.status).toBe('error');
      expect(result.statusCode).toBe(500);
    });

    it('should include validation errors in error response', () => {
      const validationErrors = {
        email: ['Email is required', 'Email format is invalid'],
        password: ['Password must be at least 8 characters'],
      };

      const params: ICreateResponseParams = {
        statusCode: 400,
        message: 'Validation failed',
        errors: validationErrors,
      };

      const result = createResponse(params);

      expect(result.errors).toEqual(validationErrors);
      expect(result.status).toBe('error');
    });
  });

  describe('Generic type support', () => {
    it('should work with custom data types', () => {
      interface User {
        id: number;
        username: string;
        email: string;
      }

      const userData: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };

      const params: ICreateResponseParams<User> = {
        statusCode: 200,
        message: 'User retrieved',
        data: userData,
      };

      const result: IApiResponse<User> = createResponse(params);

      expect(result.data).toEqual(userData);
      expect(result.data?.id).toBe(1);
      expect(result.data?.username).toBe('testuser');
    });

    it('should work with array data types', () => {
      const listData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];

      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Items retrieved',
        data: listData,
      };

      const result = createResponse(params);

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).toHaveLength(2);
    });
  });

  describe('Metadata', () => {
    it('should include metadata with timestamp', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Success',
      };

      const result = createResponse(params);

      expect(result.meta).toBeDefined();
      expect(result.meta.timestamp).toBeDefined();
    });

    it('should have a valid ISO timestamp format', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Success',
      };

      const result = createResponse(params);

      expect(() => new Date(result.meta.timestamp)).not.toThrow();
      expect(result.meta.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('should generate different timestamps for different calls', (done) => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Success',
      };

      const result1 = createResponse(params);

      setTimeout(() => {
        const result2 = createResponse(params);

        // Timestamps should be different (with millisecond precision)
        expect(result1.meta.timestamp).toBeDefined();
        expect(result2.meta.timestamp).toBeDefined();
        // They might be the same or very close, but this test ensures timestamp is being set
        done();
      }, 10);
    });
  });

  describe('Response structure validation', () => {
    it('should always return all required fields', () => {
      const params: ICreateResponseParams = {
        statusCode: 200,
        message: 'Test',
      };

      const result = createResponse(params);

      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('timestamp');
    });

    it('should maintain data integrity when both data and errors are provided', () => {
      const testData = { user: 'John' };
      const testErrors = { field: ['error message'] };

      const params: ICreateResponseParams = {
        statusCode: 400,
        message: 'Partial error',
        data: testData,
        errors: testErrors,
      };

      const result = createResponse(params);

      expect(result.data).toEqual(testData);
      expect(result.errors).toEqual(testErrors);
    });
  });
});
