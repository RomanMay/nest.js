import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import "reflect-metadata"
import * as config from 'config'
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder'
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const serverConfig = config.get('server')

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('The tasks API description')
    .setVersion(  '1.0')
    .addTag('tasks')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors()

  const port = process.env.SERVER
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
