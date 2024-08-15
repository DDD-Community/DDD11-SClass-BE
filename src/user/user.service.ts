import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private catModel: Model<User>) {}
  create(req: CreateUserDto.Req) {
    // const createdUser = new this.catModel({
    //   _id: req.id,
    //   name: req.name,
    // })
    // return await createdCat.save()
    return null
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
