import * as lodash from 'lodash';

import { ConfigType, StorageAsyncConfig } from './config';
import { DynamicModule, Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { MinioService } from './providers/minio/minio.service';
import { S3Service } from './providers/s3/s3.service';
import { StorageProvider } from './dto';

@Module({
  providers: [],
})
export class NvsStorageModule {
  static register(config: ConfigType): DynamicModule {
    return NvsStorageModule.mergeObject(
      {
        module: NvsStorageModule,
        global: config?.isGlobal ?? false,
        providers: [
          {
            provide: 'StorageConfig',
            useValue: config,
          },
        ],
        exports: ['StorageService'],
      },
      NvsStorageModule.getStorageProviderModuleConfig(config?.provider),
    );
  }

  static registerAsync(config: StorageAsyncConfig): DynamicModule {
    return NvsStorageModule.mergeObject(
      {
        module: NvsStorageModule,
        global: config?.isGlobal ?? false,
        imports: config.imports,
        exports: ['StorageService'],
        providers: [
          {
            provide: 'StorageConfig',
            useFactory: config.useFactory,
            inject: config.inject,
          },
        ],
      },
      NvsStorageModule.getStorageProviderModuleConfig(config?.provider),
    );
  }

  private static getStorageProviderModuleConfig(provider?: StorageProvider) {
    const storageModuleConfigs = {
      [StorageProvider.S3]: {
        providers: [
          {
            provide: 'StorageService',
            useClass: S3Service,
          },
        ],
      },
      [StorageProvider.MINIO]: {
        providers: [
          {
            provide: 'StorageService',
            useClass: MinioService,
          },
        ],
      },
    };

    const storageModuleConfig = storageModuleConfigs[provider];

    if (!storageModuleConfig) throw new Error('Invalid storage provider');

    return {
      ...storageModuleConfig,
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
    };
  }

  private static mergeObject(object1: object, object2: object) {
    return lodash.mergeWith(object1, object2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });
  }
}
