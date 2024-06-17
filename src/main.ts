import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    skipNullProperties: true,
  }));

  // TODO: dEFINIT LOGGER, INTERCEPTORS, EXCEPTIONS MANAGERFILTER

  const swaConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('pomca-app API')
    .setVersion('1.0')
    .build()
  const swaDocument = SwaggerModule.createDocument(app, swaConfig);
  SwaggerModule.setup('docs', app, swaDocument);

  await app.listen(3000);
}
bootstrap();
