import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { ReadUserDto } from './dto/read-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(req: CreateUserDto.Req) {
    const exist = await this.userModel.findById(req.id)
    if (exist) {
      throw new ConflictException('이미 존재하는 id 입니다.')
    }
    const user = new this.userModel({
      _id: req.id,
      nickname: req.nickname,
      job: req.job,
      workExperience: req.workExperience,
    })
    return await user.save()
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(id: string): Promise<ReadUserDto.Res> {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user.toJSON()
  }
}
