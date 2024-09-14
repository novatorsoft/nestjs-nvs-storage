import { StorageConfig } from '../../config';

export class S3Config extends StorageConfig {
  readonly type = 'S3';
  endpoint: string;
  accessKey: string;
  secretKey: string;
  region: string;
  bucket: string;
}
