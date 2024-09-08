import { Controller, Get, Query } from '@nestjs/common'
import { HomeService } from './home.service'
import { ReadHomeDto } from './dto/read-home.dto'
import { Dto } from '../app.dto'

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
  async getHome(@Query('userId') userId: string): Promise<Dto<ReadHomeDto.Res>> {
    const articles = await this.homeService.getArticles(userId)
    return { data: {articles: articles} }
  }
}
