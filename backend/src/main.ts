import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://localhost:4200' });

  // app.use(
  //   '/imgpublicaciones',
  //   express.static(path.join(__dirname, '..', 'public', 'imgpublicaciones')),
  // );
  app.use(express.static(path.join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
