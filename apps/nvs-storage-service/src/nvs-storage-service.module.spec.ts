import {
  MinioConfigurationFixture,
  S3ConfigurationFixture,
} from '../test/fixtures';
import { NvsStorageModule, StorageProvider } from '@lib/nvs-storage';

import { ConfigModule } from '@nestjs/config';
import { MockFactory } from 'mockingbird';
import { NvsStorageServiceModule } from './nvs-storage-service.module';
import { Test } from '@nestjs/testing';

jest.mock('./config/configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    storageProvider: StorageProvider.S3,
  }),
}));

jest.mock('./config/s3.configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(MockFactory(S3ConfigurationFixture).one()),
}));

jest.mock('./config/minio.configuration', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue(MockFactory(MinioConfigurationFixture).one()),
}));

describe('NvsStorageServiceModule', () => {
  it('should import NvsStorageModule(With S3 Provider)', async () => {
    const configuration = jest.requireMock('./config/configuration').default;
    configuration.mockReturnValue({
      storageProvider: StorageProvider.S3,
    });

    const module = await Test.createTestingModule({
      imports: [NvsStorageServiceModule],
    }).compile();

    const nvsStorageModule = module.get(NvsStorageModule);
    expect(nvsStorageModule).toBeDefined();
  });

  it('should import NvsStorageModule(With MINIO Provider)', async () => {
    const configuration = jest.requireMock('./config/configuration').default;
    configuration.mockReturnValue({
      storageProvider: StorageProvider.MINIO,
    });

    const module = await Test.createTestingModule({
      imports: [NvsStorageServiceModule],
    }).compile();

    const nvsStorageModule = module.get(NvsStorageModule);
    expect(nvsStorageModule).toBeDefined();
  });
});
