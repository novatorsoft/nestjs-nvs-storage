import { Module } from '@nestjs/common';
import { OwlStorageServiceController } from './owl-storage-service.controller';
import { OwlStorageServiceService } from './owl-storage-service.service';

@Module({
  imports: [],
  controllers: [OwlStorageServiceController],
  providers: [OwlStorageServiceService],
})
export class OwlStorageServiceModule {}
