import { MinioConfigFixture, S3ConfigFixture } from '../test/fixtures';

import { MinioConfig } from './providers/minio/minio.config';
import { MockFactory } from 'mockingbird';
import { NvsStorageModule } from './nvs-storage.module';
import { NvsStorageService } from './nvs-storage.service';
import { Test } from '@nestjs/testing';
import { fileTypeFromBuffer } from 'file-type';

jest.mock('file-type');

beforeEach(() => {
  (fileTypeFromBuffer as jest.Mock).mockResolvedValue({
    ext: 'png',
    mime: 'image/png',
  });
});

describe('NvsStorageModule', () => {
  describe('S3 Provider', () => {
    describe('register', () => {
      it('S3 storage should be defined', async () => {
        const s3Config = MockFactory(S3ConfigFixture)
          .mutate({
            isGlobal: false,
          })
          .one();
        const module = await Test.createTestingModule({
          imports: [NvsStorageModule.register(s3Config)],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });

      it('S3 storage should be defined (global defined)', async () => {
        const s3Config = MockFactory(S3ConfigFixture)
          .mutate({
            isGlobal: true,
          })
          .one();
        const module = await Test.createTestingModule({
          imports: [NvsStorageModule.register(s3Config)],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });
    });

    describe('registerAsync', () => {
      it('S3 storage should be defined', async () => {
        const s3Config = MockFactory(S3ConfigFixture).one();
        const module = await Test.createTestingModule({
          imports: [
            NvsStorageModule.registerAsync({
              provider: s3Config.provider,
              isGlobal: false,
              useFactory: () => s3Config,
              inject: [],
            }),
          ],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });

      it('S3 storage should be defined (global defined)', async () => {
        const s3Config = MockFactory(S3ConfigFixture).one();
        const module = await Test.createTestingModule({
          imports: [
            NvsStorageModule.registerAsync({
              provider: s3Config.provider,
              isGlobal: true,
              useFactory: () => s3Config,
              inject: [],
            }),
          ],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });
    });
  });

  describe('Minio Provider', () => {
    describe('register', () => {
      it('Minio storage should be defined', async () => {
        const minioConfig = MockFactory(MinioConfigFixture)
          .mutate({ isGlobal: false })
          .one();
        const module = await Test.createTestingModule({
          imports: [NvsStorageModule.register(minioConfig)],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });

      it('Minio storage should be defined (global defined)', async () => {
        const minioConfig = MockFactory(MinioConfigFixture)
          .mutate({ isGlobal: true })
          .one();
        const module = await Test.createTestingModule({
          imports: [NvsStorageModule.register(minioConfig)],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });
    });
    describe('registerAsync', () => {
      it('Minio storage should be defined', async () => {
        const minioConfig = MockFactory(
          MinioConfigFixture,
        ).one() as MinioConfig;
        const module = await Test.createTestingModule({
          imports: [
            NvsStorageModule.registerAsync({
              provider: minioConfig.provider,
              isGlobal: false,
              useFactory: () => minioConfig,
              inject: [],
            }),
          ],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });

      it('Minio storage should be defined (global defined)', async () => {
        const minioConfig = MockFactory(
          MinioConfigFixture,
        ).one() as MinioConfig;
        const module = await Test.createTestingModule({
          imports: [
            NvsStorageModule.registerAsync({
              provider: minioConfig.provider,
              isGlobal: true,
              useFactory: () => minioConfig,
              inject: [],
            }),
          ],
        }).compile();

        const service = module.get<NvsStorageService>('StorageService');
        expect(service).toBeDefined();
      });
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
