import { UploadArgs, UploadResult } from './dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class NvsStorageService {
  abstract uploadAsync(uploadArgs: UploadArgs<Buffer>): Promise<UploadResult>;
  abstract deleteAsync(path: string): Promise<void>;

  async uploadWithBase64Async(
    uploadArgs: UploadArgs<string>,
  ): Promise<UploadResult> {
    return await this.uploadAsync({
      ...uploadArgs,
      file: Buffer.from(uploadArgs.file, 'base64'),
    });
  }
}
