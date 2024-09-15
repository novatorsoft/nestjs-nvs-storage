import { NvsStorageService, UploadResult } from '@lib/nvs-storage';
import { Inject, Injectable } from '@nestjs/common';
import { UploadWithBase64Request } from './dto';
import { uid } from 'uid';

@Injectable()
export class UploadService {
  constructor(
    @Inject('StorageService')
    private readonly storageService: NvsStorageService,
  ) {}

  uploadWithBase64Async(
    uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResult> {
    const [base64Prefix, base64Data] = uploadRequest.file.split(',');
    const fileName = uploadRequest.fileName
      ? uploadRequest.fileName
      : `${uid(6)}-${new Date().getTime()}`;

    return this.storageService.uploadWithBase64Async({
      fileName: `${fileName}.${this.getMime(base64Prefix)}`,
      path: uploadRequest.path,
      file: base64Data,
    });
  }

  private getMime(base64Prefix: string) {
    const mimeType = RegExp(/data:(.*?);base64/)
      .exec(base64Prefix)
      .at(1);
    return mimeType?.split('/')[1];
  }
}
