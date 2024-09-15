import { UploadArgs, UploadResult } from './dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class NvsStorageService {
  abstract uploadAsync(uploadArgs: UploadArgs<Buffer>): Promise<UploadResult>;
  abstract uploadWithBase64Async(
    uploadArgs: UploadArgs<string>,
  ): Promise<UploadResult>;
  abstract deleteAsync(path: string): Promise<void>;
}
