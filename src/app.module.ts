import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DbModule } from './db/db.module'
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose'
import { HomeModule } from './home/home.module'
import { Article } from './schemas/article.schema'
import { OnboardingModule } from './onboarding/onboarding.module'
import { MyModule } from './my/my.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    DbModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URI'),
      }),
    }),
    HomeModule,
    OnboardingModule,
    MyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
