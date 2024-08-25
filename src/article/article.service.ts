import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article } from '../schemas/article.schema'
import { ReadHomeDto } from 'src/home/dto/read-home.dto'

@Injectable()
export class ArticleService {
  @InjectModel(Article.name) private articleModel: Model<Article>

  async getArticles() {
    const articles = await this.articleModel.find()
    const res = articles.map((article) => {
      const { ...dto } = article.toJSON()
      return dto
    })
    return res
  }
}
