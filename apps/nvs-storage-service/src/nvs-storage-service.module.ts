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
    NvsStorageModule.registerAsync({
      isGlobal: true,
      provider: appConfiguration().storageProvider as StorageProvider,
      useFactory: (configService: ConfigService) => {
        const storageConfigs = {
          [StorageProvider.S3]: configService.get('s3'),
          [StorageProvider.MINIO]: configService.get('minio'),
        };
        return storageConfigs[appConfiguration().storageProvider];
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
