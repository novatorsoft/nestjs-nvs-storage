import { NvsStorageService, UploadResult } from '@lib/nvs-storage';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadWithBase64Request, UploadWithUrlRequest } from './dto';
import {
  UploadWithBase64RequestFixture,
  UploadWithUrlRequestFixture,
} from '../../test/fixtures/upload';

import { MockFactory } from 'mockingbird';
import { UploadResultFixture } from '../../../../libs/nvs-storage/test/fixtures';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;
  let storageService: jest.Mocked<NvsStorageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: 'StorageService',
          useValue: {
            uploadWithBase64Async: jest.fn(),
            uploadWithUrlAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    storageService = module.get('StorageService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadWithBase64Async', () => {
    it('should upload file with provided file name', async () => {
      const uploadRequest: UploadWithBase64Request = MockFactory(
        UploadWithBase64RequestFixture,
      ).one();
      const uploadResult: UploadResult = MockFactory(UploadResultFixture).one();

      storageService.uploadWithBase64Async.mockResolvedValue(uploadResult);

      const result = await service.uploadWithBase64Async(uploadRequest);

      expect(storageService.uploadWithBase64Async).toHaveBeenCalled();
      expect(result).toEqual(uploadResult);
    });

    it('should generate file name if not provided', async () => {
      const uploadRequest: UploadWithBase64Request = MockFactory(
        UploadWithBase64RequestFixture,
      ).one();
      delete uploadRequest.fileName;
      const uploadResult: UploadResult = MockFactory(UploadResultFixture).one();

      storageService.uploadWithBase64Async.mockResolvedValue(uploadResult);

      jest.spyOn(global.Date, 'now').mockImplementation(() => 1234567890);

      const result = await service.uploadWithBase64Async(uploadRequest);

      expect(storageService.uploadWithBase64Async).toHaveBeenCalled();
      expect(result).toEqual(uploadResult);
    });
  });

  describe('uploadWithUrlAsync', () => {
    it('should upload file with provided file name', async () => {
      const uploadRequest: UploadWithUrlRequest = MockFactory(
        UploadWithUrlRequestFixture,
      ).one();
      const uploadResult: UploadResult = MockFactory(UploadResultFixture).one();

      storageService.uploadWithUrlAsync.mockResolvedValue(uploadResult);

      const result = await service.uploadWithUrlAsync(uploadRequest);

      expect(storageService.uploadWithUrlAsync).toHaveBeenCalled();
      expect(result).toEqual(uploadResult);
    });

    it('should generate file name if not provided', async () => {
      const uploadRequest: UploadWithUrlRequest = MockFactory(
        UploadWithUrlRequestFixture,
      ).one();
      delete uploadRequest.fileName;
      const uploadResult: UploadResult = MockFactory(UploadResultFixture).one();

      storageService.uploadWithUrlAsync.mockResolvedValue(uploadResult);

      jest.spyOn(global.Date, 'now').mockImplementation(() => 1234567890);

      const result = await service.uploadWithUrlAsync(uploadRequest);

      expect(storageService.uploadWithUrlAsync).toHaveBeenCalled();
      expect(result).toEqual(uploadResult);
    });
  });
});
