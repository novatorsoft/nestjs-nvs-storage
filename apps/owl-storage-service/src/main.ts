import { NestFactory } from '@nestjs/core';
import { OwlStorageServiceModule } from './owl-storage-service.module';

async function bootstrap() {
  const app = await NestFactory.create(OwlStorageServiceModule);
  await app.listen(3000);
}
bootstrap();
