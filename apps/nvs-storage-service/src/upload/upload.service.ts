import { NvsStorageService, UploadResult } from '@lib/nvs-storage';
import { Inject, Injectable } from '@nestjs/common';
import { UploadWithBase64Request, UploadWithUrlRequest } from './dto';
import { uid } from 'uid';

@Injectable()
export class UploadService {
  constructor(
    @Inject('StorageService')
    private readonly storageService: NvsStorageService,
  ) {}

  private readonly defaultMime = {
    extension: 'bin',
    mime: 'application/octet-stream',
  };

  uploadWithBase64Async(
    uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResult> {
    const base64Data = uploadRequest.file.split(',').at(1);
    const fileName = uploadRequest.fileName
      ? uploadRequest.fileName
      : `${uid(6)}-${new Date().getTime()}`;

    return this.storageService.uploadWithBase64Async({
      fileName: this.createFileName(fileName),
      path: uploadRequest.path,
      file: base64Data,
      defaultMime: this.defaultMime,
    });
  }

  uploadWithUrlAsync(
    uploadRequest: UploadWithUrlRequest,
  ): Promise<UploadResult> {
    return this.storageService.uploadWithUrlAsync({
      file: uploadRequest.fileUrl,
      fileName: this.createFileName(uploadRequest.fileName),
      path: uploadRequest.path,
      defaultMime: this.defaultMime,
    });
  }

  private createFileName(fileName: string) {
    return fileName ?? `${uid(6)}-${new Date().getTime()}`;
  }
}
