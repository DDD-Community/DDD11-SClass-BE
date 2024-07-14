import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { version } from './../package.json'

async function bootstrap() {
  const swaggerPath = 'docs'


  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('알잘딱깔센 앱 API')
    .setDescription(`ENVIRONMENT=${process.env.NODE_ENV}\n\n  .env=${process.env.ENV}`)
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(swaggerPath, app, document)

  console.log(`${process.env.NODE_ENV} 환경으로 서버가 시작되었습니다.`)

  await app.listen(3000)
}
bootstrap()
