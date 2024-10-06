import { Body, Controller, Post } from '@nestjs/common';

import { UploadService } from './upload.service';
import {
  UploadWithBase64Request,
  UploadResponse,
  UploadWithUrlRequest,
} from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('with-base64')
  @ApiResponse({ type: UploadResponse })
  async uploadWithBase64Async(
    @Body() uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithBase64Async(uploadRequest);
  }

  @Post('with-url')
  @ApiResponse({ type: UploadResponse })
  async uploadWithUrlAsync(
    @Body() uploadRequest: UploadWithUrlRequest,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithUrlAsync(uploadRequest);
  }
}
