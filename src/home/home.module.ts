import { Module } from '@nestjs/common'
import { HomeService } from './home.service'
import { HomeController } from './home.controller'
import { DbModule } from '../db/db.module'
import { Article, ArticleSchema } from 'src/schemas/article.schema'

@Module({
  imports: [DbModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
