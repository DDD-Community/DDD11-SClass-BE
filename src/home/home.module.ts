import { Module } from '@nestjs/common'
import { HomeService } from './home.service'
import { HomeController } from './home.controller'
import { ArticleModule } from '../article/article.module'

@Module({
  imports: [ArticleModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
