import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ArticleService } from './article/article.service'
import { ReadHomeDto } from './home/dto/read-home.dto'

@Controller()
export class AppController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * sample description
   * @summary 홈
   * @returns sample return
   * @tag Home 홈
   */
  @Get()
  async getHome(): Promise<ReadHomeDto.Res> {
    const articles = await this.articleService.getArticles()
    return { articles: articles }
  }
}
