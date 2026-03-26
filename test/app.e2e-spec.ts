import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppTestModule } from '../src/app.module-test';
import { globalPipeResponse } from './../src/common/filters/response.filter';

describe('AppController (e2e)', () => {
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

  it('/ (GET) - should return standardized success response', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('statusCode', 200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('errors', null);
        expect(res.body).toHaveProperty('meta');
        expect(res.body.meta).toHaveProperty('timestamp');
      });
  });

  it('/status (GET) - should return standardized success response', () => {
    return request(app.getHttpServer())
      .get('/status')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('statusCode', 200);
        expect(res.body).toHaveProperty('message', 'Server is running');
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('errors', null);
        expect(res.body).toHaveProperty('meta');
        expect(res.body.meta).toHaveProperty('timestamp');
      });
  });
});
