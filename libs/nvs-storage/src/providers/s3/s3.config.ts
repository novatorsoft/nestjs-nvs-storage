import { StorageConfig } from '../../config';
import { StorageProvider } from '../../dto';

export class S3Config extends StorageConfig {
  readonly provider = StorageProvider.S3;
  endpoint: string;
  accessKey: string;
  secretKey: string;
  region: string;
  bucket: string;
}
