import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article } from '../schemas/article.schema'
import { ReadHomeDto } from './dto/read-home.dto'

@Injectable()
export class HomeService {
  @InjectModel(Article.name) private articleModel: Model<Article>

  async getArticles() {
    const cursor = await this.articleModel.find()
    const res = cursor.map((c) => {
      const article = c.toJSON()
      return article
    })
    return res
  }
}
