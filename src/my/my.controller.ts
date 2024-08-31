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
import { TypedBody, TypedRoute } from '@nestia/core'
import { CreateMyDto } from './dto/create-my.dto'
import { ReadUserDto } from '../user/dto/read-user.dto'
import { UserService } from '../user/user.service'

@Controller('my')
export class MyController {
  constructor(private readonly userService: UserService) {}

  /**
   * sample description
   * @summary 마이페이지
   * @returns sample return
   * @tag My 마이페이지
   */
  @Get()
  async findOne(@Query('id') id: string): Promise<ReadUserDto.Res> {
    return await this.userService.findOne(id)
  }
}
