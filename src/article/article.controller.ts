import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { Dto } from '../app.dto'

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 요즘 IT 의 아티클을 직군별로 스크래핑
   * @summary IT 아티클 스크래핑
   * @returns DB 에 저장된 아티클 갯수
   * @tag Article 아티클
   */
  @Post()
  async create(): Promise<Dto<CreateArticleDto.Res>> {
    const res = await this.articleService.create()
    return { data: { inserted: res } }
  }
}
