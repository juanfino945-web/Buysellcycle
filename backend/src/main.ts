import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // permite que el frontend (otro puerto) le pegue a esta API

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // tira error si mandan una propiedad de más
      transform: true, // convierte tipos automáticamente (ej: string -> number en params)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
