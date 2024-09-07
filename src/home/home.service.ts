import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article } from '../schemas/article.schema'
import { ReadHomeDto } from './dto/read-home.dto'
import { User } from '../schemas/user.schema'

@Injectable()
export class HomeService {
  @InjectModel(Article.name) private articleModel: Model<Article>
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getArticles(userId: string) {
    const user = await this.userModel.findById<User>(userId)
    if (!user) {
      throw new NotFoundException(`userId=${userId} not found`)
    }

    const cursor = await this.articleModel.find({job: user.job})
    const res = cursor.map((c) => {
      const article = c.toJSON()
      return article
    })
    return res
  }
}
