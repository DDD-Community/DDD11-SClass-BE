import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { ReadMyDto } from './dto/read-my.dto'

@Injectable()
export class MyService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(userId: string): Promise<ReadMyDto.Res> {
    const user = await this.userModel.findById<ReadMyDto.Res>(userId)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }
}
