import { UploadArgs, UploadResult } from './dto';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { fromBuffer } from 'file-type';

export abstract class NvsStorageService {
  constructor(private readonly httpService: HttpService) {}

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

  async uploadWithUrlAsync(uploadArgs: UploadArgs<string>) {
    const response = await firstValueFrom(
      this.httpService.get(uploadArgs.file, {
        responseType: 'arraybuffer',
      }),
    );

    const buffer = Buffer.from(response.data);
    if (!buffer || buffer.length === 0)
      throw new Error('Failed to retrieve file from URL.');

    return await this.uploadAsync({
      ...uploadArgs,
      file: Buffer.from(response.data),
    });
  }

  protected async getFileExtensionByBufferAsync(file: Buffer): Promise<string> {
    const fileType = await fromBuffer(file);
    return fileType?.ext ?? 'bin';
  }
}
