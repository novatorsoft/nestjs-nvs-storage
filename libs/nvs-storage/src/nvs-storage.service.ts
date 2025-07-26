import { FileMime, UploadArgs, UploadResult } from './dto';

import { HttpService } from '@nestjs/axios';
import { ProviderUploadResult } from './dto/provider-upload-result.dto';
import { firstValueFrom } from 'rxjs';
import { fromBuffer } from 'file-type';

export abstract class NvsStorageService {
  constructor(private readonly httpService: HttpService) {}

  protected abstract uploadProviderAsync(
    uploadArgs: UploadArgs<Buffer> & FileMime,
  ): Promise<ProviderUploadResult>;
  abstract deleteAsync(path: string): Promise<void>;
  abstract createShareLinkAsync(
    path: string,
    expiresIn?: number,
  ): Promise<string>;

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

  async uploadAsync(uploadArgs: UploadArgs<Buffer>): Promise<UploadResult> {
    const fileInfo = await this.getFileMimeByBufferAsync(uploadArgs);
    const fileName = `${uploadArgs.fileName}.${fileInfo.extension}`;
    const path = uploadArgs.path ? `${uploadArgs.path}/${fileName}` : fileName;

    this.validateFileSize(uploadArgs);
    this.validateFileType(uploadArgs, fileInfo);

    const uploadResult = await this.uploadProviderAsync({
      ...uploadArgs,
      ...fileInfo,
      fileName,
      path,
    });

    return {
      path,
      fileName,
      size: uploadArgs.file.length,
      extension: fileInfo.extension,
      mime: fileInfo.mime,
      ...uploadResult,
    };
  }

  protected async getFileMimeByBufferAsync(
    uploadArgs: UploadArgs<Buffer>,
  ): Promise<FileMime> {
    const fileType = await fromBuffer(uploadArgs.file);
    let result: FileMime;
    if (fileType)
      result = {
        extension: fileType.ext,
        mime: fileType.mime,
      };
    else if (uploadArgs.defaultMime) result = uploadArgs.defaultMime;
    else throw new Error('Failed to determine file type.');
    return result;
  }

  private validateFileSize(uploadArgs: UploadArgs<Buffer>): void {
    console.log(uploadArgs.maxSize, uploadArgs.file.length);
    if (uploadArgs.maxSize && uploadArgs.file.length > uploadArgs.maxSize)
      throw new Error('File size exceeds the maximum allowed size.');
  }

  private validateFileType(
    uploadArgs: UploadArgs<Buffer>,
    fileMime: FileMime,
  ): void {
    if (
      uploadArgs.validateFileTypes &&
      !uploadArgs.validateFileTypes.includes(fileMime.mime)
    )
      throw new Error(`File type '${fileMime.mime}' is not allowed.`);
  }
}
