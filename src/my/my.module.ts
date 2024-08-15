import { Module } from '@nestjs/common'
import { MyService } from './my.service'
import { MyController } from './my.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Cat, CatSchema } from 'src/schemas/my.schema'

// @Module({
//   imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
//   controllers: [MyController],
//   providers: [MyService],
// })
// export class MyModule {}
