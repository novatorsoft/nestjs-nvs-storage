import { Inject, Injectable } from '@nestjs/common';
import { UploadArgs, UploadResult } from '../../dto';
import { NvsStorageService } from '../../nvs-storage.service';
import { S3Config } from './s3.config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class S3Service extends NvsStorageService {
  private readonly s3Client: S3Client;

  constructor(
    @Inject('StorageConfig') private readonly s3Config: S3Config,
    httpService: HttpService,
  ) {
    super(httpService);
    this.s3Client = new S3Client({
      forcePathStyle: true,
      region: s3Config.region,
      credentials: {
        accessKeyId: s3Config.accessKey,
        secretAccessKey: s3Config.secretKey,
      },
    });
  }

  async uploadAsync(uploadArgs: UploadArgs<Buffer>): Promise<UploadResult> {
    const extension = await this.getFileExtensionByBufferAsync(uploadArgs.file);
    const fileName = `${uploadArgs.fileName}.${extension}`;
    const path = uploadArgs.path ? `${uploadArgs.path}/${fileName}` : fileName;

    const command = new PutObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: path,
      Body: uploadArgs.file,
    });

    await this.s3Client.send(command);
    return {
      path,
      fileName: uploadArgs.fileName,
      size: uploadArgs.file.length,
      extension,
      url: `${this.s3Config.endpoint}/${path}`,
    };
  }

  async deleteAsync(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: path,
    });

    await this.s3Client.send(command);
  }
}
