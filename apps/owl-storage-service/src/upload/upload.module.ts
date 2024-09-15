import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadResolver],
})
export class UploadModule {}
