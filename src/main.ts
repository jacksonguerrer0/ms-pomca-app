import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipNullProperties: true,
    }),
  );

  // TODO: dEFINIT LOGGER

  const swaConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Pomca-App API')
    .setVersion('1.0')
    .build();
  const swaDocument = SwaggerModule.createDocument(app, swaConfig);
  SwaggerModule.setup('docs', app, swaDocument);

  await app.listen(3000);
}
bootstrap();
