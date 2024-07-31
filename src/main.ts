import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { version } from './../package.json'
import { DbService } from './db/db.service'
import { strict } from 'assert'
import { LoggingFilter } from './logging/logging.filter'
import * as fs from 'fs'
import * as path from 'path'
import { NestiaSdkApplication } from '@nestia/sdk'

async function bootstrap() {
  const swaggerPath = 'docs'

  const app = await NestFactory.create(AppModule)

  // 문서
  // const config = new DocumentBuilder()
  //   .setTitle('알잘딱깔센 앱 API')
  //   .setDescription(`ENVIRONMENT=${process.env.NODE_ENV}`)
  //   .setVersion(version)
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve('docs/swagger.json'), 'utf8'),
  )
  SwaggerModule.setup(swaggerPath, app, swaggerDocument)

  // 로깅
  app.useGlobalFilters(new LoggingFilter())

  // DB
  const id: string = process.env.DB_ID ? process.env.DB_ID : 'admin'
  const password: string = process.env.DB_PASSWORD
    ? process.env.DB_PASSWORD
    : '1234'
  DbService.connectDB(id, password).catch((e) => {
    console.log(
      'You failed to connect MongoDB, your id or password is invalid.',
    )
    throw e
  })

  console.log(`${process.env.NODE_ENV} 환경으로 서버가 시작되었습니다.`)
  await app.listen(3000)
}
bootstrap()
