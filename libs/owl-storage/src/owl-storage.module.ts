import { Module } from '@nestjs/common';
import { OwlStorageService } from './owl-storage.service';
import { S3Module } from './providers/s3/s3.module';

@Module({
  providers: [OwlStorageService],
  exports: [OwlStorageService],
  imports: [S3Module],
})
export class OwlStorageModule {}
