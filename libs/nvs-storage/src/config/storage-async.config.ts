import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { MinioConfig } from '../providers/minio/minio.config';
import { S3Config } from '../providers/s3/s3.config';
import { StorageConfig } from './storage.config';

export type ConfigType = S3Config | MinioConfig;

export type StorageAsyncConfig = Pick<ModuleMetadata, 'imports'> &
  Pick<
    FactoryProvider<Omit<ConfigType, 'provider' | 'isGlobal'>>,
    'useFactory' | 'inject'
  > &
  StorageConfig;
