import { Inject, Injectable } from '@nestjs/common';
import { FileMime, ProviderUploadResult, UploadArgs } from '../../dto';
import { NvsStorageService } from '../../nvs-storage.service';
import { MinioConfig } from './minio.config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MinioService extends NvsStorageService {
  private readonly minioClient: S3Client;

  constructor(
    @Inject('StorageConfig') private readonly minioConfig: MinioConfig,
    httpService: HttpService,
  ) {
    super(httpService);
    this.minioClient = new S3Client({
      forcePathStyle: true,
      endpoint: minioConfig.endpoint,
      region: minioConfig.region,
      credentials: {
        accessKeyId: minioConfig.accessKey,
        secretAccessKey: minioConfig.secretKey,
      },
    });
  }

  async uploadProviderAsync(
    uploadArgs: UploadArgs<Buffer> & FileMime,
  ): Promise<ProviderUploadResult> {
    const command = new PutObjectCommand({
      Bucket: this.minioConfig.bucket,
      Key: uploadArgs.path,
      Body: uploadArgs.file,
      ContentType: uploadArgs.mime,
    });

    await this.minioClient.send(command);
    return {
      url: `${this.minioConfig.endpoint}/${this.minioConfig.bucket}/${uploadArgs.path}`,
    };
  }

  async deleteAsync(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.minioConfig.bucket,
      Key: path,
    });

    await this.minioClient.send(command);
  }

  async createShareLinkAsync(
    path: string,
    expiresIn: number = 360,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.minioConfig.bucket,
        Key: path,
      });

      return await getSignedUrl(this.minioClient, command, {
        expiresIn,
      });
    } catch (error) {
      throw new Error(`Failed to create share link: ${error.message}`);
    }
  }
}
