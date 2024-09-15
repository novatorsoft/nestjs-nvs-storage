import { ConfigModule, ConfigService } from '@nestjs/config';
import { NvsStorageModule, StorageProvider } from '@lib/nvs-storage';

import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import appConfiguration from './config/configuration';
import s3Configuration from './config/s3.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, s3Configuration],
    }),
    NvsStorageModule.forRootAsync({
      provider: appConfiguration().storageProvider as StorageProvider,
      useFactory: (configService: ConfigService) => {
        let storageConfig;
        if (appConfiguration().storageProvider == StorageProvider.S3)
          storageConfig = configService.get('s3');

        return storageConfig;
      },
      inject: [ConfigService],
    }),
    UploadModule,
  ],
})
export class NvsStorageServiceModule {}
