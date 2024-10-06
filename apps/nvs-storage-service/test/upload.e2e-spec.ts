import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Test, TestingModule } from '@nestjs/testing';
import {
  UploadWithBase64Request,
  UploadWithUrlRequest,
} from '../src/upload/dto';
import {
  UploadWithBase64RequestFixture,
  UploadWithUrlRequestFixture,
} from './fixtures';

import { HttpService } from '@nestjs/axios';
import { MockFactory } from 'mockingbird';
import { NvsStorageServiceModule } from '../src/nvs-storage-service.module';
import { mockClient } from 'aws-sdk-client-mock';
import { of } from 'rxjs';

describe('UploadController (e2e)', () => {
  let app: INestApplication;
  const s3Client = mockClient(S3Client);
  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NvsStorageServiceModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

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

  it('should upload a file with url', () => {
    const uploadRequest: UploadWithUrlRequest = MockFactory(
      UploadWithUrlRequestFixture,
    ).one();

    s3Client.on(PutObjectCommand).resolves({
      $metadata: { httpStatusCode: 200 },
    });

    const mockBuffer = Buffer.from('test file content');
    mockHttpService.get.mockReturnValue(
      of({
        data: mockBuffer,
        headers: {
          'content-type': 'image/jpeg',
          'content-length': mockBuffer.length.toString(),
        },
        status: 200,
        statusText: 'OK',
      }),
    );

    return request(app.getHttpServer())
      .post('/upload/with-url')
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

  it('should give error if body is empty when loading file with url', () => {
    return request(app.getHttpServer())
      .post('/upload/with-url')
      .expect(HttpStatus.BAD_REQUEST)
      .expect((response) => {
        expect(response.body.message).toBeDefined();
      });
  });
});
