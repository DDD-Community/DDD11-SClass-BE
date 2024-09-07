import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DbService } from './db.service'
import { Article, ArticleSchema } from '../schemas/article.schema'
import { User, UserSchema } from '../schemas/user.schema'
import { Checklist, ChecklistSchema } from '../schemas/checklist.schema'
import { Checkbox, CheckboxSchema } from '../schemas/checkbox.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Checklist.name, schema: ChecklistSchema },
    ]),
    MongooseModule.forFeature([
      { name: Checkbox.name, schema: CheckboxSchema },
    ]),
  ],
  providers: [DbService],
  exports: [MongooseModule],
})
export class DbModule {}
