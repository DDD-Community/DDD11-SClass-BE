import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
      envFilePath:
      process.env.NODE_ENV === 'production' ? 
      '.env.production' :
      '.env.development' 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
