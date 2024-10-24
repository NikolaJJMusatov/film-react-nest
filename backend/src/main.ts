import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DevLogger } from './middlewares/dev.logger';
import { JsonLogger } from './middlewares/json.logger';
import { TSKVlogger } from './middlewares/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(
    app.get('CONFIG').mode === 'dev'
      ? new DevLogger()
      : app.get('CONFIG').mode === 'prod' && app.get('CONFIG').logger === 'json'
        ? new JsonLogger()
        : new TSKVlogger(),
  );

  await app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}
bootstrap();
