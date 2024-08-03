import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMyDto } from './dto/create-my.dto'
// import { UpdateMyDto } from './dto/update-my.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Cat } from 'src/schemas/my.schema'
import { Model } from 'mongoose'
import { UnsubscriptionError } from 'rxjs'

@Injectable()
export class MyService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(req: CreateMyDto.Request): Promise<Cat> {
    const createdCat = new this.catModel({
      _id: req.id,
      name: req.name,
    })
    return await createdCat.save()
  }

  findAll() {
    const cat = this.catModel.find().exec()

    return cat
  }

  async findOne(id: string) {
    const user = await this.catModel.findById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user.toJSON()
  }

  update(id: number) {
    return `This action updates a #${id} my`
  }

  remove(id: number) {
    return `This action removes a #${id} my`
  }
}
