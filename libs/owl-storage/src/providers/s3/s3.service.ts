import { Inject, Injectable } from '@nestjs/common';
import { OwlStorageService } from '@lib/owl-storage/owl-storage.service';
import { UploadArgs } from '@lib/owl-storage/dto/upload-args.dto';
import { UploadResult } from '@lib/owl-storage/dto';
import { S3Config } from './s3.config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service extends OwlStorageService {
  private readonly s3Client: S3Client;

  constructor(@Inject('StorageConfig') private readonly s3Config: S3Config) {
    super();
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
    const path = uploadArgs.path
      ? `${uploadArgs.path}/${uploadArgs.fileName}`
      : uploadArgs.fileName;

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
      extension: uploadArgs.fileName.split('.').pop(),
      url: `${this.s3Config.endpoint}/${path}`,
    };
  }

  async uploadWithBase64Async(
    uploadArgs: UploadArgs<string>,
  ): Promise<UploadResult> {
    return await this.uploadAsync({
      ...uploadArgs,
      file: Buffer.from(uploadArgs.file, 'base64'),
    });
  }

  async deleteAsync(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: path,
    });

    await this.s3Client.send(command);
  }
}
