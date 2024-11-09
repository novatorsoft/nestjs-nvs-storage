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

  static forRoot(config: ConfigType): DynamicModule {
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
    else if (provider === StorageProvider.MINIO)
      storageModuleConfig = {
        providers: [
          {
            provide: 'StorageService',
            useClass: MinioService,
          },
        ],
      };
    else throw new Error('Invalid storage provider');

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
