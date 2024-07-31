import { Injectable } from '@nestjs/common'
import { CreateMyDto } from './dto/create-my.dto'
import { UpdateMyDto } from './dto/update-my.dto'

@Injectable()
export class MyService {
  create(createMyDto: CreateMyDto) {
    return 'This action adds a new my'
  }

  findAll() {
    return `This action returns all my`
  }

  findOne(id: number) {
    return `This action returns a #${id} my`
  }

  update(id: number, updateMyDto: UpdateMyDto) {
    return `This action updates a #${id} my`
  }

  remove(id: number) {
    return `This action removes a #${id} my`
  }
}
