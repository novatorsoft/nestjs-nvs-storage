import { Body, Controller, Post } from '@nestjs/common';

import { UploadService } from './upload.service';
import { UploadWithBase64Request, UploadResponse } from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('with-base64')
  @ApiResponse({ type: UploadResponse })
  async uploadAsync(
    @Body() uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithBase64Async(uploadRequest);
  }
}
