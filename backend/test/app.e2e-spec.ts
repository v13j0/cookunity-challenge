import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  it('/nonexistent-route (GET) - should return 404', () => {
    return request(app.getHttpServer())
      .get('/nonexistent-route')
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/ (POST) - should return 405 Method Not Allowed', () => {
    return request(app.getHttpServer())
      .post('/')
      .expect(HttpStatus.METHOD_NOT_ALLOWED);
  });

  it('/ (GET) with invalid Accept header', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Accept', 'application/xml')
      .expect(HttpStatus.NOT_ACCEPTABLE);
  });

  it('/ (GET) with large payload', () => {
    const largePayload = 'a'.repeat(10 * 1024 * 1024); // 10MB payload
    return request(app.getHttpServer())
      .get('/')
      .send(largePayload)
      .expect(HttpStatus.PAYLOAD_TOO_LARGE);
  });
});
