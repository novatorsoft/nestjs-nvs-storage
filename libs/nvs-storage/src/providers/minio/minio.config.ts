import { StorageConfig } from '../../config';
import { StorageProvider } from '../../enum';

export class MinioConfig extends StorageConfig {
  readonly provider = StorageProvider.MINIO;
  endpoint: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  region: string;
}
