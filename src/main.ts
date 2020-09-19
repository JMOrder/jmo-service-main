import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppLogger } from './shared/app-logger/app-logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(AppLogger))
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
