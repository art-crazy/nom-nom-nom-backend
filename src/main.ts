import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Устанавливаем глобальный префикс /api
  app.setGlobalPrefix('api');

  // Настройка CORS (можно подправить список origin под себя)
  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        ['https://chto-prigotovit.ru', 'https://www.chto-prigotovit.ru'].includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Length', 'Content-Range'],
  });

  // Swagger конфигурация
  const config = new DocumentBuilder()
    .setTitle('Nom Nom Nom API')
    .setDescription('Документация API для бэкенда Nom Nom Nom')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Nom Nom Nom API - Документация',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Приложение запущено на: http://localhost:${port}`);
  console.log(`📚 Документация API доступна по адресу: http://localhost:${port}/api/docs`);
}

bootstrap();
