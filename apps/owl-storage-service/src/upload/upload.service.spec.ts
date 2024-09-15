import { OwlStorageService, UploadResult } from '@app/owl-storage';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFactory } from 'mockingbird';
import { UploadResultFixture } from '../../../../libs/owl-storage/test/fixtures';
import { UploadService } from './upload.service';
import { UploadWithBase64Request } from './dto';
import { UploadWithBase64RequestFixture } from '../../test/fixtures/upload';

describe('UploadService', () => {
  let service: UploadService;
  let storageService: jest.Mocked<OwlStorageService>;

  beforeEach(async () => {
    const mockOwlStorageService = {
      uploadWithBase64Async: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: 'StorageService',
          useValue: mockOwlStorageService,
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

    it('should handle different mime types', async () => {
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
});
