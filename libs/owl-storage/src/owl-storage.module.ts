import * as lodash from 'lodash';

import { DynamicModule, Module } from '@nestjs/common';

import { S3Config } from './providers/s3/s3.config';
import { S3Service } from './providers/s3/s3.service';
import { StorageAsyncConfig } from './config';

@Module({})
export class OwlStorageModule {
  static register(config: S3Config): DynamicModule {
    return OwlStorageModule.mergeObject(
      {
        module: OwlStorageModule,
        global: false,
        providers: [
          {
            provide: 'StorageConfig',
            useValue: config,
          },
        ],
        exports: ['StorageService'],
      },
      OwlStorageModule.getStorageProviderModuleConfig(config?.provider),
    );
  }

  static registerAsync(config: StorageAsyncConfig): DynamicModule {
    return OwlStorageModule.mergeObject(
      {
        module: OwlStorageModule,
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
      OwlStorageModule.getStorageProviderModuleConfig(config?.provider),
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

  private static getStorageProviderModuleConfig(type?: string) {
    let storageModuleConfig = {};
    if (type === 'S3')
      storageModuleConfig = {
        providers: [
          {
            provide: 'StorageService',
            useClass: S3Service,
          },
        ],
      };
    else throw new Error('Invalid storage type');

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
