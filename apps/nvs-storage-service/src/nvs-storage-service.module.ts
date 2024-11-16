import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NvsStorageModule, StorageProvider } from '@lib/nvs-storage';

import { AppResolver } from './app.resolver';
import { GraphQLFormattedError } from 'graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import appConfiguration from './config/configuration';
import { join } from 'path';
import minioConfiguration from './config/minio.configuration';
import s3Configuration from './config/s3.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, s3Configuration, minioConfiguration],
    }),
    NvsStorageModule.forRootAsync({
      provider: appConfiguration().storageProvider as StorageProvider,
      useFactory: (configService: ConfigService) => {
        let storageConfig;
        if (appConfiguration().storageProvider == StorageProvider.S3)
          storageConfig = configService.get('s3');
        else if (appConfiguration().storageProvider == StorageProvider.MINIO)
          storageConfig = configService.get('minio');

        return storageConfig;
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      formatError: (error) => {
        return (
          error.extensions.originalError
            ? error.extensions.originalError
            : {
                message: error.message,
                code: error?.extensions?.code,
              }
        ) as GraphQLFormattedError;
      },
    }),
    UploadModule,
  ],
  providers: [AppResolver],
})
export class NvsStorageServiceModule {}
