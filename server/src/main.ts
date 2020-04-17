import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('在线教育')
    .setDescription('在线教育API')
    .setVersion('1.0')
    // .addTag('edu')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3000)
}
bootstrap()
