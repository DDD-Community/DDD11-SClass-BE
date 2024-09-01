import { Module } from '@nestjs/common'
import { MyController } from './my.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { DbModule } from 'src/db/db.module'
import { MyService } from './my.service'

@Module({
  imports: [DbModule],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
