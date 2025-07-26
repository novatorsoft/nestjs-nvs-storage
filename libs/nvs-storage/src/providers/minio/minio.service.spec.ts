import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Faker, MockFactory } from 'mockingbird';
import { MinioConfigFixture, UploadArgsFixture } from '../../../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { MinioService } from './minio.service';
import { UploadArgs } from '@lib/nvs-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { mockClient } from 'aws-sdk-client-mock';
import { of } from 'rxjs';

jest.mock('@aws-sdk/s3-request-presigner');

describe('MinioService', () => {
  let service: MinioService;
  let httpService: HttpService;
  const s3Client = mockClient(S3Client);
  const minioConfig = MockFactory(MinioConfigFixture).one();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinioService,
        {
          provide: 'StorageConfig',
          useValue: minioConfig,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MinioService>(MinioService);
    httpService = module.get<HttpService>(HttpService);
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
        Bucket: minioConfig.bucket,
        Key: `${uploadArgs.path}/${uploadArgs.fileName}.png`,
        Body: uploadArgs.file,
        ContentType: 'image/png',
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

    it('should throw an error if file size exceeds the maximum allowed size', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withBuffer()
        .withMaxSize(1) as UploadArgs<Buffer>;

      await expect(service.uploadAsync(uploadArgs)).rejects.toThrow(
        'File size exceeds the maximum allowed size.',
      );
    });

    it('should throw an error if file type is not allowed', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withBuffer()
        .withValidateFileTypes(['image/jpeg']) as UploadArgs<Buffer>;

      await expect(service.uploadAsync(uploadArgs)).rejects.toThrow(
        "File type 'image/png' is not allowed.",
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
        Bucket: minioConfig.bucket,
        Key: uploadArgs.fileName + '.png',
        Body: Buffer.from(uploadArgs.file, 'base64'),
        ContentType: 'image/png',
      });
      expect(result).not.toBeNull();
    });
  });

  describe('uploadWithUrlAsync', () => {
    it('should upload a url file successfully', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture).one().withUrl();
      delete uploadArgs.path;

      s3Client.on(PutObjectCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(
          of({ data: uploadArgs.getBufferFile() } as AxiosResponse),
        );

      const result = await service.uploadWithUrlAsync(
        uploadArgs as UploadArgs<string>,
      );

      expect(s3Client.calls()).toHaveLength(1);
      expect(s3Client.call(0).args[0].input).toEqual({
        Bucket: minioConfig.bucket,
        Key: uploadArgs.fileName + '.png',
        Body: uploadArgs.getBufferFile(),
        ContentType: 'image/png',
      });
      expect(result).not.toBeNull();
    });

    it('should throw an error when response data is empty', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withUrl() as UploadArgs<string>;

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: Buffer.from('') } as AxiosResponse));

      await expect(service.uploadWithUrlAsync(uploadArgs)).rejects.toThrow(
        'Failed to retrieve file from URL.',
      );
    });

    it('should successfully load a url file and get it as bin if there is no ext.', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture)
        .one()
        .withUrl()
        .withDefaultMime();
      const file = Buffer.from(Faker.lorem.words(2));
      delete uploadArgs.path;

      s3Client.on(PutObjectCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: file } as AxiosResponse));

      const result = await service.uploadWithUrlAsync(
        uploadArgs as UploadArgs<string>,
      );

      expect(s3Client.calls()).toHaveLength(1);
      expect(s3Client.call(0).args[0].input).toEqual({
        Bucket: minioConfig.bucket,
        Key: `${uploadArgs.fileName}.${uploadArgs.defaultMime.extension}`,
        Body: file,
        ContentType: uploadArgs.defaultMime.mime,
      });
      expect(result).not.toBeNull();
    });

    it('should throw an error when file type is not supported', async () => {
      const uploadArgs = MockFactory(UploadArgsFixture).one().withUrl();

      await expect(
        service.uploadWithBase64Async(uploadArgs as UploadArgs<string>),
      ).rejects.toThrow('Failed to determine file type.');
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
        Bucket: minioConfig.bucket,
        Key: path,
      });
    });

    it('should throw an error if delete fails', async () => {
      const path = Faker.system.filePath();

      s3Client.on(DeleteObjectCommand).rejects(new Error('Delete failed'));

      await expect(service.deleteAsync(path)).rejects.toThrow('Delete failed');
    });
  });

  describe('createShareLinkAsync', () => {
    it('should successfully create a share link', async () => {
      const filePath = Faker.system.filePath();
      const expectedUrl = Faker.internet.url();
      const expiresIn = 3600;

      (getSignedUrl as jest.Mock).mockResolvedValue(expectedUrl);

      const result = await service.createShareLinkAsync(filePath, expiresIn);

      expect(result).toBe(expectedUrl);
      expect(getSignedUrl).toHaveBeenCalledWith(
        expect.any(S3Client),
        expect.any(GetObjectCommand),
        { expiresIn },
      );

      const commandArg = (getSignedUrl as jest.Mock).mock.calls[0][1];
      expect(commandArg.input).toEqual({
        Bucket: minioConfig.bucket,
        Key: filePath,
      });
    });

    it('should use default expiresIn value when not provided', async () => {
      const filePath = Faker.system.filePath();
      const expectedUrl = Faker.internet.url();

      (getSignedUrl as jest.Mock).mockResolvedValue(expectedUrl);

      await service.createShareLinkAsync(filePath);

      expect(getSignedUrl).toHaveBeenCalledWith(
        expect.any(S3Client),
        expect.any(GetObjectCommand),
        { expiresIn: 360 },
      );
    });

    it('should throw error when getSignedUrl fails', async () => {
      const filePath = Faker.system.filePath();
      const errorMessage = 'Failed to generate signed URL';

      (getSignedUrl as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(service.createShareLinkAsync(filePath)).rejects.toThrow(
        `Failed to create share link: ${errorMessage}`,
      );
    });
  });
});
