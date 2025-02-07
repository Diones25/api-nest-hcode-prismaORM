import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor); //usando interceptor globalmente

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
