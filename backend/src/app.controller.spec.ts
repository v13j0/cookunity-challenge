import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appController = moduleFixture.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello({ headers: {} } as any)).toBe(
        'Hello World!',
      );
    });

    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(HttpStatus.OK)
        .expect('Hello World!');
    });
  });

  describe('error handling', () => {
    it('/nonexistent-route (GET) - should return 404', () => {
      return request(app.getHttpServer())
        .get('/nonexistent-route')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/ (POST) - should return 405 Method Not Allowed', () => {
      return request(app.getHttpServer())
        .post('/')
        .expect(HttpStatus.METHOD_NOT_ALLOWED)
        .expect('Method Not Allowed');
    });

    it('/ (GET) with invalid Accept header', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('Accept', 'application/xml')
        .expect(HttpStatus.NOT_ACCEPTABLE);
    });
  });

  describe('health check', () => {
    it('/health (GET) should return OK', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(HttpStatus.OK)
        .expect('OK');
    });
  });
});
