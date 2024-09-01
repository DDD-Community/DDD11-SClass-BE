import { Module } from '@nestjs/common'
import { DbService } from './db.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Article, ArticleSchema } from '../schemas/article.schema'
import { User, UserSchema } from '../schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [DbService],
  exports: [MongooseModule],
})
export class DbModule {}
