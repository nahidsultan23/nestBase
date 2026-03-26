import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppTestModule } from '../../src/app.module-test';
import { globalPipeResponse } from '../../src/common/filters/response.filter';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(globalPipeResponse);
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('POST /auth/owner/registration', () => {
    it('should return success response with valid email and password', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'owner@example.com',
          password: 'securePassword123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('statusCode', 201);
          expect(res.body).toHaveProperty(
            'message',
            'Owner registration successful',
          );
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('errors', null);
          expect(res.body).toHaveProperty('meta');
          expect(res.body.meta).toHaveProperty('timestamp');
        });
    });

    it('should include email in response data', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'test@example.com',
          password: 'testPassword123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('email', 'test@example.com');
        });
    });

    it('should include registrationId in response data', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'owner@example.com',
          password: 'securePassword123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('registrationId');
          expect(res.body.data.registrationId).toBe(
            'dummy-registration-id-12345',
          );
        });
    });

    it('should include createdAt timestamp in response data', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'owner@example.com',
          password: 'securePassword123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('createdAt');
          expect(typeof res.body.data.createdAt).toBe('string');
        });
    });

    it('should return validation error when email is missing', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          password: 'securePassword123',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'error');
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Validation failed');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('email');
        });
    });

    it('should return validation error when email is invalid', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'not-an-email',
          password: 'securePassword123',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'error');
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Validation failed');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('email');
          expect(Array.isArray(res.body.errors.email)).toBe(true);
        });
    });

    it('should return validation error when password is missing', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'owner@example.com',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'error');
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Validation failed');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('password');
        });
    });

    it('should return validation error when password is less than 8 characters', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'owner@example.com',
          password: 'short12',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'error');
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Validation failed');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('password');
          expect(Array.isArray(res.body.errors.password)).toBe(true);
        });
    });

    it('should return validation errors for both missing email and password', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'error');
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Validation failed');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('email');
          expect(res.body.errors).toHaveProperty('password');
        });
    });

    it('should return validation errors with multiple validation issues', () => {
      return request(app.getHttpServer())
        .post('/auth/owner/registration')
        .send({
          email: 'invalid-email',
          password: 'short',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors.email).toEqual(
            expect.arrayContaining([expect.any(String)]),
          );
          expect(res.body.errors.password).toEqual(
            expect.arrayContaining([expect.any(String)]),
          );
        });
    });
  });
});
