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
import { MyService } from './my.service'
import { ReadMyDto } from './dto/read-my.dto'
import { Dto } from '../app.dto'

@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  /**
   * sample description
   * @summary 마이페이지
   * @returns sample return
   * @tag My 마이페이지
   */
  @Get()
  async findOne(@Query('userId') userId: string): Promise<Dto<ReadMyDto.Res>> {
    const res = await this.myService.findOne(userId)
    return {data: res}
  }
}
