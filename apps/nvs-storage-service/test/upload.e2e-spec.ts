import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFactory } from 'mockingbird';
import { NvsStorageServiceModule } from '../src/nvs-storage-service.module';
import { UploadWithBase64Request } from '../src/upload/dto';
import { UploadWithBase64RequestFixture } from './fixtures';
import { mockClient } from 'aws-sdk-client-mock';

describe('UploadController (e2e)', () => {
  let app: INestApplication;
  const s3Client = mockClient(S3Client);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NvsStorageServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should upload a file with base64', () => {
    const uploadRequest: UploadWithBase64Request = MockFactory(
      UploadWithBase64RequestFixture,
    ).one();

    s3Client.on(PutObjectCommand).resolves({
      $metadata: { httpStatusCode: 200 },
    });

    return request(app.getHttpServer())
      .post('/upload/with-base64')
      .send(uploadRequest)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body.fileName).toBeDefined();
        expect(response.body.size).toBeDefined();
        expect(response.body.path).toBeDefined();
        expect(response.body.extension).toBeDefined();
        expect(response.body.url).toBeDefined();
      });
  });

  it('should give error if body is empty when loading file with base64', () => {
    return request(app.getHttpServer())
      .post('/upload/with-base64')
      .expect(HttpStatus.BAD_REQUEST)
      .expect((response) => {
        expect(response.body.message).toBeDefined();
      });
  });
});
