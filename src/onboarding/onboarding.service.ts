import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateOnboardingDto } from './dto/create-onboarding.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class OnboardingService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(req: CreateOnboardingDto.Req) {
    const exist = await this.userModel.findById(req.userId)
    if (exist) {
      throw new ConflictException('이미 존재하는 id 입니다.')
    }
    const user = new this.userModel({
      _id: req.userId,
      nickname: req.nickname,
      job: req.job,
      workExperience: req.workExperience,
    })
    return await user.save()
  }
}
