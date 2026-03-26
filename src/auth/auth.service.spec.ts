import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnerRegistrationDto } from './auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  describe('ownerRegistration', () => {
    it('should return response with CREATED status code', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result.statusCode).toBe(HttpStatus.CREATED);
    });

    it('should return success message', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result.message).toBe('Owner registration successful');
    });

    it('should contain email in data', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data).toHaveProperty('email');
        expect(result.data.email).toBe('owner@example.com');
      }
    });

    it('should contain registrationId in data', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'test@example.com',
        password: 'testPassword123',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data).toHaveProperty('registrationId');
        expect(result.data.registrationId).toBe('dummy-registration-id-12345');
      }
    });

    it('should contain createdAt timestamp in data', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'password123456',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data).toHaveProperty('createdAt');
        expect(typeof result.data.createdAt).toBe('string');
        expect(new Date(result.data.createdAt)).toBeInstanceOf(Date);
      }
    });

    it('should return response with expected structure', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };

      const result = await service.ownerRegistration(ownerRegistrationDto);

      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
    });
  });
});
