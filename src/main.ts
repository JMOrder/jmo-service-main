import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GCPubSubServer } from '@algoan/nestjs-google-pubsub-microservice';
import { AppLogger } from './shared/app-logger/app-logger.service';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { promises as fsPromises } from 'fs';
import * as path from "path";
import * as morgan from "morgan";

const loadGoogleServiceAccount = async () => {
  const rawServiceAccountData: Buffer = await fsPromises.readFile(path.resolve('service-account.json'));
  return JSON.parse(rawServiceAccountData.toString());
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appLogger = app.get(AppLogger);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(appLogger);
  app.use(morgan('dev'));
  app.enableShutdownHooks();

  const swaggerOptions = new DocumentBuilder()
    .setTitle('JMOrder Main API')
    .setDescription('The JMOrder API description')
    .setVersion('1.0')
    .addTag('JMOrder')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    strategy: new GCPubSubServer({
      projectId: configService.get('GOOGLE_CLOUD_PUBSUB_PROJECT_ID'),
      credentials: await loadGoogleServiceAccount(),
      subscriptionsPrefix: configService.get('GOOGLE_CLOUD_PUBSUB_SUBSCRIPTION_PREFIX'),
      topicsNames: ['data-sync']
    })
  });
  await app.startAllMicroservicesAsync();

  await app.listen(configService.get('PORT'));
}

bootstrap();
