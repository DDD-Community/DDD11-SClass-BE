import { Module } from '@nestjs/common'
import { MyController } from './my.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [MyController],
})
export class MyModule {}
