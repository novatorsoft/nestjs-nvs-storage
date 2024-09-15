import { ConfigurationFixture, S3ConfigurationFixture } from '../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFactory } from 'mockingbird';
import { OwlStorageModule } from '@app/owl-storage';
import { OwlStorageServiceModule } from './owl-storage-service.module';

jest.mock('./config/configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(MockFactory(ConfigurationFixture).one()),
}));

jest.mock('./config/s3.configuration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(MockFactory(S3ConfigurationFixture).one()),
}));

describe('OwlStorageServiceModule', () => {
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OwlStorageServiceModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import OwlStorageModule', () => {
    const owlStorageModule = module.get(OwlStorageModule);
    expect(owlStorageModule).toBeDefined();
  });
});
