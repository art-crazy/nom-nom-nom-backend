import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Nom Nom Nom API')
    .setDescription('Документация API для бэкенда Nom Nom Nom')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Nom Nom Nom API - Документация',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
  console.log(`🚀 Приложение запущено на: http://localhost:${port}`);
  console.log(`📚 Документация API доступна по адресу: http://localhost:${port}/api/docs`);
}
bootstrap();
