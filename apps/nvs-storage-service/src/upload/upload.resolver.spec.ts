import { Test, TestingModule } from '@nestjs/testing';
import {
  UploadResponse,
  UploadWithBase64Request,
  UploadWithUrlRequest,
} from './dto';
import {
  UploadResponseFixture,
  UploadWithBase64RequestFixture,
  UploadWithUrlRequestFixture,
} from '../../test/fixtures/upload';

import { MockFactory } from 'mockingbird';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

describe('UploadResolver', () => {
  let resolver: UploadResolver;
  let uploadService: jest.Mocked<UploadService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadResolver,
        {
          provide: UploadService,
          useValue: {
            uploadWithBase64Async: jest.fn(),
            uploadWithUrlAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UploadResolver>(UploadResolver);
    uploadService = module.get(UploadService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('uploadWithBase64', () => {
    it('should call uploadService.uploadWithBase64Async with correct parameters', async () => {
      const uploadRequest: UploadWithBase64Request = MockFactory(
        UploadWithBase64RequestFixture,
      ).one();
      const uploadResponse: UploadResponse = MockFactory(
        UploadResponseFixture,
      ).one();

      uploadService.uploadWithBase64Async.mockResolvedValue(uploadResponse);

      const result = await resolver.uploadWithBase64(uploadRequest);

      expect(uploadService.uploadWithBase64Async).toHaveBeenCalledWith(
        uploadRequest,
      );
      expect(result).toEqual(uploadResponse);
    });
  });

  describe('uploadWithUrl', () => {
    it('should call uploadService.uploadWithUrlAsync with correct parameters', async () => {
      const uploadRequest: UploadWithUrlRequest = MockFactory(
        UploadWithUrlRequestFixture,
      ).one();
      const uploadResponse: UploadResponse = MockFactory(
        UploadResponseFixture,
      ).one();

      uploadService.uploadWithUrlAsync.mockResolvedValue(uploadResponse);

      const result = await resolver.uploadWithUrl(uploadRequest);

      expect(uploadService.uploadWithUrlAsync).toHaveBeenCalledWith(
        uploadRequest,
      );
      expect(result).toEqual(uploadResponse);
    });
  });
});
