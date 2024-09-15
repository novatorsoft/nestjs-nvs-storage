import { Test, TestingModule } from '@nestjs/testing';
import { UploadResponse, UploadWithBase64Request } from './dto';
import {
  UploadResponseFixture,
  UploadWithBase64RequestFixture,
} from '../../test/fixtures/upload';

import { MockFactory } from 'mockingbird';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('UploadController', () => {
  let controller: UploadController;
  let uploadService: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useValue: {
            uploadWithBase64Async: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    uploadService = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadAsync', () => {
    it('should call uploadWithBase64Async and return the result', async () => {
      const uploadRequest: UploadWithBase64Request = MockFactory(
        UploadWithBase64RequestFixture,
      ).one();
      const uploadResponse: UploadResponse = MockFactory(
        UploadResponseFixture,
      ).one();

      jest
        .spyOn(uploadService, 'uploadWithBase64Async')
        .mockResolvedValue(uploadResponse);

      const result = await controller.uploadAsync(uploadRequest);

      expect(uploadService.uploadWithBase64Async).toHaveBeenCalledWith(
        uploadRequest,
      );
      expect(result).toEqual(uploadResponse);
    });
  });
});
