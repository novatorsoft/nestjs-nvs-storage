import { MinioConfigFixture, S3ConfigFixture } from '../test/fixtures';

import { MinioConfig } from './providers/minio/minio.config';
import { MockFactory } from 'mockingbird';
import { NvsStorageModule } from './nvs-storage.module';
import { NvsStorageService } from './nvs-storage.service';
import { S3Config } from './providers/s3/s3.config';
import { Test } from '@nestjs/testing';

describe('NvsStorageModule', () => {
  describe('S3 Provider', () => {
    it('S3 storage should be defined (with register method)', async () => {
      const s3Config = MockFactory(S3ConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [NvsStorageModule.register(s3Config)],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('S3 storage should be defined (with registerAsync method)', async () => {
      const s3Config = MockFactory(S3ConfigFixture).one() as S3Config;
      const module = await Test.createTestingModule({
        imports: [
          NvsStorageModule.registerAsync({
            provider: s3Config.provider,
            useFactory: () => {
              return s3Config;
            },
            inject: [],
          }),
        ],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('S3 storage should be defined (With forRoot method)', async () => {
      const s3Config = MockFactory(S3ConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [NvsStorageModule.forRoot(s3Config)],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('S3 storage should be defined (with forRootAsync method)', async () => {
      const s3Config = MockFactory(S3ConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [
          NvsStorageModule.forRootAsync({
            provider: s3Config.provider,
            useFactory: () => {
              return s3Config;
            },
            inject: [],
          }),
        ],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });
  });

  describe('Minio Provider', () => {
    it('Minio storage should be defined (with register method)', async () => {
      const minioConfig = MockFactory(MinioConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [NvsStorageModule.register(minioConfig)],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('Minio storage should be defined (with registerAsync method)', async () => {
      const minioConfig = MockFactory(MinioConfigFixture).one() as MinioConfig;
      const module = await Test.createTestingModule({
        imports: [
          NvsStorageModule.registerAsync({
            provider: minioConfig.provider,
            useFactory: () => {
              return minioConfig;
            },
            inject: [],
          }),
        ],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('Minio storage should be defined (With forRoot method)', async () => {
      const minioConfig = MockFactory(MinioConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [NvsStorageModule.forRoot(minioConfig)],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });

    it('Minio storage should be defined (with forRootAsync method)', async () => {
      const minioConfig = MockFactory(MinioConfigFixture).one();
      const module = await Test.createTestingModule({
        imports: [
          NvsStorageModule.forRootAsync({
            provider: minioConfig.provider,
            useFactory: () => {
              return minioConfig;
            },
            inject: [],
          }),
        ],
      }).compile();

      const service = module.get<NvsStorageService>('StorageService');
      expect(service).toBeDefined();
    });
  });

  it('should throw an error when given an invalid provider', async () => {
    expect(async () => {
      await Test.createTestingModule({
        imports: [
          NvsStorageModule.register({
            provider: 'xxx',
          } as any),
        ],
      }).compile();
    }).rejects.toThrow('Invalid storage provider');
  });
});
