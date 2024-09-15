import { Faker, MockFactory } from 'mockingbird';

import { NvsStorageModule } from './nvs-storage.module';
import { NvsStorageService } from './nvs-storage.service';
import { S3Config } from './providers/s3/s3.config';
import { S3ConfigFixture } from '../test/fixtures';
import { StorageProvider } from './dto';
import { Test } from '@nestjs/testing';

describe('NvsStorageModule', () => {
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

  it('should throw an error when given an invalid provider', async () => {
    const s3Config = MockFactory(S3ConfigFixture)
      .mutate({ provider: Faker.lorem.word() as StorageProvider })
      .one();

    expect(async () => {
      await Test.createTestingModule({
        imports: [NvsStorageModule.register(s3Config)],
      }).compile();
    }).rejects.toThrow('Invalid storage provider');
  });
});
