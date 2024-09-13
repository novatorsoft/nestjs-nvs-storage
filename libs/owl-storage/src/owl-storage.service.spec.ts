import { Test, TestingModule } from '@nestjs/testing';
import { OwlStorageService } from './owl-storage.service';

describe('OwlStorageService', () => {
  let service: OwlStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwlStorageService],
    }).compile();

    service = module.get<OwlStorageService>(OwlStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
