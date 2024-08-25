import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ArticleService } from './article/article.service'
import { ReadHomeDto } from './home/dto/read-home.dto'

@Controller()
export class AppController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * url 로 썸네일 추출하는 법 아시나요... 아시는분.. 가르쳐주세요 
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
