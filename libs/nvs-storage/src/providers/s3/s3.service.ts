import { Inject, Injectable } from '@nestjs/common';
import { FileMime, ProviderUploadResult, UploadArgs } from '../../dto';
import { NvsStorageService } from '../../nvs-storage.service';
import { S3Config } from './s3.config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

  async uploadProviderAsync(
    uploadArgs: UploadArgs<Buffer> & FileMime,
  ): Promise<ProviderUploadResult> {
    const command = new PutObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: uploadArgs.path,
      Body: uploadArgs.file,
      ContentType: uploadArgs.mime,
    });

    await this.s3Client.send(command);
    return {
      url: `${this.s3Config.endpoint}/${this.s3Config.bucket}/${uploadArgs.path}`,
    };
  }

  async deleteAsync(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: path,
    });

    await this.s3Client.send(command);
  }

  async createShareLinkAsync(
    path: string,
    expiresIn: number = 360,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.s3Config.bucket,
        Key: path,
      });

      return await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });
    } catch (error) {
      throw new Error(`Failed to create share link: ${error.message}`);
    }
  }
}
