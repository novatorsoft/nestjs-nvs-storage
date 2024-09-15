import * as lodash from 'lodash';

import { DynamicModule, Module } from '@nestjs/common';

import { S3Config } from './providers/s3/s3.config';
import { S3Service } from './providers/s3/s3.service';
import { StorageAsyncConfig } from './config';
import { StorageProvider } from './dto';

@Module({})
export class NvsStorageModule {
  static register(config: S3Config): DynamicModule {
    return NvsStorageModule.mergeObject(
      {
        module: NvsStorageModule,
        global: false,
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
        global: false,
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

  static forRoot(config: S3Config): DynamicModule {
    return {
      ...this.register(config),
      global: true,
    };
  }

  static forRootAsync(config: StorageAsyncConfig): DynamicModule {
    return {
      ...this.registerAsync(config),
      global: true,
    };
  }

  private static getStorageProviderModuleConfig(provider?: StorageProvider) {
    let storageModuleConfig = {};
    if (provider === StorageProvider.S3)
      storageModuleConfig = {
        providers: [
          {
            provide: 'StorageService',
            useClass: S3Service,
          },
        ],
      };
    else throw new Error('Invalid storage provider');

    return storageModuleConfig;
  }

  private static mergeObject(object1: object, object2: object) {
    return lodash.mergeWith(object1, object2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });
  }
}
