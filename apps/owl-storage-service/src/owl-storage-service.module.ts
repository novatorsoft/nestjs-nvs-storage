import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class OwlStorageServiceModule {}
