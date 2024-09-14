import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { S3Config } from '../providers/s3/s3.config';
import { StorageConfig } from './storage.config';

type ConfigType = S3Config;

export type StorageAsyncConfig = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<ConfigType>, 'useFactory' | 'inject'> &
  StorageConfig;
