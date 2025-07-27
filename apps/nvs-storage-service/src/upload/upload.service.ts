import { FileMime, NvsStorageService, UploadResult } from '@lib/nvs-storage';
import { Inject, Injectable } from '@nestjs/common';
import { UploadWithBase64Request, UploadWithUrlRequest } from './dto';
import { uid } from 'uid';

@Injectable()
export class UploadService {
  constructor(
    @Inject('StorageService')
    private readonly storageService: NvsStorageService,
  ) {}

  private readonly defaultMime: FileMime = {
    extension: 'pdf',
    mime: 'application/pdf',
  };

  uploadWithBase64Async(
    uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResult> {
    return this.storageService.uploadWithBase64Async({
      fileName: this.createFileName(uploadRequest.fileName),
      path: uploadRequest.path,
      file: uploadRequest.file,
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
