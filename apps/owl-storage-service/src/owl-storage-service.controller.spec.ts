import { Test, TestingModule } from '@nestjs/testing';
import { OwlStorageServiceController } from './owl-storage-service.controller';
import { OwlStorageServiceService } from './owl-storage-service.service';

describe('OwlStorageServiceController', () => {
  let owlStorageServiceController: OwlStorageServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OwlStorageServiceController],
      providers: [OwlStorageServiceService],
    }).compile();

    owlStorageServiceController = app.get<OwlStorageServiceController>(OwlStorageServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(owlStorageServiceController.getHello()).toBe('Hello World!');
    });
  });
});
