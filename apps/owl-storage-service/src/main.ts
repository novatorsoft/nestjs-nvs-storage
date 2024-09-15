import * as bodyParser from 'body-parser';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { OwlStorageServiceModule } from './owl-storage-service.module';
import config from './config/configuration';

function initSwagger(app: INestApplication) {
  if (config().swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(config().name)
      .setDescription(config().description)
      .setVersion(config().version)
      .addServer(config().basePath)
      .addSecurity('ApiKey', {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      })
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }
}

function initValidationPipe(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix(config().basePath);
}

async function bootstrap() {
  const app = await NestFactory.create(OwlStorageServiceModule);

  app.enableCors({
    origin: config().corsAllowedOrigins || true,
    credentials: true,
  });

  app.use(bodyParser.json({ limit: config().bodySizeLimit }));

  initSwagger(app);
  setGlobalPrefix(app);
  initValidationPipe(app);
  await app.listen(config().port);
}
bootstrap();
