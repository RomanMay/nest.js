import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import "reflect-metadata"
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const serverConfig = config.get('server')

  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const port = process.env.SERVER
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
