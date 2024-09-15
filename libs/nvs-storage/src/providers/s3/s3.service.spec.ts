import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Faker, MockFactory } from 'mockingbird';
import { S3ConfigFixture, UploadArgsFixture } from '../../../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { S3Service } from './s3.service';
import { UploadArgs } from '@lib/nvs-storage';
import { mockClient } from 'aws-sdk-client-mock';

describe('S3Service', () => {
  let service: S3Service;
  const s3Client = mockClient(S3Client);
  const s3Config = MockFactory(S3ConfigFixture).one();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: 'StorageConfig',
          useValue: s3Config,
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
    s3Client.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadAsync', () => {
    it('should upload a file successfully', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withBuffer() as UploadArgs<Buffer>;

      s3Client.on(PutObjectCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });

      const result = await service.uploadAsync(uploadArgs);

      expect(s3Client.calls()).toHaveLength(1);
      expect(s3Client.call(0).args[0].input).toEqual({
        Bucket: s3Config.bucket,
        Key: `${uploadArgs.path}/${uploadArgs.fileName}`,
        Body: uploadArgs.file,
      });
      expect(result).not.toBeNull();
    });

    it('should throw an error if upload fails', async () => {
      const mockUploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withBuffer() as UploadArgs<Buffer>;

      s3Client.on(PutObjectCommand).rejects(new Error('Upload failed'));

      await expect(service.uploadAsync(mockUploadArgs)).rejects.toThrow(
        'Upload failed',
      );
    });
  });

  describe('uploadWithBase64Async', () => {
    it('should upload a base64 encoded file successfully', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withBase64() as UploadArgs<string>;
      delete uploadArgs.path;

      s3Client.on(PutObjectCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });

      const result = await service.uploadWithBase64Async(uploadArgs);

      expect(s3Client.calls()).toHaveLength(1);
      expect(s3Client.call(0).args[0].input).toEqual({
        Bucket: s3Config.bucket,
        Key: `${uploadArgs.path}/${uploadArgs.fileName}`,
        Body: Buffer.from(uploadArgs.file, 'base64'),
      });
      expect(result).not.toBeNull();
    });
  });

  describe('deleteAsync', () => {
    it('should delete a file successfully', async () => {
      const path = Faker.system.filePath();

      s3Client.on(DeleteObjectCommand).resolves({
        $metadata: { httpStatusCode: 204 },
      });

      await service.deleteAsync(path);

      expect(s3Client.calls()).toHaveLength(1);
      expect(s3Client.call(0).args[0].input).toEqual({
        Bucket: s3Config.bucket,
        Key: path,
      });
    });

    it('should throw an error if delete fails', async () => {
      const path = Faker.system.filePath();

      s3Client.on(DeleteObjectCommand).rejects(new Error('Delete failed'));

      await expect(service.deleteAsync(path)).rejects.toThrow('Delete failed');
    });
  });
});
