import { ConfigurationFixture, S3ConfigurationFixture } from '../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFactory } from 'mockingbird';
import { NvsStorageModule } from '@lib/nvs-storage';
import { NvsStorageServiceModule } from './nvs-storage-service.module';

jest.mock('./config/configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(MockFactory(ConfigurationFixture).one()),
}));

jest.mock('./config/s3.configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(MockFactory(S3ConfigurationFixture).one()),
}));

describe('NvsStorageServiceModule', () => {
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NvsStorageServiceModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import NvsStorageModule', () => {
    const nvsStorageModule = module.get(NvsStorageModule);
    expect(nvsStorageModule).toBeDefined();
  });
});
