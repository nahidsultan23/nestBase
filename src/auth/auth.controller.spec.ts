import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerRegistrationDto } from './auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('ownerRegistration', () => {
    it('should call authService.ownerRegistration with correct DTO', async () => {
      const ownerRegistrationSpy = jest.spyOn(authService, 'ownerRegistration');
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await authController.ownerRegistration(
        ownerRegistrationDto,
        mockRes as any,
      );

      expect(ownerRegistrationSpy).toHaveBeenCalledWith(ownerRegistrationDto);
    });

    it('should return response with CREATED status code', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await authController.ownerRegistration(
        ownerRegistrationDto,
        mockRes as any,
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should call res.json with formatted response', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await authController.ownerRegistration(
        ownerRegistrationDto,
        mockRes as any,
      );

      expect(mockRes.json).toHaveBeenCalled();
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg).toHaveProperty('status');
      expect(callArg).toHaveProperty('statusCode');
      expect(callArg).toHaveProperty('message');
      expect(callArg).toHaveProperty('meta');
    });

    it('should include email in response data', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await authController.ownerRegistration(
        ownerRegistrationDto,
        mockRes as any,
      );

      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.data.email).toBe('owner@example.com');
    });

    it('should include registrationId in response data', async () => {
      const ownerRegistrationDto: OwnerRegistrationDto = {
        email: 'owner@example.com',
        password: 'securePassword123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await authController.ownerRegistration(
        ownerRegistrationDto,
        mockRes as any,
      );

      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.data).toHaveProperty('registrationId');
    });
  });
});
