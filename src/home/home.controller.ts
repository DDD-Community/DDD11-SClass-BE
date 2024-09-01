import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'
import { ReadHomeDto } from './dto/read-home.dto'

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  /**
   * sample description
   * @summary 아티클
   * @returns sample return
   * @tag Home 홈
   */
  @Get('articles')
  async getHome(): Promise<ReadHomeDto.Res> {
    const articles = await this.homeService.getArticles()
    return {articles: articles}
  }
}
